import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Cadastro from './routes/cadastro.jsx'
//config do router
import{
  createBrowserRouter, RouterProvider
} from 'react-router-dom';
import Register from './routes/Register.jsx'
import Login from './routes/login.jsx'

const router = createBrowserRouter([
{
  path: "/",
  element: <App/>
  },

  {
    path: "/login",
    element: <Login/>
    },
    {
      path: "/register",
      element: <Register/>
      },
    {
      path: "/cadastro",
      element: <Cadastro/>
      }

])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <RouterProvider router={router}/>
  </React.StrictMode>,
)
