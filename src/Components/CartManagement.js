import React, { useState } from 'react';
import axios from 'axios';

function CartManagement() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const addItemToCart = (itemId, quantity) => {
    axios.post('http://localhost:8080/api/cart/add', { itemId, quantity })
      .then(response => {
        setCart([...cart, response.data]);
        setTotal(total + response.data.item.price * quantity);
      })
      .catch(error => console.error('There was an error adding the item to the cart!', error));
  };

  const checkout = () => {
    axios.post('http://localhost:8080/api/cart/checkout', { total })
      .then(response => {
        alert('Checkout successful');
        setCart([]);
        setTotal(0);
      })
      .catch(error => console.error('There was an error during checkout!', error));
  };

  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {cart.map(item => (
          <li key={item.id}>
            {item.item.name} - {item.quantity} - ${item.item.price * item.quantity}
            <button onClick={() => addItemToCart(item.item.id, item.quantity)}>Add to Cart</button>
          </li>
        ))}
      </ul>
      <h3>Total: ${total}</h3>
      <button onClick={checkout}>Checkout</button>
    </div>
  );
}

export default CartManagement;
