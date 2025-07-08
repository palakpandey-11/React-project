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
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

const UpdateEmp = () => {
  const navigate = useNavigate();
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

  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const [adminAnchorEl, setAdminAnchorEl] = useState(null);
  const openAdminMenu = Boolean(adminAnchorEl);

  const [setupAnchorEl, setSetupAnchorEl] = useState(null);
  const openSetupMenu = Boolean(setupAnchorEl);

  const [activeTab, setActiveTab] = useState('Employee');
  const [employeeHovered, setEmployeeHovered] = useState(false);

  const navButtonStyle = (tabName) => ({
  color: activeTab === tabName ? 'white' : 'white',
  backgroundColor: activeTab === tabName ? 'rgba(39, 37, 37, 0.74)' : 'transparent',
  fontWeight: activeTab === tabName ? 600 : 500,
  textTransform: 'none',
  borderRadius: 2,
  px: 2,
  py: 0.5,
  '&:hover': {
    backgroundColor: 'rgba(39, 37, 37, 0.74)',
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
      {searchModalOpen && (
  <Box
    sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      bgcolor: 'rgba(0,0,0,0.4)',
      zIndex: 1300,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backdropFilter: 'blur(4px)',
    }}
  >
    <Paper
      elevation={4}
      sx={{
        width: 700,
        maxHeight: '90vh',
        p: 3,
        borderRadius: 2,
        overflowY: 'auto',
      }}
    >
      {/* Top Row: Search + Close */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Search</Typography>
        <IconButton onClick={() => setSearchModalOpen(false)}>✖</IconButton>
      </Box>

      {/* Search Input */}
      <TextField
        fullWidth
        placeholder="Search Here"
        variant="outlined"
        size="small"
        sx={{ mb: 2 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      {/* Filter Buttons */}
      <Box display="flex" gap={1} flexWrap="wrap" mb={2}>
        {['All', 'My Favourites', 'Employee', 'Payroll', 'Leave'].map((label) => (
          <Button key={label} variant="outlined" size="small" sx={{ borderRadius: 5 }}>
            {label}
          </Button>
        ))}
      </Box>

      {/* Cards Grid */}
      <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(150px, 1fr))" gap={2}>
        {[
          'Add Bulletin Board', 'Add Employee', 'Approve Comp off', 'Approve leave',
          'Approve leave cancellation', 'Assign Manager', 'Attendance', 'Attendance Muster',
          'Bank Transfer', 'Bulk Data Upload'
        ].map((title, idx) => (
          <Paper key={idx} sx={{ p: 2, borderRadius: 2, backgroundColor: idx % 3 === 0 ? '#e3f2fd' : idx % 3 === 1 ? '#fce4ec' : '#e8f5e9' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Box component="span" sx={{ fontSize: 24 }}>👤</Box>
              <IconButton size="small">
                <span>⭐</span>
              </IconButton>
            </Box>
            <Typography variant="body2" fontWeight={500}>{title}</Typography>
          </Paper>
        ))}
      </Box>
    </Paper>
  </Box>
)}

      <Box sx={{ backgroundColor: 'transparent', minHeight: '100vh' }}>
        {/* Navbar */}
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            backgroundColor: 'rgba(39, 37, 37, 0.74)',
          }}
        >
          <Toolbar >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexGrow: 1 }}>
            <Typography variant="h6" sx={{ color: 'grey', fontWeight: "bold" }}>FlowSync</Typography>
           <Box sx={{ display: 'flex', gap: 1 }}>
  <Box
  onMouseEnter={() => setEmployeeHovered(true)}
  onMouseLeave={() => setEmployeeHovered(false)}
  sx={{ position: 'relative' }}
>
  <Button sx={navButtonStyle('Employee')} onClick={() => setActiveTab('Employee')} >
    Employee
  </Button>

  {employeeHovered && (
    <Box
      sx={{
        position: 'absolute',
        top: '100%',
        left: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        color: 'white',
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
          color: activeTab === 'Main' ? 'white' : 'white'
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
      PaperProps={{
      sx: {
      backgroundColor: 'rgba(0,0,0,0.7)', // dropdown background black
      color: 'white',          // menu item text white
    }
  }}
    >
      <MenuItem onClick={() => {setMainAnchorEl(null); navigate('/analytics')}} sx={{
      "&:hover": {
        bgcolor: "rgba(25,118,210,0.2)",
         borderLeft: "4px solid transparent",
        borderLeftColor: "primary.light",
      }
    }} >Analytics Hub</MenuItem>
      <MenuItem onClick={() => setMainAnchorEl(null)} sx={{
      "&:hover": {
        bgcolor: "rgba(25,118,210,0.2)",
         borderLeft: "4px solid transparent",
        borderLeftColor: "primary.light",
      }
    }}>Organization Chart</MenuItem>
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
          color: activeTab === 'Information' ? 'white' : 'white'
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
      PaperProps={{
      sx: {
      backgroundColor: 'rgba(0,0,0,0.7)', // dropdown background black
      color: 'white',          // menu item text white
    }
  }}
    >
      <MenuItem onClick={() => setInfoAnchorEl(null)} sx={{"&:hover": {
        bgcolor: "rgba(25,118,210,0.2)",
         borderLeft: "4px solid transparent",
        borderLeftColor: "primary.light",
      }}}>Bank/PF/ESI</MenuItem>
      <MenuItem onClick={() => setInfoAnchorEl(null)} sx={{"&:hover": {
        bgcolor: "rgba(25,118,210,0.2)",
         borderLeft: "4px solid transparent",
        borderLeftColor: "primary.light",
      }}}>Family Details</MenuItem>
      <MenuItem onClick={() => setInfoAnchorEl(null)} sx={{"&:hover": {
        bgcolor: "rgba(25,118,210,0.2)",
         borderLeft: "4px solid transparent",
        borderLeftColor: "primary.light",
      }}}>Position History</MenuItem>
      <MenuItem onClick={() => setInfoAnchorEl(null)} sx={{"&:hover": {
        bgcolor: "rgba(25,118,210,0.2)",
         borderLeft: "4px solid transparent",
        borderLeftColor: "primary.light",
      }}}>Previous Employment</MenuItem>
      <MenuItem onClick={() => setInfoAnchorEl(null)} sx={{"&:hover": {
        bgcolor: "rgba(25,118,210,0.2)",
         borderLeft: "4px solid transparent",
        borderLeftColor: "primary.light",
      }}}>Separation</MenuItem>
      <MenuItem onClick={() => setInfoAnchorEl(null)} sx={{"&:hover": {
        bgcolor: "rgba(25,118,210,0.2)",
         borderLeft: "4px solid transparent",
        borderLeftColor: "primary.light",
      }}}>Access Card Deatils</MenuItem>
      <MenuItem onClick={() => setInfoAnchorEl(null)} sx={{"&:hover": {
        bgcolor: "rgba(25,118,210,0.2)",
         borderLeft: "4px solid transparent",
        borderLeftColor: "primary.light",
      }}}>Employmee Documents</MenuItem>
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
        color: activeTab === 'Admin' ? 'white' : 'white'
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
    PaperProps={{
      sx: {
      backgroundColor: 'rgba(0,0,0,0.7)', // dropdown background black
      color: 'white',          // menu item text white
    }
  }}
  >
    <MenuItem onClick={() => setAdminAnchorEl(null)} sx={{"&:hover": {
        bgcolor: "rgba(25,118,210,0.2)",
         borderLeft: "4px solid transparent",
        borderLeftColor: "primary.light",}}}>General Letter </MenuItem>
    <MenuItem onClick={() => setAdminAnchorEl(null)} sx={{"&:hover": {
        bgcolor: "rgba(25,118,210,0.2)",
         borderLeft: "4px solid transparent",
        borderLeftColor: "primary.light",}}}>Excel Import</MenuItem>
    <MenuItem onClick={() => setAdminAnchorEl(null)} sx={{"&:hover": {
        bgcolor: "rgba(25,118,210,0.2)",
         borderLeft: "4px solid transparent",
        borderLeftColor: "primary.light",}}}>Bulletin Board</MenuItem>
    <MenuItem onClick={() => setAdminAnchorEl(null)}sx={{"&:hover": {
        bgcolor: "rgba(25,118,210,0.2)",
         borderLeft: "4px solid transparent",
        borderLeftColor: "primary.light",}}}>Mass Communication</MenuItem>
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
        color: activeTab === 'Setup' ? 'white' : 'white'
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
    PaperProps={{
      sx: {
      backgroundColor: 'rgba(0,0,0,0.7)', // dropdown background black
      color: 'white',          // menu item text white
    }
  }}
  >
    <MenuItem onClick={() => setSetupAnchorEl(null)} sx={{"&:hover": {
        bgcolor: "rgba(25,118,210,0.2)",
         borderLeft: "4px solid transparent",
        borderLeftColor: "primary.light",}}}>Company Ploicies & Forms</MenuItem>
  </Menu>
</Box>
</Box>
</Box>


            <Box>
              <Tooltip title="Search"><IconButton sx={{ color: 'white' }} onClick={() => setSearchModalOpen(true)}><SearchIcon /></IconButton></Tooltip>
              <Tooltip title="Settings"><IconButton sx={{ color: 'white' }} onClick={handleSettingsMenuClick}><SettingsIcon /></IconButton></Tooltip>
              <Menu
  anchorEl={settingsAnchorEl}
  open={openSettingsMenu}
  onClose={handleSettingsMenuClose}
  PaperProps={{
    sx: { minWidth: 220, p: 1, backgroundColor: 'rgba(0,0,0,0.7)', color: 'white'  }
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
              <Link underline="hover" component={RouterLink} color="rgba(255,255,255,0.4)" to="/welcome">Home</Link>
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
