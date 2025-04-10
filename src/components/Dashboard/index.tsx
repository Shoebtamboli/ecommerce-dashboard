import { Box, Typography, Card, CardContent, IconButton, Stack } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InventoryIcon from '@mui/icons-material/Inventory';
import ReactECharts from 'echarts-for-react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

// Mock data for analytics
const analyticsData = [
  {
    title: 'Total Sales',
    value: '$24,590',
    change: '+12.5%',
    isPositive: true,
    icon: <AttachMoneyIcon sx={{ fontSize: 40, color: theme => theme.palette.primary.main }} />,
    color: '#66A5AD'  // Light blue
  },
  {
    title: 'Total Orders',
    value: '1,254',
    change: '+8.2%',
    isPositive: true,
    icon: <ShoppingCartIcon sx={{ fontSize: 40, color: theme => theme.palette.secondary.main }} />,
    color: '#C4DFE6'  // Seafoam green
  },
  {
    title: 'New Customers',
    value: '325',
    change: '-2.4%',
    isPositive: false,
    icon: <PeopleIcon sx={{ fontSize: 40, color: theme => theme.palette.primary.main }} />,
    color: '#66A5AD'  // Light blue
  },
  {
    title: 'Product Stock',
    value: '582',
    change: '+5.7%',
    isPositive: true,
    icon: <InventoryIcon sx={{ fontSize: 40, color: theme => theme.palette.secondary.main }} />,
    color: '#C4DFE6'  // Seafoam green
  }
];

// Mock data for income overview
const incomeData = {
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  income: [4200, 5800, 6100, 5400, 7800, 8600, 7400, 9200, 8900, 9600, 8400, 9100],
};

// Mock data for orders overview
const ordersData = {
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  orders: [145, 178, 189, 167, 197, 214, 208, 233, 246, 255, 281, 293],
};

// Mock data for recent orders
const recentOrders = [
  { id: 1, orderNo: '#ORD-001', productName: 'Wireless Headphones', quantity: 2, status: 'Delivered', totalAmount: 199.99 },
  { id: 2, orderNo: '#ORD-002', productName: 'Smart Watch', quantity: 1, status: 'Processing', totalAmount: 299.99 },
  { id: 3, orderNo: '#ORD-003', productName: 'Laptop Stand', quantity: 3, status: 'Pending', totalAmount: 89.97 },
  { id: 4, orderNo: '#ORD-004', productName: 'Mechanical Keyboard', quantity: 1, status: 'Delivered', totalAmount: 159.99 },
  { id: 5, orderNo: '#ORD-005', productName: 'USB-C Hub', quantity: 2, status: 'Processing', totalAmount: 79.98 },
];

const columns: GridColDef[] = [
  { field: 'orderNo', headerName: 'Order No', width: 130 },
  { field: 'productName', headerName: 'Product Name', width: 200 },
  { field: 'quantity', headerName: 'Quantity', width: 100 },
  { 
    field: 'status', 
    headerName: 'Status', 
    width: 120,
    renderCell: (params) => (
      <Typography
        sx={{
          color: params.value === 'Delivered' ? 'success.main' :
                params.value === 'Processing' ? 'info.main' : 'warning.main',
          fontWeight: 'medium'
        }}
      >
        {params.value}
      </Typography>
    )
  },
  { 
    field: 'totalAmount', 
    headerName: 'Total Amount', 
    width: 130,
    renderCell: (params) => `$${params.value}`
  },
];

const getIncomeChartOptions = () => ({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: incomeData.months,
    axisTick: {
      alignWithLabel: true
    }
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      formatter: (value: number) => `$${value}`
    }
  },
  series: [{
    name: 'Monthly Income',
    type: 'bar',
    barWidth: '60%',
    data: incomeData.income,
    itemStyle: {
      color: '#66A5AD'  // Using our theme's primary color
    }
  }]
});

const getOrdersChartOptions = () => ({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'line'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: ordersData.months,
    axisTick: {
      alignWithLabel: true
    }
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      formatter: (value: number) => value
    }
  },
  series: [{
    name: 'Monthly Orders',
    type: 'line',
    smooth: true,
    data: ordersData.orders,
    itemStyle: {
      color: '#66A5AD'  // Using our theme's primary color
    },
    areaStyle: {
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{
          offset: 0,
          color: '#66A5AD33'
        }, {
          offset: 1,
          color: '#66A5AD00'
        }]
      }
    }
  }]
});

const Dashboard = () => {
  return (
    <Box sx={{ p: 3, backgroundColor: 'background.default' }}>
      <Typography variant="h4" component="h1" gutterBottom color="primary.main">
        Dashboard
      </Typography>

      {/* Analytics Cards */}
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
            backgroundColor: 'background.paper',
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

      {/* Charts Row */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', lg: 'row' },
        gap: 3,
        mt: 3
      }}>
        {/* Income Overview Chart */}
        <Card sx={{ flex: 1, minWidth: 0 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom color="primary.main">
              Income Overview
            </Typography>
            <ReactECharts
              option={getIncomeChartOptions()}
              style={{ height: '400px', width: '100%' }}
            />
          </CardContent>
        </Card>

        {/* Orders Overview Chart */}
        <Card sx={{ flex: 1, minWidth: 0 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom color="primary.main">
              Orders Overview
            </Typography>
            <ReactECharts
              option={getOrdersChartOptions()}
              style={{ height: '400px', width: '100%' }}
            />
          </CardContent>
        </Card>
      </Box>

      {/* Recent Orders Table */}
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom color="primary.main">
            Recent Orders
          </Typography>
          <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={recentOrders}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              disableRowSelectionOnClick
              sx={{
                '& .MuiDataGrid-columnHeaders': {
                  backgroundColor: 'secondary.light',
                },
              }}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Dashboard;