import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../hooks/CartProvider';
import styles from '../css/CartPage.module.css';

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasProductPermission, setHasProductPermission] = useState(false);
  const [approvalUrl, setApprovalUrl] = useState(null);
  const [showAddressInputs, setShowAddressInputs] = useState(false); 
  const [optionalAddress, setOptionalAddress] = useState(''); 
  const [optionalNumber, setOptionalNumber] = useState(''); 
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

    const getUserIdFromToken = () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          return payload.userId;
        } catch (error) {
          console.error('Invalid token format', error);
          return null;
        }
      }
      return null;
    };

    setLoading(true);
    try {
      console.log('dados enviados', {optionalAddress, optionalNumber});
      const response = await axios.post('http://localhost:8080/api/paypal/create-payment', {
        total: calculateTotal(),
        currency: 'BRL',
        method: 'paypal',
        intent: 'sale',
        description: 'Purchase from your store',
        cancelUrl: 'http://localhost:5173/cart',
        successUrl: 'http://localhost:5173/payment-complete',
        userId: getUserIdFromToken(),
        cartItems: cartItems,
        optionalAddress, 
        optionalNumber,   
        
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.data && response.data.approvalUrl) {
        setApprovalUrl(response.data.approvalUrl);
      } else {
        setError('A resposta da API do PayPal não contém approval_url.');
      }
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2);
  };

  const redirectToPayPal = () => {
    if (approvalUrl) {
      window.location.href = approvalUrl;
    } else {
      setError('Approval URL is not available.');
    }
  };

  const handleRemoveFromCart = (itemId) => {
    removeFromCart(itemId);
  };


  const toggleAddressInputs = () => {
    setShowAddressInputs((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      <h1>Cart</h1>
      {error && <p className={styles.error}>Error: {error}</p>}
      {loading && <p className={styles.loading}>Loading...</p>}
      {!isAuthenticated && <p>You need to log in to proceed.</p>}
      {hasProductPermission && <p>Lembre-se que está usando a conta de admin...</p>}
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                <img src={item.image} alt={item.title} width="50" />
                <h2>{item.title}</h2>
                <p>{item.price}</p>
                <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>

          <p className={styles.total}>Total: {calculateTotal()}</p>
          <button className={styles.checkoutButton} onClick={createPayment}>Pagar com PayPal</button>
          
          
          <button className={styles.addressButtozn} onClick={toggleAddressInputs}>
            Tem um endereço diferente?
          </button>

          {showAddressInputs && (
            <div className={styles.addressInputs}>
              <input
                type="text"
                placeholder="Endereço"
                value={optionalAddress}
                onChange={(e) => setOptionalAddress(e.target.value)}
              />
              <input
                type="text"
                placeholder="Número"
                value={optionalNumber}
                onChange={(e) => setOptionalNumber(e.target.value)}
              />
            </div>
          )}
        </div>
      )}
      <div className={styles.backLink}>
        <Link to="/">
          <button>Home page</button>
        </Link>
      </div>
      {approvalUrl && (
        <div>
          <p>Clique para proceder para o pagamento</p>
          <button className={styles.checkoutButton} onClick={redirectToPayPal}>Ir para o PayPal</button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
