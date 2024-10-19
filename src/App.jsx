import React, { useState, useEffect } from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import styles from './css/App.module.css';
import Tabela from './components/tabela';
import { useQueryClient } from 'react-query';
import CartPage from './routes/CartPage';
import { CartProvider } from './hooks/CartProvider';
import loginImage from './images/login.png';
import Carrinho from './images/carrinho.png';

function App() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [hasProductPermission, setHasProductPermission] = useState(false);
    const [hasPedidosPermission, setHasPedidoPermission] = useState(false);
    const [produtos, setProdutos] = useState([]);

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

  

    return (
        <div className={styles.App}>
            <h1>Mesa digital</h1>
            <header>
   
            <div className={styles.btnsPrimary}>
                <Link to="/cart">
                    <button>
                <img
                src={Carrinho}
                alt='carrinho'
                style={{width: '30px', height: '30px'}}
                ></img>

                    </button>
                </Link>
                
                {!isAuthenticated ? (
                    <>
                        <Link to="/login">
                            <button>
                                <img 
                                    src={loginImage} 
                                    alt="Login"
                                    style={{ width: '30px', height: '30px' }} // Ajusta o tamanho da imagem
                                />
                            </button>
                        </Link>
                        <Link to="/register">
                            <button>Cadastrar-se</button>
                        </Link>
                    </>
                ) : (
                    <>
                        {hasProductPermission && (
                            <Link to="/cadastro">
                                <button>Inserir prato</button>
                            </Link>
                        )}
                        {hasPedidosPermission && (
                            <Link to="/pedidos">
                                <button>Pedidos</button>
                            </Link>
                        )}
                        <button onClick={handleLogout}>Sair</button>
                    </>
                )}
            </div>
            </header>
       
            {/* Passando a prop isAdmin para o componente Tabela */}
            <Tabela vetor={produtos} isAdmin={hasProductPermission} />
   
            <Routes>
                <Route path="/cart" element={<CartPage />} />
            </Routes>
        </div>
    );
}
export default App;