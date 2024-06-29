import React, { useState, useEffect } from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import './css/App.css';
import Tabela from './hooks/tabela';
import { useQueryClient } from 'react-query';
import queryClient from './hooks/queryClient';

function App() {
    const navigate = useNavigate(); 
    const queryClient = useQueryClient();

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [hasProductPermission, setHasProductPermission] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                const role = payload.role;
                if (role === 'ADMIN') {
                    setHasProductPermission(true);
                }
                setIsAuthenticated(true);
            } catch (error) {
                console.error('Invalid token format', error);
                localStorage.removeItem('token');
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        queryClient.clear();
        setIsAuthenticated(false);
        navigate('/'); 
    };

    const [produtos, setProdutos] = useState([]);
    const API_URL = 'http://localhost:8080';

    useEffect(() => {
        fetch(API_URL + '/food')
            .then(response => response.json())
            .then(data => setProdutos(data))
            .catch(error => console.error('Erro ao buscar dados da API:', error));
    }, []);

    return (
        <div>
            <h1>Home page is being built... Be patient</h1>
            <div className='btns-primary'>
                {!isAuthenticated && (
                    <>
                        <Link to="/login">
                            <button>Login</button>
                        </Link>
                        <Link to="/register">
                            <button>Cadastrar-se</button>
                        </Link>
                    </>
                )}
                {isAuthenticated && hasProductPermission && (
                    <Link to="/cadastro">
                        <button>Cadastrar produtos</button>
                    </Link>
                )}
                {isAuthenticated && <button onClick={handleLogout}>Sair</button>}
            </div>
            <Tabela vetor={produtos} />
        </div>
    );
}
export default App;