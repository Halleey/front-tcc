import React, { useState } from 'react';

function RegisterHt({ onSubmit }) {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [numero, setNumero] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ name, lastName, password, email, address });
    
    setName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setAddress('');
    setNumero('');
  }

  return (
    <div>
      <h3>Preencha seus dados:</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Sobrenome:
          <input type='text' value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </label>
        <label>
          Senha:
          <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <label>
          Email:
          <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Endereço:
          <input type='text' value={address} onChange={(e) => setAddress(e.target.value)} />
        </label>
        <label>
          Número:
          <input type='text' value={numero} onChange={(e) => setNumero(e.target.value)} />
        </label>
        <button type='submit'>Enviar</button>
      </form>
    </div>
  );
}

export default RegisterHt;
