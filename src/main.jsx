import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { QueryClientProvider } from 'react-query';
import queryClient from './hooks/queryClient';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Cadastro from './routes/cadastro';
import Register from './routes/Register';
import Login from './routes/login';
import CartPage from './routes/CartPage';
import { CartProvider } from './hooks/CartProvider';
import PaymentCompletePage from './routes/payment-complete';
import { PasswordRecoveryForm } from './components/PasswordRecoveryForm';
import { PasswordResetForm } from './components/PasswordReset';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />
    },
    {
        path:'/recuperar',
        element: <PasswordRecoveryForm/>
    },
    {
        path:'/alterar',
        element: <PasswordResetForm/>
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
    },
    {
        path: 'payment-complete',
        element: <PaymentCompletePage/>
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
