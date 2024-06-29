import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/CartProvider';

const CartPage = () => {
  const { cartItems, removeFromCart } = useCart();

  return (
    <div>
      <h1>Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              <img src={item.image} alt={item.title} width="50" />
              <h2>{item.title}</h2>
              <p>{item.price}</p>
              <button onClick={() => removeFromCart(item)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <Link to="/">
        <button>Home page</button>
      </Link>
    </div>
  );
};

export default CartPage;
