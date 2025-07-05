import React, { useState } from 'react';
import {
  AppBar, Toolbar, Typography, IconButton, Box, Paper, TextField, InputAdornment,
  Select, MenuItem, Menu, Button, Breadcrumbs, Link, Tooltip
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import GroupsIcon from '@mui/icons-material/Groups';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link as RouterLink } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';


// MUI X Imports
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const UpdateEmp = () => {
  const [mainAnchorEl, setMainAnchorEl] = useState(null);
  const [infoAnchorEl, setInfoAnchorEl] = useState(null);
  const openMainMenu = Boolean(mainAnchorEl);
  const openInfoMenu = Boolean(infoAnchorEl);
  const [employeeType, setEmployeeType] = useState('Current Employees');
  const [chatOpen, setChatOpen] = useState(false);

  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');


  const [monthPickerOpen, setMonthPickerOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(dayjs());

  const handleMainMenuClick = (event) => setMainAnchorEl(event.currentTarget);
  const handleMainMenuClose = () => setMainAnchorEl(null);

  const handleInfoMenuClick = (event) => setInfoAnchorEl(event.currentTarget);
  const handleInfoMenuClose = () => setInfoAnchorEl(null);

  const [settingsAnchorEl, setSettingsAnchorEl] = useState(null);
  const openSettingsMenu = Boolean(settingsAnchorEl);

  const handleSettingsMenuClick = (event) => setSettingsAnchorEl(event.currentTarget);
  const handleSettingsMenuClose = () => setSettingsAnchorEl(null);


  const [adminAnchorEl, setAdminAnchorEl] = useState(null);
  const openAdminMenu = Boolean(adminAnchorEl);

  const [setupAnchorEl, setSetupAnchorEl] = useState(null);
  const openSetupMenu = Boolean(setupAnchorEl);

  const [activeTab, setActiveTab] = useState('Employee');
  const [employeeHovered, setEmployeeHovered] = useState(false);

  const navButtonStyle = (tabName) => ({
  color: activeTab === tabName ? 'primary.main' : 'white',
  backgroundColor: activeTab === tabName ? 'rgba(0,123,255,0.1)' : 'transparent',
  fontWeight: activeTab === tabName ? 600 : 500,
  textTransform: 'none',
  borderRadius: 2,
  px: 2,
  py: 0.5,
  '&:hover': {
    backgroundColor: 'rgba(0,123,255,0.15)',
  },
});

const handleSendMessage = () => {
  if (inputValue.trim()) {
    setMessages((prev) => [...prev, inputValue, 'Thank you for reaching out!']);
    setInputValue('');
  }
};

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ backgroundColor: 'rgba(255,255,255,0.1)', minHeight: '100vh' }}>
        {/* Navbar */}
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            backgroundColor: '#212121',
            borderBottom: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          <Toolbar >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexGrow: 1 }}>
            <Typography variant="h6" sx={{ color: 'primary.light' }}><img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmxvVgUbUVuW7In4M3VxZYEuGl29BoYeO9QA&s"
                alt="illustration"
                width={40}
                
              /></Typography>
           <Box sx={{ display: 'flex', gap: 1 }}>
  <Box
  onMouseEnter={() => setEmployeeHovered(true)}
  onMouseLeave={() => setEmployeeHovered(false)}
  sx={{ position: 'relative' }}
>
  <Button sx={navButtonStyle('Employee')} onClick={() => setActiveTab('Employee')}>
    Employee
  </Button>

  {employeeHovered && (
    <Box
      sx={{
        position: 'absolute',
        top: '100%',
        left: 0,
        backgroundColor: '#fff',
        color: '#000',
        px: 2,
        py: 1,
        borderRadius: 1,
        boxShadow: 3,
        whiteSpace: 'nowrap',
        mt: 1,
        zIndex: 10,
        fontSize: '13px',
        fontWeight: 500,
      }}
    >
      Employee Overview
    </Box>
  )}
