import React from 'react';
import { Link } from 'react-router-dom';
import RegisterHt from '../components/RegisterHt';
import styles from '../css/Register.module.css'; 

function Register() {

  const handleSubmit = (registerData) => {
    const API_URL = 'http://localhost:8080';
    console.log('Dados do formulário:', registerData);
    
    fetch(API_URL + '/public', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerData),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Resposta do servidor:', data);
    })
    .catch(error => {
      console.error('Erro ao enviar dados:', error);
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.base}>
      
      </div>
      <RegisterHt onSubmit={handleSubmit} />
      <div className={styles.navegar}>
        <Link to="/">
          <button>Voltar para página inicial</button>
        </Link>
      </div>
    </div>
  );
}

export default Register;
