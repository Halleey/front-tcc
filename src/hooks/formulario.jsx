import React, { useState } from 'react';
import { useFoodDataMutate } from './useFoodMutate';

export function Formulario({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [image, setimage] = useState('');

  const mutate = useFoodDataMutate(); // Obtenha a função de mutação

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prepare os dados para enviar
    const data = {
      title,
      price,
      image
    };

    // Chame a função de mutação
    try {
      await mutate.mutateAsync(data); // Executa a mutação assíncrona
      onSubmit(data); // Chama a função de callback onSubmit, se necessário

      // Limpa os campos após o envio
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
