import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { QueryClientProvider } from 'react-query';
import queryClient from './hooks/queryClient';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Cadastro from './routes/cadastro';
import Register from './routes/Register';
import Login from './routes/login';
import CartPage from './routes/CartPage';
import { CartProvider } from './hooks/CartProvider';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />
    },
    {
        path: '/login',
        element: <Login></Login>
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/cadastro',
        element: <Cadastro />
    },
    {
        path: '/cart',
        element: <CartPage/>
    }    
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <CartProvider>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router}>
                <App />
            </RouterProvider>
        </QueryClientProvider>
        </CartProvider>
    </React.StrictMode>
);