</Box>


  {/* MAIN */}
  <Box
    onMouseEnter={(e) => {
      setMainAnchorEl(e.currentTarget);
      setActiveTab('Main');
    }}
    onMouseLeave={() => setMainAnchorEl(null)}
  >
    <Button sx={navButtonStyle('Main')} >
      Main
      <KeyboardArrowDownIcon
        sx={{
          transform: openMainMenu ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s',
          color: activeTab === 'Main' ? 'primary.main' : 'secondary.500'
        }}
      />
    </Button>
    <Menu
      anchorEl={mainAnchorEl}
      open={openMainMenu}
      onClose={() => setMainAnchorEl(null)}
      MenuListProps={{
        onMouseEnter: () => setMainAnchorEl(mainAnchorEl),
        onMouseLeave: () => setMainAnchorEl(null),
      }}
    >
      <MenuItem onClick={() => setMainAnchorEl(null)}>Analytics Hub</MenuItem>
      <MenuItem onClick={() => setMainAnchorEl(null)}>Organization Chart</MenuItem>
    </Menu>
  </Box>

  {/* INFORMATION */}
  <Box
    onMouseEnter={(e) => {
      setInfoAnchorEl(e.currentTarget);
      setActiveTab('Information');
    }}
    onMouseLeave={() => setInfoAnchorEl(null)}
  >
    <Button sx={navButtonStyle('Information')}>
      Information
      <KeyboardArrowDownIcon
        sx={{
          transform: openInfoMenu ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s',
          color: activeTab === 'Information' ? 'primary.main' : 'secondary.500'
        }}
      />
    </Button>
    <Menu
      anchorEl={infoAnchorEl}
      open={openInfoMenu}
      onClose={() => setInfoAnchorEl(null)}
      MenuListProps={{
        onMouseEnter: () => setInfoAnchorEl(infoAnchorEl),
        onMouseLeave: () => setInfoAnchorEl(null),
      }}
    >
      <MenuItem onClick={() => setInfoAnchorEl(null)}>Bank/PF/ESI</MenuItem>
      <MenuItem onClick={() => setInfoAnchorEl(null)}>Family Details</MenuItem>
      <MenuItem onClick={() => setInfoAnchorEl(null)}>Position History</MenuItem>
      <MenuItem onClick={() => setInfoAnchorEl(null)}>Previous Employment</MenuItem>
      <MenuItem onClick={() => setInfoAnchorEl(null)}>Separation</MenuItem>
      <MenuItem onClick={() => setInfoAnchorEl(null)}>Access Card Deatils</MenuItem>
      <MenuItem onClick={() => setInfoAnchorEl(null)}>Employmee Documents</MenuItem>
    </Menu>
  </Box>

 {/* ADMIN */}
<Box
  onMouseEnter={(e) => {
    setAdminAnchorEl(e.currentTarget);
    setActiveTab('Admin');
  }}
  onMouseLeave={() => setAdminAnchorEl(null)}
>
  <Button sx={navButtonStyle('Admin')}>
    Admin
    <KeyboardArrowDownIcon
      sx={{
        transform: openAdminMenu ? 'rotate(180deg)' : 'rotate(0deg)',
        transition: 'transform 0.2s',
        color: activeTab === 'Admin' ? 'primary.main' : 'secondary.500'
      }}
    />
  </Button>
  <Menu
    anchorEl={adminAnchorEl}
    open={openAdminMenu}
    onClose={() => setAdminAnchorEl(null)}
    MenuListProps={{
      onMouseEnter: () => setAdminAnchorEl(adminAnchorEl),
      onMouseLeave: () => setAdminAnchorEl(null),
    }}
  >
    <MenuItem onClick={() => setAdminAnchorEl(null)}>General Letter </MenuItem>
    <MenuItem onClick={() => setAdminAnchorEl(null)}>Excel Import</MenuItem>
    <MenuItem onClick={() => setAdminAnchorEl(null)}>Bulletin Board</MenuItem>
    <MenuItem onClick={() => setAdminAnchorEl(null)}>Mass Communication</MenuItem>
  </Menu>
</Box>

{/* SETUP */}
<Box
  onMouseEnter={(e) => {
    setSetupAnchorEl(e.currentTarget);
    setActiveTab('Setup');
  }}
  onMouseLeave={() => setSetupAnchorEl(null)}
