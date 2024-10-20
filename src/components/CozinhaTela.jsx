import React, { useState, useEffect } from 'react';
import { getPedidos, getAlternativePedido, deletePedidoById } from '../hooks/Cozinha';
import styles from '../css/Cozinha.module.css';
import { Link } from 'react-router-dom';

const Pedidos = () => {
    const [pedidosAgrupados, setPedidosAgrupados] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPedidos = async () => {
            try {
                const optionalData = await getAlternativePedido();
                const defaultData = await getPedidos();

                const combinedData = [...optionalData, ...defaultData];
                agruparPedidos(combinedData);
            } catch (err) {
                setError("Erro ao carregar pedidos.");
            } finally {
                setLoading(false);
            }
        };

        const agruparPedidos = (data) => {
            const groupedPedidos = {};
            const uniquePedidoIds = new Set();

            data.forEach(pedido => {
                if (!uniquePedidoIds.has(pedido.id)) {
                    uniquePedidoIds.add(pedido.id);

                    const cliente = pedido.userName;
                    if (!groupedPedidos[cliente]) {
                        groupedPedidos[cliente] = [];
                    }

                    const userAddress = pedido.optionalAddress ? pedido.optionalAddress : pedido.userAddress;
                    const userNumber = pedido.optionalNumber ? pedido.optionalNumber : pedido.userNumber;

                    groupedPedidos[cliente].push({
                        ...pedido,
                        userAddress,
                        userNumber,
                        userEmail: pedido.userEmail // Incluindo o e-mail associado
                    });
                }
            });

            setPedidosAgrupados(groupedPedidos);
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
                        delete newPedidos[cliente];
                    }
                }
                return newPedidos;
            });
        } catch (err) {
            setError("Erro ao excluir pedido");
        }
    };

    const handleSendEmail = async (email) => {
        try {
            const confirmSend = window.confirm("Você realmente deseja enviar o e-mail de finalização?");
            if (!confirmSend) {
                return; // Se o usuário cancelar, a função para aqui.
            }
    
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error("Usuário não autenticado");
            }
    
            // Fazendo a requisição com o parâmetro 'email' na URL
            const response = await fetch(`http://localhost:8080/public/alert?email=${email}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}` // Inclui o token JWT
                }
            });
    
            if (!response.ok) {
                throw new Error('Erro ao enviar e-mail.');
            }
    
            alert('E-mail enviado com sucesso!');
        } catch (err) {
            alert('Erro ao enviar o e-mail: ' + err.message);
        }
    };
    
    

    return (
        <div className={styles['pedidos-container']}>
            <h2>Pedidos do Cliente</h2>


            <ul className={styles['pedidos-list']}>
                {Object.keys(pedidosAgrupados).map((cliente) => {
                    const pedidosDoCliente = pedidosAgrupados[cliente];
                    const emailDoCliente = pedidosDoCliente[0].userEmail; // Pegando o e-mail do primeiro pedido do cliente

                    return (
                        <div key={cliente}>
                            <h3>Cliente: {cliente}</h3>
                            <button onClick={() => handleSendEmail(emailDoCliente)}>Enviar Email de Finalização</button>
                            {pedidosDoCliente.map((pedido) => (
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
                    );
                })}
                <Link to="/">
                    <button>Home page</button>
                </Link>
            </ul>
        </div>
    );
};

export default Pedidos;
