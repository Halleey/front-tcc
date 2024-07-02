import { useState } from 'react';
import { login } from './authService';

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
                return true;
            }
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
        return false;
    };

    return { loginUser, loading, error };
}
