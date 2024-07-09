import React, { useState } from 'react';
import axios from 'axios';
import styles from '../css/Recovery.module.css';

export function PasswordRecoveryForm() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/public/alterar', { email });
            setMessage(response.data);
            setError("");
        } catch (err) {
            setError(err.response.data);
            setMessage("");
        }
    };

    return (
        <div className={styles['recovery-form']}>
            <h2>Recuperação de Senha</h2>
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
                {message && <p className={styles['message']}>{message}</p>}
                {error && <p className={styles['error']}>{error}</p>}
                <button type="submit" className={styles['btn-primary']}>
                    Recuperar Senha
                </button>
            </form>
        </div>
    );
}
