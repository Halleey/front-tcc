import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../hooks/CartProvider';

const PaymentCompletePage = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { clearCart } = useCart();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const paymentId = queryParams.get('paymentId');
    const payerId = queryParams.get('PayerID');

    const completePayment = async () => {
      try {
        const response = await axios.patch('http://localhost:8080/api/paypal/payment-complete', null, {
          params: {
            paymentId,
            PayerID: payerId,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.data === 'Payment approved') {
          clearCart(); // Limpar o carrinho após o pagamento ser aprovado
          navigate('/'); 
        } else {
          setError('Payment not approved');
        }
      } catch (error) {
        setError(error.message);
      }
    };

    if (paymentId && payerId) {
      completePayment();
    } else {
      setError('Missing payment details');
    }
  }, [location.search, navigate, clearCart]);

  return (
    <div>
      <h1>Payment Complete</h1>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default PaymentCompletePage;
