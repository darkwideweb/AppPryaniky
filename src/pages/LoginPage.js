import React, { useState } from 'react';
import { TextField, Button, Typography, CircularProgress, Snackbar, Box, Paper, InputAdornment, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import authService from '../services/authService';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const token = await authService.login({ username, password });
      localStorage.setItem('token', token);
      window.location.href = '/dashboard';
    } catch {
      setError('Не удалось выполнить вход. Проверьте логин и пароль.');
    } finally {
      setLoading(false);
    }
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box 
      sx={{ 
        height: '100vh', 
        width: '100vw', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#E0F7FA' 
      }}
    >
      <Paper 
        elevation={8} 
        sx={{
          padding: 6,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: 4,
          backgroundColor: '#fff',
          boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.2)',
          maxWidth: '400px', 
          width: '100%'
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <LockIcon 
            sx={{ 
              fontSize: 80, 
              color: '#0288D1', 
              background: 'rgba(2, 136, 209, 0.1)', 
              borderRadius: '50%', 
              padding: 2, 
              mb: 4 
            }} 
          />
        </motion.div>

        <Typography 
          variant="h4" 
          component="h1" 
          align="center" 
          gutterBottom 
          sx={{
            color: '#0288D1', 
            fontWeight: 'bold', 
            letterSpacing: '1px', 
            marginBottom: 3,
            fontFamily: 'Roboto, sans-serif'
          }}
        >
          Добро пожаловать
        </Typography>

        <Typography 
          variant="body1" 
          align="center" 
          sx={{ color: '#555', mb: 4 }} 
        >
          Введите свои данные для входа
        </Typography>

        <Box sx={{ width: '100%' }}>
          <TextField
            label="Логин"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon sx={{ color: '#0288D1' }} />
                </InputAdornment>
              ),
              sx: { borderRadius: '30px' }
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 30,
                '&:hover fieldset': {
                  borderColor: '#0288D1',
                },
              },
              '& label.Mui-focused': {
                color: '#0288D1',
              }
            }}
          />
          <TextField
            label="Пароль"
            variant="outlined"
            fullWidth
            margin="normal"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon sx={{ color: '#0288D1' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
              sx: { borderRadius: 30 }
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 30,
                '&:hover fieldset': {
                  borderColor: '#0288D1',
                },
              },
              '& label.Mui-focused': {
                color: '#0288D1',
              }
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogin}
            disabled={loading}
            fullWidth
            sx={{
              mt: 4,
              borderRadius: 30,
              padding: '12px 0',
              background: '#0288D1', 
              color: '#fff',
              fontWeight: 'bold',
              textTransform: 'none',
              boxShadow: '0 6px 15px rgba(2, 136, 209, 0.3)',
              '&:hover': {
                background: '#0277BD', 
                boxShadow: '0 8px 20px rgba(2, 136, 209, 0.4)',
              },
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Войти'}
          </Button>
        </Box>

        <Snackbar
          open={Boolean(error)}
          onClose={() => setError('')}
          message={error}
          autoHideDuration={6000}
          action={
            <Button color="inherit" onClick={() => setError('')}>Закрыть</Button>
          }
          sx={{
            '& .MuiSnackbarContent-root': {
              backgroundColor: 'error.main', 
              color: 'white'
            }
          }}
        />
      </Paper>
    </Box>
  );
}

export default LoginPage;
