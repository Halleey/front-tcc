import React, { useState } from 'react';
import { useFoodDataMutate } from '../hooks/useFoodMutate';

export function Formulario({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [image, setimage] = useState('');

  const mutate = useFoodDataMutate(); 

  const handleSubmit = async (event) => {
    event.preventDefault();

    
    const data = {
      title,
      price,
      image
    };

   
    try {
      await mutate.mutateAsync(data);
      onSubmit(data);

    
      setTitle('');
      setPrice('');
      setimage('');
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Nome do Produto:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
          Imagem:
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
