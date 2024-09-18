import React, { useState, useEffect } from 'react';
import { getPedidos, deletePedidoById } from '../hooks/Cozinha';
import styles from '../css/Cozinha.module.css';
import { Link } from 'react-router-dom';

const Pedidos = () => {
    const [pedidosAgrupados, setPedidosAgrupados] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPedidos = async () => {
            try {
                const data = await getPedidos();
                const groupedPedidos = data.reduce((acc, pedido) => {
                    const cliente = pedido.userName;
                    if (!acc[cliente]) {
                        acc[cliente] = [];
                    }
                    acc[cliente].push(pedido);
                    return acc;
                }, {});
                
                setPedidosAgrupados(groupedPedidos);
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
            setPedidosAgrupados((prevPedidos) => {
                const newPedidos = { ...prevPedidos };
                for (const cliente in newPedidos) {
                    newPedidos[cliente] = newPedidos[cliente].filter(pedido => pedido.id !== pedidoId);
                    if (newPedidos[cliente].length === 0) {
                        delete newPedidos[cliente]; // Remove o cliente se não houver pedidos restantes
                    }
                }
                return newPedidos;
            });
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
                {Object.keys(pedidosAgrupados).map((cliente) => (
                    <div key={cliente}>
                        <h3>Cliente: {cliente}</h3>
                        {pedidosAgrupados[cliente].map((pedido) => (
                            <li key={pedido.id} className={styles['pedido-item']}>
                                <p><strong>Título:</strong> {pedido.title}</p>
                                <p><strong>Preço:</strong> {pedido.price}</p>
                                <p><strong>Endereço:</strong> {pedido.userAddress}</p>
                                <p><strong>Número:</strong> {pedido.userNumber}</p>
                                <div className={styles['pedido-actions']}>
                                    <button onClick={() => handleDelete(pedido.id)}>Excluir</button>
                                </div>
                            </li>
                        ))}
                    </div>
                ))}
                <Link to="/">
                    <button>Home page</button>
                </Link>
            </ul>
        </div>
    );
};

export default Pedidos;
