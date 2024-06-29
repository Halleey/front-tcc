const API_URL = 'http://localhost:8080';

export const login = async (credentials) => {
    const response = await fetch(`${API_URL}/enter/auth`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });
    return await response.json();
};
export const useAuth = () => {
    const token = localStorage.getItem('token');
    return { token };
};
