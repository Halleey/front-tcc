import React, { useState } from 'react';
import styles from '../css/Registerht.module.css'; 

function RegisterHt({ onSubmit }) {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [city, setCity] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ name, lastName, password, email, address, number, city });
    
    setName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setAddress('');
    setNumber('');
    setCity('');
  };

  return (
    <div className={styles.formContainer}>
      <h3 className={styles.formTitle}>Preencha seus dados:</h3>
      <form onSubmit={handleSubmit}>
        <label style={{ color: '#ffffff' }}>
          Nome:
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label style={{ color: '#ffffff' }}>
          Sobrenome:
          <input
            type='text'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <label style={{ color: '#ffffff' }}>
          Senha:
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label style={{ color: '#ffffff' }}>
          Email:
          <input
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label style={{ color: '#ffffff' }}>
          Endereço:
          <input
            type='text'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>
        <label style={{ color: '#ffffff' }}>
          Número:
          <input
            type='text'
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </label>
        <label style={{ color: '#ffffff' }}>
          Cidade:
          <input
            type='text'
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </label>
      
        <button type='submit'>Enviar</button>
      </form>
    </div>
  );
}

export default RegisterHt;
