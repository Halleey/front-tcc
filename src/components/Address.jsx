import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Address.css';
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
    <div className="address-service-container">
      <h1>Address Service</h1>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <div className="form-group">
        <label>Address</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Number</label>
        <input
          type="text"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
      </div>
      <button onClick={handleRegisterAddress}>Register Address</button>
      <h2>Registered Addresses</h2>
      <ul>
        {addresses.map((addr, index) => (
          <li key={index}>
            {addr.address} - {addr.number}
            <button onClick={() => handleRemoveAddress(addr.address, addr.number)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddressServicePage;
