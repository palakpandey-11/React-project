import React, { useState } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Container,
  ToggleButtonGroup,
  ToggleButton,
  Typography,
  Paper,
  Grid,
  Card,

} from '@mui/material';
import {
  Search as SearchIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Person as PersonIcon,
  Storage as StorageIcon,
  CreditCard as CreditCardIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';


export default function Welcome() {
  const [view, setView] = useState('welcome');
  const navigate = useNavigate();

  const favouriteItems = [
    { title: 'Update Employee Data', icon: PersonIcon, color: 'primary.main',  route: '/updateemp' },
    { title: 'Add Employee', icon: PersonIcon, color: 'primary.main',  route: '/addemp' },
    { title: 'Update Payroll Data', icon: StorageIcon, color: 'warning.main', route:"/updatepayroll" },
    { title: 'Process Payroll', icon: CreditCardIcon, color: 'warning.main',  route:"/updatepayroll" },
    { title: 'Salary statement for a month', icon: StorageIcon, color: 'warning.main',  route:"/updatepayroll" },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `url('https://source.unsplash.com/1920x1080/?galaxy')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'common.white',
        overflowY: 'hidden',
        overflowX:'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Transparent AppBar */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{ backgroundColor: 'rgba(20, 20, 20, 0.74)', backdropFilter: 'blur(6px)' }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ color: 'grey',fontWeight: "bold" }}>
            FlowSync
          </Typography>
          <Box>
            <IconButton sx={{ color: 'white' }}><SearchIcon /></IconButton>
            <IconButton sx={{ color: 'white' }}><SettingsIcon /></IconButton>
            <IconButton sx={{ color: 'error.light' }}><LogoutIcon /></IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Container
        maxWidth="lg"
        disableGutters
        sx={{
          pt: 10,
         flex:1,
           //overflowY: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Tabs */}
        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={(_, v) => v && setView(v)}
          sx={{
           // bgcolor: 'rgba(33, 33, 33, 0.6)',
            borderRadius: 2,
            mb: 4,
            '& .MuiToggleButton-root': {
              textTransform: 'none',
              fontWeight: 'bold',
              color: 'grey.300',
              px: 4,
              py: 1,
              '&.Mui-selected': {
                bgcolor: 'primary.main',
                color: 'common.white',
              },
            },
          }}
        >
          <ToggleButton value="welcome">Components</ToggleButton>
          <ToggleButton value="dashboard">Dashboard</ToggleButton>
        </ToggleButtonGroup>

        {/* Hero “Glass” Panel */}
        

        {/* My Favourites */}
        <Box sx={{ width: '100%', maxWidth: 1200, mx:'auto', px:'12px', overflowX:"hidden" }}>
          <Typography variant="h5" gutterBottom sx={{ mb: 2, pl: 1 }}>
            Components
          </Typography>

          <Grid container spacing={3}>
            

            {favouriteItems.map((item, idx) => (
              <Grid key={idx} item xs={12} sm={6} md={4} lg={3}>
                <Card
                  sx={{
                    height: 160,
                    bgcolor: item.color,
                    color: 'common.white',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: 4,
                    cursor: item.route ? 'pointer' : 'default'
                  }}
                  onClick={() => item.route && navigate(item.route)}
                >
                  <item.icon sx={{ fontSize: 40, mb: 1 }} />
                  <Typography variant="body1" align="center" sx={{ px: 1 }}>
                    {item.title}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}