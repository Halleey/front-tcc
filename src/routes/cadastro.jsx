import React from 'react';
import Formulario from '../components/formulario'
import { Link } from 'react-router-dom';
import styles from '../css/Cadastro.module.css'; 

function Cadastro() {
  const handleSubmit = (formData) => {
    const API_URL = 'http://localhost:8080';
    console.log('Dados do formulário:', formData);
    
    fetch(API_URL + '/food/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(formData),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Resposta do servidor:', data);
    })
    .catch(error => {
      console.error('Erro ao enviar dados:', error);
    });
  };

  return (
  
    <div className={styles.container}>
      <h1>Cadastro de Produto</h1>
      <div className={styles.intro}>
        <p>Por favor, preencha os detalhes do produto abaixo:</p>
      </div>
      <Formulario onSubmit={handleSubmit} />
      <div className={styles.footer}>
        <p>Obrigado por usar nosso serviço de cadastro de produtos!</p>
      </div>
      <div className={styles.navegar}>
        <Link to="/">
          <button>
            voltar para página inicial
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Cadastro;
