import { Box, Button, Container, Paper, TextField, Typography, Divider, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { LoginFormValues } from '../../types/auth';

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Dummy authentication - in real app, this would be an API call
      if (values.email === 'admin@example.com' && values.password === 'password123') {
        // Store auth state in localStorage or context
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user', values.email);
        navigate('/dashboard');
      }
    },
  });

  return (
    <Container component="main" maxWidth="xs" sx={{ 
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      pt: 0,
      mt: 0
    }}>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Typography component="h1" variant="h5" gutterBottom>
            Sign in
          </Typography>
          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Demo Account Details
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Email: admin@example.com
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Password: password123
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;