import React from 'react';
import { useCart } from '../hooks/CartProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../css/Tabela.module.css';
function Tabela({ vetor, isAdmin }) {
  const { addToCart } = useCart();

  const handleAddToCart = (produto) => {
    addToCart(produto);
  };

  const handleDelete = (produtoId) => {
    fetch(`http://localhost:8080/food/${produtoId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          alert('Produto excluído com sucesso!');
          window.location.reload(); 
        } else {
          alert('Erro ao excluir o produto.');
        }
      })
      .catch((error) => {
        console.error('Erro ao excluir produto:', error);
      });
  };

  return (
    <div className={styles.cardContainer}>
      {vetor.map((produto, indice) => (
        <div key={indice} className={styles.card}>
          <img src={produto.image} alt={produto.title} />
          <div className={styles.cardBody}>
            <h5 className={styles.cardTitle}>{produto.title}</h5>
            <p className={styles.cardText}>Preço: R${produto.price} </p>
            <p className={styles.cardText}>{produto.description}</p>
            <button onClick={() => handleAddToCart(produto)} className={styles.cardButton}>
              Adicionar ao Carrinho
            </button>
            {isAdmin && (
              <button onClick={() => handleDelete(produto.id)} className={styles.cardButton}>
                Excluir
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Tabela;