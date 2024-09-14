import React, { useState } from 'react';
import { useFoodDataMutate } from '../hooks/useFoodMutate';
import { useCart } from '../hooks/CartProvider';
import styles from '../css/FormProduto.module.css'; 

export function Formulario({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [categoriaGeral, setCategoriaGeral] = useState('salgado'); 
  const [categoria, setCategoria] = useState('lanches'); 


  
  const mutate = useFoodDataMutate();
  const { addToCart } = useCart();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      title,
      price,
      image,
      description,
      categoriaGeral,
      categoria,
    };

    try {
      await mutate.mutateAsync(data);
      onSubmit(data);
      addToCart(data);

      // Reset dos campos
      setTitle('');
      setPrice('');
      setImage('');
      setDescription('');
      setCategoriaGeral('salgado');
      setCategoria('lanches');
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
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
      <div>
        <label>
          Categoria Geral:
          <select
            value={categoriaGeral}
            onChange={(e) => setCategoriaGeral(e.target.value)}
            required
          >
            <option value="salgado">Salgado</option>
            <option value="doce">Doce</option>
            <option value="bebida">Bebida</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Categoria:
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            required
          >
            <option value="lanches">Lanches</option>
            <option value="pizzas">Pizzas</option>
            <option value="bebidas">Bebidas</option>
            <option value="afins">Afins</option>
          </select>
        </label>
      </div>
      <button type="submit">Enviar</button>
    </form>
  );
}

export default Formulario;
