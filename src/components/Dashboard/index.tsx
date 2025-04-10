import { Box, Typography, Card, CardContent, IconButton, Stack, Chip } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InventoryIcon from '@mui/icons-material/Inventory';
import ReactECharts from 'echarts-for-react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { format } from 'date-fns';

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

// Mock data for recent orders with additional fields
const recentOrders = [
  { 
    id: 1, 
    orderNo: '#ORD-001', 
    customerName: 'John Smith',
    email: 'john.smith@email.com',
    productName: 'Wireless Headphones', 
    quantity: 2, 
    status: 'Delivered',
    paymentMethod: 'Credit Card',
    orderDate: new Date('2025-04-09T10:30:00'),
    totalAmount: 199.99 
  },
  { 
    id: 2, 
    orderNo: '#ORD-002', 
    customerName: 'Emily Johnson',
    email: 'emily.j@email.com',
    productName: 'Smart Watch', 
    quantity: 1, 
    status: 'Processing',
    paymentMethod: 'PayPal',
    orderDate: new Date('2025-04-10T09:15:00'),
    totalAmount: 299.99 
  },
  { 
    id: 3, 
    orderNo: '#ORD-003',
    customerName: 'Michael Brown',
    email: 'm.brown@email.com', 
    productName: 'Laptop Stand', 
    quantity: 3, 
    status: 'Pending',
    paymentMethod: 'Debit Card',
    orderDate: new Date('2025-04-10T11:45:00'),
    totalAmount: 89.97 
  },
  { 
    id: 4, 
    orderNo: '#ORD-004',
    customerName: 'Sarah Wilson',
    email: 's.wilson@email.com', 
    productName: 'Mechanical Keyboard', 
    quantity: 1, 
    status: 'Delivered',
    paymentMethod: 'Credit Card',
    orderDate: new Date('2025-04-09T14:20:00'),
    totalAmount: 159.99 
  },
  { 
    id: 5, 
    orderNo: '#ORD-005',
    customerName: 'David Lee',
    email: 'd.lee@email.com', 
    productName: 'USB-C Hub', 
    quantity: 2, 
    status: 'Processing',
    paymentMethod: 'PayPal',
    orderDate: new Date('2025-04-10T08:30:00'),
    totalAmount: 79.98 
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Delivered':
      return {
        color: 'success',
        variant: 'outlined'
      };
    case 'Processing':
      return {
        color: 'info',
        variant: 'outlined'
      };
    case 'Pending':
      return {
        color: 'warning',
        variant: 'outlined'
      };
    default:
      return {
        color: 'default',
        variant: 'outlined'
      };
  }
};

const columns: GridColDef[] = [
  { 
    field: 'orderNo', 
    headerName: 'Order No', 
    width: 120,
    headerAlign: 'center',
    align: 'center',
    renderCell: (params) => (
      <Typography variant="body2" sx={{ fontWeight: 'medium', color: 'primary.main' }}>
        {params.value}
      </Typography>
    )
  },
  { 
    field: 'customerName', 
    headerName: 'Customer', 
    width: 180,
    headerAlign: 'center',
    align: 'center',
    renderCell: (params) => (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
          {params.value}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {params.row.email}
        </Typography>
      </Box>
    )
  },
  { 
    field: 'productName', 
    headerName: 'Product', 
    flex: 1,
    minWidth: 180,
    headerAlign: 'center',
    align: 'center',
    renderCell: (params) => (
      <Typography variant="body2" sx={{ textAlign: 'center' }}>
        {params.value}
      </Typography>
    )
  },
  { 
    field: 'quantity', 
    headerName: 'Qty', 
    width: 70,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => (
      <Typography variant="body2" sx={{ width: '100%', textAlign: 'center' }}>
        {params.value}
      </Typography>
    )
  },
  { 
    field: 'paymentMethod', 
    headerName: 'Payment', 
    width: 120,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => (
      <Typography variant="body2">
        {params.value}
      </Typography>
    )
  },
  {
    field: 'orderDate',
    headerName: 'Date',
    width: 160,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => (
      <Typography variant="body2">
        {format(params.value, 'MMM dd, yyyy HH:mm')}
      </Typography>
    )
  },
  { 
    field: 'status', 
    headerName: 'Status', 
    width: 120,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => {
      const statusConfig = getStatusColor(params.value);
      return (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <Chip
            label={params.value}
            color={statusConfig.color as any}
            variant={statusConfig.variant as any}
            size="small"
            sx={{ minWidth: 85, justifyContent: 'center' }}
          />
        </Box>
      );
    }
  },
  { 
    field: 'totalAmount', 
    headerName: 'Total', 
    width: 120,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => (
      <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
        ${params.value.toFixed(2)}
      </Typography>
    )
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
          <Typography variant="h6" gutterBottom color="primary.main" sx={{ textAlign: 'center' }}>
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
                  borderRadius: 1,
                  fontWeight: 'bold',
                },
                '& .MuiDataGrid-cell': {
                  borderColor: 'secondary.light',
                  py: 1.5,
                  justifyContent: 'center'
                },
                '& .MuiDataGrid-row:hover': {
                  backgroundColor: 'secondary.light'
                },
                '& .MuiDataGrid-row:nth-of-type(odd)': {
                  backgroundColor: 'background.default'
                },
                '& .MuiChip-root': {
                  fontWeight: 500
                }
              }}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Dashboard;