import React, { useState, useEffect } from 'react';
import { getPedidos } from '../hooks/Cozinha.js';
import styles from '../css/Cozinha.module.css';

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
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Pedidos;