import axios from 'axios';

const API_URL = 'http://localhost:8080/pedidos';

export const getPedidos = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(API_URL, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar pedidos", error);
        throw error;
    }
};