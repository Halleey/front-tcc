import React, { useState } from 'react';
import { useFoodDataMutate } from '../hooks/useFoodMutate';
import { useCart } from '../hooks/CartProvider';

export function Formulario({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

  const mutate = useFoodDataMutate();
  const { addToCart } = useCart();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      title,
      price,
      image,
      description
    };

    try {
      await mutate.mutateAsync(data);
      onSubmit(data);
      addToCart(data);

      setTitle('');
      setPrice('');
      setImage('');
      setDescripton('');
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
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Descrição:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
      </div>
      <button type="submit">Enviar</button>
    </form>
  );
}

export default Formulario;
