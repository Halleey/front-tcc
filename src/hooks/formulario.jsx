// Formulario.jsx
import React, { useState } from 'react';

export function Formulario({ onSubmit }) {

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [image, setimage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    //quando ele enviar os dados
    onSubmit({title, price, image });

    //limpa os campos
    setTitle('');
    setPrice('');
    setimage('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Nome do Produto:
          <input
            type="text"
            value={title}
            onChange= {(e) => setTitle(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
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
          Image:
          <input
            type="text"
            value={image}
            onChange={(e) => setimage(e.target.value)}
            required
          />
        </label>
      </div>
      <button type="submit">Enviar</button>
    </form>
  );
}

export default Formulario;
