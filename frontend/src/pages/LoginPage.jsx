import React, { useEffect, useState } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import serverUrl from '../config/config';

const LoginPage = ({ isSignedIn, setIsSignedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    console.log('---after login:', (localStorage.getItem('token') !== null && localStorage.getItem('user') !== null), isSignedIn)
    if (localStorage.getItem('token') !== null && localStorage.getItem('user') !== null) {
      setIsSignedIn(true);
      navigate('/');
    } else {
      setIsSignedIn(false);
    }
  }, []);

  const handleLogin = async () => {
    try {
      const response = await fetch(serverUrl + '/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error((await response.json()).message);
      }

      const data = await response.json();
      localStorage.setItem('user', JSON.stringify(data.data.user));
      localStorage.setItem('token', data.data.token);
      setIsSignedIn(true);
      navigate('/');
    } catch (error) {
      toast.error(error.message || 'Error while logging in');
    }
  };

  return (
    <Container maxWidth="sm" >
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        theme="colored"
      />
      <Box sx={{ boxShadow: 'rgba(0, 0, 0, 0.16) 0px 2px 4px', marginTop: 8, padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4">Login</Typography>
        <TextField
          sx={{ width: '100%' }}
          label="Email"
          type="email"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          sx={{ width: '100%' }}
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleLogin} sx={{ marginTop: 2 }}>
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default LoginPage;
