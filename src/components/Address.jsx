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
  const [currentAddress, setCurrentAddress] = useState(null); // Novo estado para endereço atual

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUserId(payload.userId);

      // Chamada à API para buscar o endereço atual do usuário
      axios.get(`http://localhost:8080/public/my-address?userId=${payload.userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then(response => {
          setCurrentAddress({
            address: response.data.address,
            number: response.data.number,
          });
        })
        .catch(error => {
          setError('Falha ao carregar o endereço.');
        });
    }
  }, []);

  const handleUpdateAddress = async () => {
    if (!userId) {
      setError('Usuário não está autenticado.');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Token não encontrado.');
      return;
    }

    try {
      await axios.patch(`http://localhost:8080/public/alter-address?userId=${userId}`, {
        address,
        number,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
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

      {/* Exibe o endereço atual pré-definido */}
      {currentAddress && (
        <div className={styles.currentAddress}>
          <h3>Seu endereço atual pré-definido:</h3>
          <p><strong>Rua:</strong> {currentAddress.address}</p>
          <p><strong>Número:</strong> {currentAddress.number}</p>
        </div>
      )}

      <div className={styles.formGroup}>
        <label className={styles.label}>Nova Rua</label>
        <input
          className={styles.input}
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Digite a nova rua"
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Novo Número</label>
        <input
          className={styles.input}
          type="text"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="Digite o novo número"
        />
      </div>
      
      <button className={styles.button} onClick={handleUpdateAddress}>
        Salvar Endereço
      </button>

      <Link to="/">
        <button className={styles.button}>Home Page</button>
      </Link>
    </div>
  );
};

export default AddressServicePage;
