// useAuth.js
import { useEffect, useState } from 'react';

const getTokenFromLocalStorage = () => {
    return localStorage.getItem('token');
}

export function useAuth() {
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedToken = getTokenFromLocalStorage();
        setToken(storedToken);
    }, []);

    return { token };
}
