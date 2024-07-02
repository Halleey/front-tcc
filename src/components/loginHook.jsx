import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; 
import { useLogin } from '../hooks/useLogin';
import styles from '../css/Login.module.css';

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
            console.error('Erro ao fazer login:', err);
        }
    };

    return (
        <div className={styles['login-form']}>
            <h2>Login</h2>
            {token ? (
                <p>You are already logged in {name}</p>
            ) : (
                <form onSubmit={submit} className={styles['input-container']}>
                    <div>
                        <label>Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            className={styles['input']}
                        />
                    </div>
                    <div>
                        <label>Senha</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            className={styles['input']}
                        />
                    </div>
                    {error && <p className={styles['error']}>{error.message}</p>}
                    <button
                        type="submit"
                        className={`${styles['btn-primary']} ${loading ? styles['disabled'] : ''}`}
                        disabled={loading}
                    >
                        {loading ? 'Entrando...' : 'Entrar'}
                    </button>
                </form>
            )}
        </div>
    );
}