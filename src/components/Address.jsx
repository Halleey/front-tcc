import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../css/Endereco.module.css';
import { Link } from 'react-router-dom';

const AddressServicePage = () => {
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [userId, setUserId] = useState(undefined);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUserId(payload.userId);
    }
  }, []);

  const handleUpdateAddress = async () => {
    if (!userId) {
      setError('Usuário não está autenticado.');
      return;
    }

    try {
      await axios.patch(`http://localhost:8080/public/alter-address`, {
        userId,
        address,
        number,
      });
      setSuccess('Endereço atualizado com sucesso!');
      setError(null);
    } catch (error) {
      setError('Falha ao atualizar o endereço.');
      setSuccess(null);
    }
  };

  return (
    <div className={styles.addressServiceContainer}>
      <h1>Atualizar Endereço</h1>
      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>{success}</p>}
      <div className={styles.formGroup}>
        <label className={styles.label}>Rua</label>
        <input
          className={styles.input}
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Número</label>
        <input
          className={styles.input}
          type="text"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
      </div>
      <button className={styles.button} onClick={handleUpdateAddress}>
        Salvar Endereço
      </button>

      <Link to="/">
      <button>
        home page
      </button>
      </Link>
    
    </div>
  );
};

export default AddressServicePage;
