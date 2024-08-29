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

    const handleReturnHome = () => {
        navigate('/'); 
    };

    const handleAlterPassword = () => {
        navigate('/recuperar'); 
    };

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
                    <label style={{ color: '#ffffff' }}>Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            className={styles['input']}
                        />
                    </div>
                    <div>
                    <label style={{ color: '#ffffff' }}>Senha</label>
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
                    <button type="button" onClick={handleAlterPassword} className={styles['btn-secondary']}>
                        Esqueceu a senha?...
                    </button>
                    <button type="button" onClick={handleReturnHome} className={styles['btn-secondary']}>
                        Voltar para Home
                    </button>
                </form>
            )}
        </div>
    );
}
