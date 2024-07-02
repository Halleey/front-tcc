import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; 
import { useLogin } from '../hooks/useLogin';

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
                navigate('/');
            }
        } catch (err) {
            console.error('Erro ao fazer login:');
        }
    };

    return (
        <div className="login-form">
            <h2>Login</h2>
            {token ? (
                <p>You are already logged in {name}</p>
            ) : (
                <form onSubmit={submit} className="input-container">
                    <div>
                        <label>Name</label>
                        <input value={name} onChange={event => setName(event.target.value)} />
                    </div>
                    <div>
                        <label>Senha</label>
                        <input value={password} onChange={event => setPassword(event.target.value)} />
                    </div>
                    {error && <p className="error">{error.message}</p>}
                    <button type="submit" className="btn-primary" disabled={loading}>
                        {loading ? 'Entrando...' : 'Entrar'}
                    </button>
                </form>
            )}
        </div>
    );
}
