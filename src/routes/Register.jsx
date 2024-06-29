import React from 'react'
import { Link } from 'react-router-dom';
import RegisterHt from '../components/RegisterHt'
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
      <div>
    <h1>
      pagina em manutenção
    </h1>
    <div className='base'>
      <h3>
        preencha seus dados
      </h3>
    </div>
    <RegisterHt onSubmit ={handleSubmit} />

    <div className='navegar'>
    <Link to="/">
    <button>
      voltar para página inicial</button></Link>
    </div>
      </div>
      
  )
}

export default Register