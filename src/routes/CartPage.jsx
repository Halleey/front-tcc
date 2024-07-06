import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
        successUrl: 'http://localhost:5173/',
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

  const executePayment = async (paymentId, payerId) => {
    if (!isAuthenticated) {
      console.error('User is not authenticated.');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8080/api/paypal/execute-payment', {
        paymentId,
        payerId,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log('Payment executed:', response.data);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };
  const redirectToPayPal = async () => {
    if (approvalUrl) {
      window.location.href = approvalUrl;
      try {
        await axios.post('http://localhost:8080/api/paypal/payment-complete', null, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
      } catch (error) {
        setError(error.message);
      }
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
                <button onClick={() => removeFromCart(item)}>Remove</button>
              </li>
            ))}
          </ul>
          <p className="total">Total: {calculateTotal()}</p>
          <button onClick={createPayment}>Checkout with PayPal</button>
        </div>
      )}
      <div className="back-link">
        <Link to="/">
          <button>Home page</button>
        </Link>
      </div>
      {approvalUrl && (
        <div>
          <p>If you are not redirected automatically, click the button below:</p>
          <button onClick={redirectToPayPal}>Proceed to PayPal</button>
        </div>
      )}
    </div>
  );
};
export default CartPage;
