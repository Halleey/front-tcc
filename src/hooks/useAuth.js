// useAuth.js
import { useEffect, useState } from 'react';

const getTokenFromLocalStorage = () => {
    return localStorage.getItem('token');
}

export function useAuth() {
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedToken = getTokenFromLocalStorage();
        console.log("Token obtido do localStorage:", storedToken); 
        setToken(storedToken);
    }, []);

    return { token };
}
