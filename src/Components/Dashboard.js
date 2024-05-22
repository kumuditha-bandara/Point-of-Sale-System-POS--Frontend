import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Replace with the URL of your chosen image
const backgroundImage = 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const Card = styled.div`
  width: 300px;
  height: 200px;
  margin: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  cursor: pointer;
  background-color: rgba(234, 67, 53, 0.8); /* Medium red color with transparency */
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    transform: scale(1.05);
  }
`;

const CardContent = styled.div`
  text-align: center;
`;

const Title = styled.div`
  font-size: 20px;
  margin-bottom: 10px;
`;

const Description = styled.div`
  font-size: 16px;
`;

const Dashboard = () => {
  const navigate = useNavigate();

  const handleClick = (route) => {
    navigate(route);
  };

  return (
    <Container>
      <Card onClick={() => handleClick('/items')}>
        <CardContent>
          <Title>Item Management</Title>
          <Description>Manage items in your inventory.</Description>
        </CardContent>
      </Card>
      <Card onClick={() => handleClick('/categories')}>
        <CardContent>
          <Title>Category Management</Title>
          <Description>Manage categories of your items.</Description>
        </CardContent>
      </Card>
      <Card onClick={() => handleClick('/stock')}>
        <CardContent>
          <Title>Stocks</Title>
          <Description>Manage stocks of your items.</Description>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Dashboard;
