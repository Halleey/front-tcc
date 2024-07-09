import React, { useState } from 'react';
import axios from 'axios';
import styles from '../css/Passwordreset.module.css';

export function PasswordResetForm() {
    const [email, setEmail] = useState("");
    const [token, setToken] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.patch('http://localhost:8080/public/change-password', { email, token, newPassword });
            setMessage(response.data);
            setError("");
        } catch (err) {
            setError(err.response.data);
            setMessage("");
        }
    };

    return (
        <div className={styles['reset-form']}>
            <h2>Redefinir Senha</h2>
            <form onSubmit={handleSubmit} className={styles['input-container']}>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={styles['input']}
                    />
                </div>
                <div>
                    <label>Token</label>
                    <input
                        type="text"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                        className={styles['input']}
                    />
                </div>
                <div>
                    <label>Nova Senha</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className={styles['input']}
                    />
                </div>
                {message && <p className={styles['message']}>{message}</p>}
                {error && <p className={styles['error']}>{error}</p>}
                <button type="submit" className={styles['btn-primary']}>
                    Alterar Senha
                </button>
            </form>
        </div>
    );
}
