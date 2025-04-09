import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem('user');

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body1" gutterBottom>
        Welcome, {user || 'User'}!
      </Typography>
      <Button variant="contained" color="primary" onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  );
};

export default Dashboard;