import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter,Router,RouterProvider} from 'react-router-dom'
import Layout from './components/Layout'
import NuevoCliente,{action as nuevoClienteAction} from './pages/NuevoCliente'
import './index.css'
import Index,{loader as clientesLoader, loader} from './pages'
import { action } from './pages/NuevoCliente'
import ErrorPage from './components/ErrorPage'
import EditarCliente, {loader as EditarClienteLoader,action as EditarClienteAction} from './pages/EditarCliente'
import {action as eliminarClienteAction} from './components/Cliente'


const router=createBrowserRouter([
  {path:'/',
    element: <Layout/>,
  children:[
    {
      index:true,
      element: <Index/>,
      loader:clientesLoader,
      errorElement: <ErrorPage/>
    },
    {
      
        path:'/clientes/nuevo',
        element: <NuevoCliente/>,
        action:nuevoClienteAction,
        errorElement:<ErrorPage/>
      
    },
    {
      path:'/clientes/:clienteId/editar',
      element:<EditarCliente/>,
      loader:EditarClienteLoader,
      errorElement:<ErrorPage/>,
      action:EditarClienteAction
    },
    {
      path:'/clientes/:clienteId/eliminar',
      action:eliminarClienteAction,
    }
  ]},
    


])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider
    router={router}
    />
  </React.StrictMode>,
)
