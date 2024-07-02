import React from 'react';
import { useCart } from '../hooks/CartProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../css/Tabela.module.css';

function Tabela({ vetor }) {
  const { addToCart } = useCart();

  const handleAddToCart = (produto) => {
    addToCart(produto);
  };

  return (
    <div className={styles.cardContainer}>
      {vetor.map((produto, indice) => (
        <div key={indice} className={styles.card}>
          <img src={produto.image} alt={produto.title} />
          <div className={styles.cardBody}>
            <h5 className={styles.cardTitle}>{produto.title}</h5>
            <p className={styles.cardText}>Preço: {produto.price}</p>
            <p className={styles.cardText}>{produto.description}</p>
            <button onClick={() => handleAddToCart(produto)} className={styles.cardButton}>
              Adicionar ao Carrinho
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Tabela;
