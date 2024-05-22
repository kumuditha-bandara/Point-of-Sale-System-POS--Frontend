import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../Authentication/AuthProvider';
import { Card, TextField, Button, Container, Typography, Grid, makeStyles } from '@material-ui/core';
import { AccountCircle, Lock } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  card: {
    padding: theme.spacing(4),
    maxWidth: '400px',
    width: '100%',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
  },
  form: {
    '& > *': {
      marginBottom: theme.spacing(2),
    },
  },
  loginButton: {
    backgroundColor: '#EA4335', // Medium red color
    color: '#fff', // White color
  },
}));

const Login = () => {
    const classes = useStyles();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/user/login', { username, password });
            login(response.data);
            alert('User login successfully');
            navigate('/dashboard');
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <Container className={classes.container}>
            <Card className={classes.card}>
                <Typography variant="h5" gutterBottom align="center">Login</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        InputProps={{
                            startAdornment: <AccountCircle />,
                        }}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        InputProps={{
                            startAdornment: <Lock />,
                        }}
                    />
                    <Button type="submit" variant="contained" className={classes.loginButton} fullWidth>
                        Login
                    </Button>
                </form>
            </Card>
        </Container>
    );
};

export default Login;
