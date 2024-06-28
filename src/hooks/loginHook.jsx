import React, { useState } from 'react';
import { useAuth } from './useAuth';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:8080';

const login = async (credentials) => {
    const response = await fetch(`${API_URL}/enter/auth`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });
    return await response.json();
}

export function useLogin() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loginUser = async (credentials) => {
        setLoading(true);
        setError(null);
        try {
            const data = await login(credentials);
            const token = data?.token;
            if (token) {
                localStorage.setItem('token', token);
                return true; // Retorna true para indicar sucesso no login
            }
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
        return false; // Retorna false se o login falhar
    }

    return { loginUser, loading, error };
}

export function LoginForm() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const { loginUser, loading, error } = useLogin();
    const { token } = useAuth();
    const navigate = useNavigate();

    const submit = async (event) => {
        event.preventDefault();
        try {
            const loginSuccess = await loginUser({ name, password });
            if (loginSuccess) {
                navigate('/'); // Redireciona apenas se o login for bem-sucedido
            }
        } catch (err) {
            console.error('Erro ao fazer login:', err);
        }
    }

    return (
        <div className="login-form">
            <h2>Login</h2>
            {token ? (
                <p>You are already logged in {name}</p>
            ) : (
                <form onSubmit={submit} className="input-container">
                    <Input label="Name" value={name} updateValue={setName} />
                    <Input label="Senha" value={password} updateValue={setPassword} />
                    {error && <p className="error">{error.message}</p>}
                    <button type="submit" className="btn-primary" disabled={loading}>
                        {loading ? 'Entrando...' : 'Entrar'}
                    </button>
                </form>
            )}
        </div>
    );
}

const Input = ({ label, value, updateValue }) => {
    return (
        <div>
            <label>{label}</label>
            <input value={value} onChange={event => updateValue(event.target.value)} />
        </div>
    );
}
