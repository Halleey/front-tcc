import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './css/App.css';
import Tabela from './hooks/tabela';

function App() {
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
                // Optionally, you can handle the error, e.g., by clearing the token
                localStorage.removeItem('token');
            }
        }
    }, []);

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
                    <Link to="/login">
                        <button>Login</button>
                    </Link>
                )}
                {isAuthenticated && hasProductPermission && (
                    <Link to="/cadastro">
                        <button>Cadastrar produtos</button>
                    </Link>
                )}
                <Link to="/register">
                    <button>Cadastrar-se</button>
                </Link>
            </div>
            <Tabela vetor={produtos} /> {/* Passa os produtos para o componente Tabela */}
        </div>
    );
}

export default App;
