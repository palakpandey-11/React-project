import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

export default function Welcomepage() {
  const navigate = useNavigate();
  const [view, setView] = useState('welcome');

  const favouriteItems = [
    { title: 'Update Employee Data', icon: PersonIcon, color: 'primary.main',  route: '/updateemp' },
    { title: 'Add Employee', icon: PersonIcon, color: 'primary.main' },
    { title: 'Update Payroll Data', icon: StorageIcon, color: 'warning.main' },
    { title: 'Process Payroll', icon: CreditCardIcon, color: 'warning.main' },
    { title: 'Salary statement for a month', icon: StorageIcon, color: 'warning.main' },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        // backgroundImage: `url('https://source.unsplash.com/1920x1080/?galaxy')`,
        // backgroundSize: 'cover',
        // backgroundPosition: 'center',
        // backgroundRepeat: 'no-repeat',
        color: 'common.white',
        overflowX: 'hidden',
      }}
    >
      {/* Transparent AppBar */}
      <AppBar position="fixed" elevation={0}sx={{backgroundColor:'rgba(0, 0, 0, 0.44)'}}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ color: 'primary.light' }}>
            Your Logo Here
          </Typography>
          <Box>
            <IconButton sx={{color:'white'}}><SearchIcon /></IconButton>
            <IconButton sx={{color:'white'}}><SettingsIcon /></IconButton>
            <IconButton sx={{ color: 'error.light' }}><LogoutIcon /></IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Container
        maxWidth="lg"
        disableGutters
        sx={{
          pt: 10,     // push below AppBar
          pb: 6,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Toggle Buttons */}
        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={(_, v) => v && setView(v)}
   sx={{bgcolor: 'rgba(66, 62, 62, 0.7)',
    '& .MuiToggleButton-root': {
      textTransform: 'none',       // keep your casing
      fontWeight: 'bold',
      color: 'white',           // default text color
      px: 3,                       // horizontal padding
      py: 1,
     
      borderRadius: 2,
      
      '&.Mui-selected': {
        bgcolor: 'rgba(98, 72, 192, 0.74)', // your new selected background
        color: 'common.white',     // selected text color
      },
      '&.Mui-selected:hover': {
         bgcolor: 'rgba(98, 72, 192, 0.74)',
      },
    },
  }}
        >
          <ToggleButton value="welcome">Welcome</ToggleButton>
          <ToggleButton value="dashboard">Dashboard</ToggleButton>
        </ToggleButtonGroup>

        {/* Hero “Glass” Panel */}
        <Paper
          elevation={6}
          sx={{
            width: '100%',
            maxWidth: 1000,
            textAlign: 'center',
            p: 4,
            mb: 8,
            bgcolor:'white',
            backgroundImage: `url('C:/React/React-project/src/citylight.png')`,  
            backgroundSize:'cover',
            backgroundPosition: 'center',
            borderRadius: 3,
          }}
        >
          <Typography variant="h2" gutterBottom>
            Good Eve,
          </Typography>
          <Typography variant="h6" color="grey.300">
            Let's do great things together. 🚀 ⭐
          </Typography>
        </Paper>

        {/* My Favourites */}
        <Box sx={{ width: '100%' }}>
          <Typography variant="h5" gutterBottom>
            My Favourites
          </Typography>
          <Grid container spacing={3}>
            {/* “Add” Card */}
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Card
                sx={{
                  height: 160,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px dashed',
                  borderColor: 'primary.light',
                  bgcolor: 'rgba(25,118,210,0.1)',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    bgcolor: 'rgba(25,118,210,0.2)',
                  },
                }}
              >
                <AddIcon sx={{ fontSize: 40, color: 'primary.light' }} />
              </Card>
            </Grid>

            {favouriteItems.map((item, idx) => (
              <Grid key={idx} item xs={12} sm={6} md={4} lg={3}>
                <Card
                 onClick={() => {
                 if (item.route) navigate(item.route);
                }}
                  sx={{
                    height: 160,
                    bgcolor: item.color,
                    color: 'common.white',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    cursor: item.route ? 'pointer' : 'default',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 6,
                    },
                  }}
                >
                  <item.icon sx={{ fontSize: 36, mb: 1 }} />
                  <Typography variant="body1" align="center">
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