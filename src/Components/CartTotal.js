import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import styled from 'styled-components';

// Styled components for the cart icon
const CartContainer = styled.div`
  position: fixed;
  top: 10px;
  right: 10px;
  display: flex;
  align-items: center;
  background-color: #EA4335; /* Medium red color */
  color: #fff;
  padding: 10px 15px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

const Icon = styled.svg`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

const Count = styled.span`
  font-size: 18px;
`;

const Price = styled.span`
  font-size: 14px;
  margin-left: 10px;
`;

const CartTotal = () => {
    const { total, checkout, cartItemsCount } = useContext(CartContext);

    return (
        <CartContainer onClick={checkout}>
            <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M8 16c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm8 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm4-9h-3.2l-1.6-3.2c-.2-.4-.6-.8-1.1-.8H9.9c-.5 0-.9.4-1.1.8L7.2 7H4c-.6 0-1 .4-1 1s.4 1 1 1h1.5l1.8 3.6-1.7 3.4c-.2.5-.3 1-.3 1.5 0 2.2 1.8 4 4 4s4-1.8 4-4c0-.5-.1-1-.3-1.5l-1.7-3.4L18.5 9H20c.6 0 1-.4 1-1s-.4-1-1-1zm-8 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </Icon>
            <Count>{cartItemsCount}</Count>
            <Price>${total.toFixed(2)}</Price>
        </CartContainer>
    );
};

export default CartTotal;
