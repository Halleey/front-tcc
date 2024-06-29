
import React from 'react';
import Formulario from '../components/formulario';
import { Link } from 'react-router-dom';
import '../css/FormProduto.css'
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
    <div>
    <h1>Cadastro de Produto</h1>
    <div className="intro">
      <p>Por favor, preencha os detalhes do produto abaixo:</p>
    </div>
    <Formulario onSubmit={handleSubmit} />
    <div className="footer">
      <p>Obrigado por usar nosso serviço de cadastro de produtos!</p>
    </div>
    <div className='navegar'>
    <Link to="/">
    <button>
      voltar para página inicial</button></Link>
    </div>

  </div>
  );
}

export default Cadastro;
