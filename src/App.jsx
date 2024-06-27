import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './css/App.css';
import Tabela from './hooks/tabela';
function App() {
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
                <Link to="/login">
                    <button>Login</button>
                </Link>
                <Link to="/cadastro">
                    <button>Cadastrar produtos</button>
                </Link>
                <Link to="/register">
                    <button>Cadastrar-se</button>
                </Link>
            </div>
            <Tabela vetor={produtos} /> {/* Passa os produtos para o componente Tabela */}
        </div>
    );
}

export default App;
