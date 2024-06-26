// Formulario.jsx
import React, { useState } from 'react';
export function Formulario({ onSubmit }) {
  const [name, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [price, setPrice] = useState('');
  const [descricao, setDescricao] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ name: name, quantidade, price, descricao }); // Corrigido para `name` em vez de `nome`
    // Limpar os campos após o envio, se necessário
    setNome('');
    setQuantidade('');
    setPrice('');
    setDescricao('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Nome do Produto:
          <input
            type="text"
            value={name}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Quantidade:
          <input
            type="number"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Preço:
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Descrição:
          <input
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </label>
      </div>
      <button type="submit">Enviar</button>
    </form>
  );
}

export default Formulario;
