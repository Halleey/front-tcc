import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../hooks/CartProvider';
import '../css/Carrinho.css';

const CartPage = () => {
  const { cartItems, removeFromCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasProductPermission, setHasProductPermission] = useState(false);
  const [approvalUrl, setApprovalUrl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const role = payload.role;
        if (role === 'ADMIN') {
          setHasProductPermission(true);
        }
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Invalid token format', error);
        localStorage.removeItem('token');
      }
    }
  }, []);

  const createPayment = async () => {
    if (!isAuthenticated) {
      console.error('User is not authenticated.');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8080/api/paypal/create-payment', {
        total: calculateTotal(),
        currency: 'BRL',
        method: 'paypal',
        intent: 'sale',
        description: 'Purchase from your store',
        cancelUrl: 'http://localhost:5173/cart',
        successUrl: 'http://localhost:5173/payment-complete', 
        products: cartItems 
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.data && response.data.approvalUrl) {
        setApprovalUrl(response.data.approvalUrl); 
        console.log('PayPal response:', response.data);
      } else {
        setError('A resposta da API do PayPal não contém approval_url.');
      }
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const redirectToPayPal = () => {
    if (approvalUrl) {
      window.location.href = approvalUrl;
    } else {
      setError('Approval URL is not available.');
    }
  };

  return (
    <div className="container">
      <h1>Cart</h1>
      {error && <p className="error">Error: {error}</p>}
      {loading && <p className="loading">Loading...</p>}
      {!isAuthenticated && <p>You need to log in to proceed.</p>}
      {hasProductPermission && <p>You have permission to access products as an admin.</p>}
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                <img src={item.image} alt={item.title} width="50" />
                <h2>{item.title}</h2>
                <p>{item.price}</p>
                <button onClick={() => removeFromCart(item)}>Remover</button>
              </li>
            ))}
          </ul>
          <p className="total">Total: {calculateTotal()}</p>
          <button onClick={createPayment}>Pagar com Paypal</button>
        </div>
      )}
      <div className="back-link">
        <Link to="/">
          <button>Home page</button>
        </Link>
      </div>
      {approvalUrl && (
        <div>
          <p>Clique abaixo para prosseguir para o pagamento</p>
          <button onClick={redirectToPayPal}>Prosseguir para o Paypal</button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
