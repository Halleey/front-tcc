import React, { useState, useEffect } from 'react';
import { getPedidos, deletePedidoById } from '../hooks/Cozinha'; 
import styles from '../css/Cozinha.module.css';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
const Pedidos = () => {
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPedidos = async () => {
            try {
                const data = await getPedidos();
                setPedidos(data);
                setLoading(false);
            } catch (err) {
                setError("Erro ao carregar pedidos");
                setLoading(false);
            }
        };

        fetchPedidos();
    }, []);

    const handleDelete = async (pedidoId) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error("Usuário não autenticado");
            }

            await deletePedidoById(pedidoId);
            setPedidos(pedidos.filter(pedido => pedido.id !== pedidoId));
        } catch (err) {
            setError("Erro ao excluir pedido");
        }
    };

    if (loading) {
        return <p>Carregando pedidos...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className={styles['pedidos-container']}>
            <h2>Pedidos do Cliente</h2>
            <ul className={styles['pedidos-list']}>
                {pedidos.map((pedido) => (
                    <li key={pedido.id} className={styles['pedido-item']}>
                        <p><strong>ID:</strong> {pedido.id}</p>
                        <p><strong>Título:</strong> {pedido.title}</p>
                        <p><strong>Preço:</strong> {pedido.price}</p>
                        <p><strong>Nome do cliente:</strong> {pedido.userName}</p>
                        <p><strong>Endereço:</strong> {pedido.userAddress}</p>
                        <div className={styles['pedido-actions']}>
                            <button onClick={() => handleDelete(pedido.id)}>Excluir</button>
                            <Link to="/">
                                <button>Home page</button>
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};    
export default Pedidos;
