import { Box, Typography, Card, CardContent, IconButton, Stack } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InventoryIcon from '@mui/icons-material/Inventory';

// Mock data for analytics
const analyticsData = [
  {
    title: 'Total Sales',
    value: '$24,590',
    change: '+12.5%',
    isPositive: true,
    icon: <AttachMoneyIcon sx={{ fontSize: 40, color: theme => theme.palette.primary.main }} />,
    color: '#B85042'  // Terracotta red
  },
  {
    title: 'Total Orders',
    value: '1,254',
    change: '+8.2%',
    isPositive: true,
    icon: <ShoppingCartIcon sx={{ fontSize: 40, color: theme => theme.palette.secondary.main }} />,
    color: '#A7BEAE'  // Muted teal
  },
  {
    title: 'New Customers',
    value: '325',
    change: '-2.4%',
    isPositive: false,
    icon: <PeopleIcon sx={{ fontSize: 40, color: theme => theme.palette.primary.main }} />,
    color: '#B85042'  // Terracotta red
  },
  {
    title: 'Product Stock',
    value: '582',
    change: '+5.7%',
    isPositive: true,
    icon: <InventoryIcon sx={{ fontSize: 40, color: theme => theme.palette.secondary.main }} />,
    color: '#A7BEAE'  // Muted teal
  }
];

const Dashboard = () => {
  return (
    <Box sx={{ p: 3, backgroundColor: 'tertiary.light' }}>
      <Typography variant="h4" component="h1" gutterBottom color="primary.main">
        Dashboard
      </Typography>

      <Box sx={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: 3,
        '& > *': {
          flexGrow: 1,
          flexBasis: {
            xs: '100%',
            sm: 'calc(50% - 12px)',
            md: 'calc(25% - 18px)'
          },
          minWidth: 0
        }
      }}>
        {analyticsData.map((item, index) => (
          <Card key={index} sx={{ 
            height: '100%',
            boxShadow: 2,
            '&:hover': {
              boxShadow: 4,
              transform: 'translateY(-2px)',
              transition: theme => theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
              }),
            },
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <IconButton 
                  sx={{ 
                    backgroundColor: `${item.color}15`,
                    '&:hover': { backgroundColor: `${item.color}25` }
                  }}
                >
                  {item.icon}
                </IconButton>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  {item.isPositive ? (
                    <TrendingUpIcon sx={{ color: 'success.main' }} />
                  ) : (
                    <TrendingDownIcon sx={{ color: 'error.main' }} />
                  )}
                  <Typography 
                    variant="body2" 
                    sx={{ color: item.isPositive ? 'success.main' : 'error.main' }}
                  >
                    {item.change}
                  </Typography>
                </Stack>
              </Box>
              <Typography variant="h4" sx={{ mb: 1, color: 'text.primary' }}>
                {item.value}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {item.title}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Dashboard;