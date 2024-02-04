import React from 'react'
import { useNavigate,Form,useActionData,redirect} from 'react-router-dom'
import  Formulario from '../components/Formulario'
import Error from '../components/Error';
import { agregarCliente } from '../data/Clientes';


export async function action({request})
{
    const formData= await request.formData();
    const datos=Object.fromEntries(formData);

    const email=formData.get('email');

    const errores=[];
    //validacion
    if(Object.values(datos).includes(''))
    {
        errores.push('todos los campos son obligatorios');
    }

    let regex = new RegExp("[a-z0-9]+@[a-z]+\.[a-z]{2,3}");
    if(!regex.test(email))
    {
        errores.push('el Email no es valido');
    }
    
    //retornar errores

    if(Object.keys(errores).length)
    {
        return errores;
    }


   await agregarCliente(datos);


    return redirect('/');
}

function NuevoCliente() {

    const  errores=useActionData(); 


    const navigate=useNavigate();
  return (
   <>
   <h1 className='font-black text-4xl text-blue-900'>Nuevo Cliente</h1>
    <p className='mt-3'>Llena todos los campos para registar un nuevo cliente</p>

    <div className='flex justify-end'>
        <button className='bg-blue-800 text-white px-3 py-1 font-bold  uppercase' 
        onClick={()=>navigate(-1)}
        >
            Volver
        </button>
    </div>

    <div className='bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10'>
    {errores?.length && errores.map((error,i)=><Error key={i}>{error}</Error>)}
    <Form 
     method='POST'
     noValidate>
        
    <Formulario/>

    <input type="submit" value="Registrar Cliente"  className='mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg cursor-pointer'/>
    </Form>
    </div>
    
   </>
  )
}

export default NuevoCliente
