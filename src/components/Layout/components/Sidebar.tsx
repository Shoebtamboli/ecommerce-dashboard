import { useLocation, useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import { styled } from '@mui/material/styles';

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'Orders', icon: <ShoppingCartIcon />, path: '/orders' },
  { text: 'Customers', icon: <PeopleIcon />, path: '/customers' },
  { text: 'Analytics', icon: <BarChartIcon />, path: '/analytics' },
  { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
];

const StyledListItemIcon = styled(ListItemIcon)({
  color: 'white',
  minWidth: 40,
});

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  '&.Mui-selected': {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.16)',
    },
  },
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
}));

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <List>
      {menuItems.map((item) => (
        <ListItem key={item.text} disablePadding>
          <StyledListItemButton
            selected={location.pathname === item.path}
            onClick={() => navigate(item.path)}
          >
            <StyledListItemIcon>{item.icon}</StyledListItemIcon>
            <ListItemText primary={item.text} />
          </StyledListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default Sidebar;