import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../hooks/CartProvider';
import '../css/Carrinho.css';

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasProductPermission, setHasProductPermission] = useState(false);
  const [approvalUrl, setApprovalUrl] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
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
        fetchAddresses(token); // Fetch addresses when authenticated
      } catch (error) {
        console.error('Invalid token format', error);
        localStorage.removeItem('token');
      }
    }
  }, []);

  const fetchAddresses = async (token) => {
    try {
      const response = await axios.get('http://localhost:8080/public/addresses', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAddresses(response.data);
    } catch (error) {
      console.error('Error fetching addresses', error);
    }
  };

  const handleAddressChange = (e) => {
    setSelectedAddress(e.target.value);
  };

  const createPayment = async () => {
    if (!isAuthenticated) {
      console.error('User is not authenticated.');
      return;
    }
    if (!selectedAddress) {
      setError('Please select an address');
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
        userId: getUserIdFromToken(), // Call getUserIdFromToken to get userId
        cartItems: cartItems, // Enviar os itens do carrinho
        address: selectedAddress // Enviar o endereço selecionado
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
    return cartItems.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2);
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
                <button onClick={() => removeFromCart(item)}>Remove</button>
              </li>
            ))}
          </ul>
          <p className="total">Total: {calculateTotal()}</p>
          <div>
            <label htmlFor="address-select">Select Address:</label>
            <select id="address-select" value={selectedAddress} onChange={handleAddressChange}>
              <option value="">Choose an address</option>
              {addresses.map((address) => (
                <option key={address.id} value={address.id}>{address.street}, {address.city}, {address.state}</option>
              ))}
            </select>
          </div>
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
          <p>Click below to proceed to payment</p>
          <button onClick={redirectToPayPal}>Proceed to PayPal</button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
