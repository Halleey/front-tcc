import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Home from './routes/home.jsx'
import Cadastro from './routes/cadastro.jsx'
//config do router
import{
  createBrowserRouter, RouterProvider
} from 'react-router-dom';

const router = createBrowserRouter([
{
  path: "/",
  element: <App/>
  },

  {
    path: "/home",
    element: <Home/>
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
