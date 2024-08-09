import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../css/Endereco.module.css';
const AddressServicePage = () => {
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [userId, setUserId] = useState(undefined);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUserId(payload.userId);
      fetchAddresses(payload.userId);
    }
  }, []);

  const fetchAddresses = async (userId) => {
    try {
      const response = await axios.get('http://localhost:8080/public/address', {
        headers: {
          userId: userId.toString(),
        },
      });
      setAddresses(response.data);
    } catch (error) {
      console.error('Failed to fetch addresses', error);
    }
  };

  const handleRegisterAddress = async () => {
    if (!userId) {
      setError('User is not authenticated.');
      return;
    }

    try {
      await axios.post('http://localhost:8080/public/address', {
        address,
        number,
      }, {
        headers: {
          userId: userId.toString(),
        },
      });
      setSuccess('Address registered successfully');
      setError(null);
      fetchAddresses(userId);
    } catch (error) {
      setError('Failed to register address');
      setSuccess(null);
    }
  };

  const handleRemoveAddress = async (address, number) => {
    try {
      await axios.delete('http://localhost:8080/public/address', {
        headers: {
          userId: userId.toString(),
        },
        data: {
          address,
          number,
        },
      });
      setSuccess('Address removed successfully');
      setError(null);
      fetchAddresses(userId);
    } catch (error) {
      setError('Failed to remove address');
      setSuccess(null);
    }
  };

  return (
    <div className={styles.addressServiceContainer}>
      <h1>Registrar endereço</h1>
      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>{success}</p>}
      <div className={styles.formGroup}>
        <label className={styles.label}>Endereço</label>
        <input
          className={styles.input}
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Numero</label>
        <input
          className={styles.input}
          type="text"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
      </div>
      <button className={styles.button} onClick={handleRegisterAddress}>Salvar endereço</button>
      <ul>
        {addresses.map((addr, index) => (
          <li key={index} className={styles.listItem}>
            {addr.address} - {addr.number}
            <button className={styles.removeButton} onClick={() => handleRemoveAddress(addr.address, addr.number)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddressServicePage;