>
  <Button sx={navButtonStyle('Setup')}>
    Setup
    <KeyboardArrowDownIcon
      sx={{
        transform: openSetupMenu ? 'rotate(180deg)' : 'rotate(0deg)',
        transition: 'transform 0.2s',
        color: activeTab === 'Setup' ? 'primary.main' : 'secondary.500'
      }}
    />
  </Button>
  <Menu
    anchorEl={setupAnchorEl}
    open={openSetupMenu}
    onClose={() => setSetupAnchorEl(null)}
    MenuListProps={{
      onMouseEnter: () => setSetupAnchorEl(setupAnchorEl),
      onMouseLeave: () => setSetupAnchorEl(null),
    }}
  >
    <MenuItem onClick={() => setSetupAnchorEl(null)}>Company Ploicies & Forms</MenuItem>
  </Menu>
</Box>
</Box>
</Box>


            <Box>
              <Tooltip title="Search"><IconButton sx={{ color: 'white' }}><SearchIcon /></IconButton></Tooltip>
              <Tooltip title="Settings"><IconButton sx={{ color: 'white' }} onClick={handleSettingsMenuClick}><SettingsIcon /></IconButton></Tooltip>
              <Menu
  anchorEl={settingsAnchorEl}
  open={openSettingsMenu}
  onClose={handleSettingsMenuClose}
  PaperProps={{
    sx: { minWidth: 220, p: 1 }
  }}
>
  <Typography sx={{ px: 2, py: 1, fontSize: 13, color: 'gray' }}>Go to</Typography>
  <MenuItem onClick={handleSettingsMenuClose}>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <span role="img" aria-label="profile">👤</span> My Profile
    </Box>
  </MenuItem>
  <MenuItem onClick={handleSettingsMenuClose}>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <SettingsIcon fontSize="small" /> Account Settings
    </Box>
  </MenuItem>
  <MenuItem onClick={handleSettingsMenuClose}>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <span role="img" aria-label="admin">🛠️</span> User Administration
    </Box>
  </MenuItem>
  <MenuItem onClick={handleSettingsMenuClose}>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <span role="img" aria-label="system">🖥️</span> System Settings
    </Box>
  </MenuItem>
</Menu>

              <Tooltip title="Logout"><IconButton sx={{ color: 'error.light' }}><LogoutIcon /></IconButton></Tooltip>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Page Content */}
        <Box p={3} pt={10}  >
          <Box sx={{borderRadius: '5px',backgroundColor:'rgba(255,255,255,0.3)' , p:3, maxWidth: '1200px',mx: 'auto'}}>
          {/* Breadcrumb and Filters in One Row */}
          <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Breadcrumbs aria-label="breadcrumb" separator=">" sx={{ '& .MuiBreadcrumbs-separator': {color: 'rgba(255,255,255,0.4)' } }}>
              <Link underline="hover" component={RouterLink} color="rgba(255,255,255,0.4)" to="/welcomepage">Home</Link>
              <Link underline="hover" component={RouterLink} color="rgba(255,255,255,0.4)" href="/updateemp">Employee</Link>
              <Typography color="rgba(255,255,255,0.4)">{activeTab}</Typography>
            </Breadcrumbs>

            <Box display="flex" gap={2} alignItems="center">
              {/* Month Picker */}
              <DatePicker
                views={['year', 'month']}
                open={monthPickerOpen}
                onOpen={() => setMonthPickerOpen(true)}
                onClose={() => setMonthPickerOpen(false)}
                value={selectedMonth}
                onChange={(newValue) => {
                  setSelectedMonth(newValue);
                  setMonthPickerOpen(false);
                }}
                renderInput={() => (
                  <Button
                    variant="outlined"
                    startIcon={<CalendarMonthIcon />}
                    onClick={() => setMonthPickerOpen(true)}
                    sx={{ textTransform: 'none', fontWeight: 500 }}
                  >
                    Payroll Month: {selectedMonth.format("MMM 'YY")}
                  </Button>
                )}
              />

              {/* Department with Icon */}
              <Select
                size="small"
                defaultValue="All"
                displayEmpty
                startAdornment={<GroupsIcon sx={{ color: 'action.active', mr: 1 }} />}
                sx={{ minWidth: 120, backgroundColor: 'white' }}
              >
                <MenuItem value="No Options">No Options</MenuItem>
              </Select>
            </Box>
          </Box>

          {/* Help Info */}
          <Paper sx={{ p: 2, mb: 3, backgroundColor: '#e9f6fc' }}>
            <Typography>
              This page allows you to add/edit the profile details of an employee. The page helps you to keep the employee information up to date.
            </Typography>
            <Typography variant="body2" mt={1}>
              Explore greyHR by <Link href="#">Help-Doc</Link>, watching <Link href="#">How-to Videos</Link> and <Link href="#">FAQ</Link>.
            </Typography>
          </Paper>
          </Box>

          {/* Search Section */}
          <Paper sx={{ p: 3, display: 'flex', justifyContent: 'space-between',maxWidth: '1200px',mx: 'auto', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.3)', mt: 3 }}>
            <Box width="100%" maxWidth="500px">
              <Typography fontWeight="bold" fontSize="18px" mb={1} color="white">
                Start searching to see specific employee details here
              </Typography>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
              <Typography variant="body2" mb={1} color="white">
                Employee Type:  </Typography>
                <Select
    value={employeeType}
    onChange={(e) => setEmployeeType(e.target.value)}
    size="small"
    variant="standard"
    disableUnderline
    sx={{
      color: 'white',
      backgroundColor: 'transparent',
      '& .MuiSelect-icon': { color: 'white' }
    }}
  >
    <MenuItem value="All">All</MenuItem>
    <MenuItem value="Current Employees">Current Employees</MenuItem>
    <MenuItem value="Reassigned Employees">Resigned Employees</MenuItem>
  </Select>
</Box>

              <TextField
  fullWidth
  placeholder="Search by Emp No/ Name"
  variant="outlined"
  size="small"
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <SearchIcon sx={{ color: 'white' }} />
      </InputAdornment>
    ),
    sx: {
      width: 300,
      color: 'white',
      '& input': {
        color: 'white',                         // Text color
        '::placeholder': {
          color: 'white',                       // Placeholder color
          opacity: 0.2,
        },
      },
      '& fieldset': {
        borderColor: 'white',                   // Border color
        borderRadius: '20px',
       
      },
      '&:hover fieldset': {
        borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white',
      }
    }
  }}
  sx={{
    '& .MuiOutlinedInput-root': {
      color: 'white',
      '& fieldset': {
        borderColor: 'white',
      },
      '&:hover fieldset': {
        borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white',
      },
    },
    '& input::placeholder': {
      color: 'white',
      opacity: 1,
    }
  }}
