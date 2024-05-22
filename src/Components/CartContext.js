import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();

    const addItemToCart = (cartItem, quantity) => {
        console.log("item", cartItem)
        const updatedCartItem = { ...cartItem, quantity }; // Add quantity to cartItem
        const updatedCart = [...cart, updatedCartItem];
        console.log("item.item.price", cartItem.item.price)
        setCart(updatedCart);
        setTotal(total + cartItem.item.price * quantity);
    };

    const checkout = () => {
        alert('Checkout successful');
        // setCart([]);
        // setTotal(0);
        navigate('/checkout');
    };

    const clearCart = () => {
        setCart([]);
        setTotal(0);
    };

  
    return (
        <CartContext.Provider value={{ cart, total, addItemToCart, checkout, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
