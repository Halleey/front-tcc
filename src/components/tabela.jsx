import React from 'react';
import { useCart } from '../hooks/CartProvider';

function Tabela({ vetor }) {
  const { addToCart } = useCart();

  const handleAddToCart = (produto) => {
    addToCart(produto);
    alert(`${produto.title} adicionado ao carrinho!`);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Título</th>
          <th>Imagem</th>
          <th>Preço</th>
          <th>Ações</th> {/* Nova coluna para o botão */}
        </tr>
      </thead>
      <tbody>
        {vetor.map((produto, indice) => (
          <tr key={indice}>
            <td>{produto.id}</td>
            <td>{produto.title}</td>
            <td><img src={produto.image} alt={produto.title} style={{ width: '100px' }} /></td>
            <td>{produto.price}</td>
            <td>
              <button onClick={() => handleAddToCart(produto)}>Adicionar ao Carrinho</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Tabela;
