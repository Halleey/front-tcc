import React, { useState, useEffect } from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import styles from './css/App.module.css';
import Tabela from './components/tabela';
import { useQueryClient } from 'react-query';
import CartPage from './routes/CartPage';
import { CartProvider } from './hooks/CartProvider';

function App() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [hasProductPermission, setHasProductPermission] = useState(false);
    const [hasPedidosPermission, setHasPedidoPermission] = useState(false);
    const [produtos, setProdutos] = useState([]);
    const [categoriaGeral, setCategoriaGeral] = useState('');
    const [categoria, setCategoria] = useState('');

    const API_URL = 'http://localhost:8080';

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                const role = payload.role;
                if (role === 'ADMIN') {
                    setHasProductPermission(true);
                    setHasPedidoPermission(true);
                }
                setIsAuthenticated(true);
            } catch (error) {
                console.error('Invalid token format', error);
                localStorage.removeItem('token');
            }
        }
    }, []);

    useEffect(() => {
        fetch(API_URL + '/food')
            .then(response => response.json())
            .then(data => setProdutos(data))
            .catch(error => console.error('Erro ao buscar dados da API:', error));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        queryClient.clear();
        setIsAuthenticated(false);
        navigate('/');
    };

    const handleSearch = () => {
        const url = `${API_URL}/food?categoriaGeral=${categoriaGeral}&categoria=${categoria}`;
        fetch(url)
            .then(response => response.json())
            .then(data => setProdutos(data))
            .catch(error => console.error('Erro ao buscar dados da API:', error));
            console.log(data);
    };

    return (
        <div className={styles.App}>
            <h1>Mesa digital</h1>
            <div className={styles.btnsPrimary}>
                <Link to="/cart">
                    <button>Carrinho de Compras</button>
                </Link>
                {!isAuthenticated ? (
                    <>
                        <Link to="/login">
                            <button>Login</button>
                        </Link>
                        <Link to="/register">
                            <button>Cadastrar-se</button>
                        </Link>
                    </>
                ) : (
                    <>
                        {hasProductPermission && (
                            <Link to="/cadastro">
                                <button>Cadastrar Produtos</button>
                            </Link>
                        )}
                        {hasPedidosPermission && (
                            <Link to="/pedidos">
                                <button>Ver pedidos</button>
                            </Link>
                        )}
                        <button onClick={handleLogout}>Sair</button>
                    </>
                )}
            </div>

            {/* Dropdown de Busca */}
            <div className={styles.btnsPrimary}>
                <div>
                    <label>
                        Categoria Geral:
                        <select
                            value={categoriaGeral}
                            onChange={(e) => setCategoriaGeral(e.target.value)}
                        >
                            <option value="">Selecione</option>
                            <option value="salgado">Salgado</option>
                            <option value="doce">Doce</option>
                            <option value="bebida">Bebida</option>
                        </select>
                    </label>
                </div>
                <div>
                    <label>
                        Categoria:
                        <select
                            value={categoria}
                            onChange={(e) => setCategoria(e.target.value)}
                            disabled={!categoriaGeral} // Desativa até que categoriaGeral seja selecionada
                        >
                            <option value="">Selecione</option>
                            {categoriaGeral === 'salgado' && (
                                <>
                                    <option value="lanches">Lanches</option>
                                    <option value="pizzas">Pizzas</option>
                                </>
                            )}
                            {categoriaGeral === 'doce' && (
                                <>
                                    <option value="pizzas">Pizzas</option>
                                </>
                            )}
                            {categoriaGeral === 'bebida' && (
                                <>
                                    <option value="bebidas">Todas as Bebidas</option>
                                </>
                            )}
                        </select>
                    </label>
                </div>
                <button onClick={handleSearch}>Buscar</button>
            </div>

            <Tabela vetor={produtos} />
            <Routes>
                <Route path="/cart" element={<CartPage />} />
            </Routes>
        </div>
    );
}

export default App;
