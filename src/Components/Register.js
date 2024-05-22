import React, { useState } from 'react';
import axios from 'axios';
import { FaUser, FaLock } from 'react-icons/fa';
import styled from 'styled-components';

const Card = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Icon = styled.span`
  margin-right: 10px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  background-color: #EA4335;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
`;

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/user/register', { username, password });
            alert('User registered successfully');
        } catch (error) {
            console.error('Registration failed', error);
        }
    };

    return (
        <Card>
            <Title>Registration Form</Title>
            <Form onSubmit={handleSubmit}>
                <InputGroup>
                    <Icon><FaUser /></Icon>
                    <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                </InputGroup>
                <InputGroup>
                    <Icon><FaLock /></Icon>
                    <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                </InputGroup>
                <Button type="submit">Register</Button>
            </Form>
        </Card>
    );
};

export default Register;