/>

            </Box>

            <Box>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmxvVgUbUVuW7In4M3VxZYEuGl29BoYeO9QA&s"
                alt="illustration"
                width={180}
                
              />
            </Box>
          </Paper>
        </Box>
      </Box>
      {/* Chatbox Floating Button + Window */}
{/* Chatbox Floating Button + Window */}
<Box
  sx={{
    position: 'fixed',
    bottom: 20,
    left: 20,
    zIndex: 1000,
  }}
>
  <Button
    variant="contained"
    color="primary"
    onClick={() => setChatOpen((prev) => !prev)}
    sx={{ borderRadius: '50%', minWidth: 0, width: 56, height: 56 }}
  >
    💬
  </Button>

  {chatOpen && (
    <Paper
      elevation={3}
      sx={{
        mt: 1,
        width: 300,
        height: 350,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        p: 2,
        backgroundColor: 'white',
      }}
    >
      <Typography variant="h6" fontSize="16px" fontWeight="bold" mb={1}>
        Chat Support
      </Typography>

      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          backgroundColor: '#f5f5f5',
          borderRadius: 1,
          p: 1,
          mb: 1,
        }}
      >
        {messages.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            Hi there! How can I help you?
          </Typography>
        ) : (
          messages.map((msg, idx) => (
            <Box
              key={idx}
              sx={{
                backgroundColor: idx % 2 === 0 ? '#1976d2' : '#e0e0e0',
                color: idx % 2 === 0 ? 'white' : 'black',
                alignSelf: idx % 2 === 0 ? 'flex-end' : 'flex-start',
                maxWidth: '75%',
                px: 1.5,
                py: 1,
                borderRadius: 2,
                mb: 1,
              }}
            >
              <Typography variant="body2">{msg}</Typography>
            </Box>
          ))
        )}
      </Box>

      <TextField
        placeholder="Type a message..."
        size="small"
        variant="outlined"
        fullWidth
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton size="small" color="primary" onClick={handleSendMessage}>
                <SendIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Paper>
  )}
</Box>


    </LocalizationProvider>
  );
};

export default UpdateEmp;
