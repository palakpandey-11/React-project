import React, { useState } from 'react';
import {
  Box, Paper, Typography, Tabs, Tab, RadioGroup, FormControlLabel,
  Radio, Select, MenuItem, TextField, Button, Stack
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

export default function Reports() {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState('LEAVE');
  const [employeeType, setEmployeeType] = useState('employee');
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [leaveType, setLeaveType] = useState('');
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const isFormFilled = selectedEmployee && leaveType && fromDate && toDate;

  const handleReset = () => {
    setEmployeeType('employee');
    setSelectedEmployee('');
    setLeaveType('');
    setFromDate(null);
    setToDate(null);
  };

  return (
    

    <Box sx={{
      minHeight: '90vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      px: 2,
      py: 1,
      
    }}>
       

       <Typography variant="h5" className="reports-title" sx={{color:'white'}}>REPORTS</Typography>
    

  <Box className="random" sx={{    
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column', 
    width: '100%',
    height: '600px',
  }} >

  <Box className="reports-buttons" sx={{
   display: 'flex',
   justifycontent: 'center',
   gap: '10px',
   mb:'20px'
  }}>
                      <Button variant= "outlined" color="primary" onClick={() => navigate('/reports')}>LEAVE</Button>
                      <Button variant="contained"  >TIMESHEET</Button>
                    </Box>
       

    
    </Box>
    </Box>

  );
}
