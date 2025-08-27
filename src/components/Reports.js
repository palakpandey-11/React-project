import React, { useState } from 'react';
import {
  Box, Paper, Typography, RadioGroup, FormControlLabel,
  Radio, Select, MenuItem, TextField, Button, Stack, Snackbar, Alert
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import IconButton from '@mui/material/IconButton';

export default function Reports() {
  const navigate = useNavigate();
  const [employeeType, setEmployeeType] = useState('employee');
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [leaveType, setLeaveType] = useState('');
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [toastState, setToastState] = useState({ show: false, message: "", type: "" });


  // Nayi logic: SUBMIT button tabhi enable hoga jab employee, leave type, ya dates mein se koi ek select kiya gaya ho.
  const isFormFilled = 
    (employeeType === 'all' || selectedEmployee) || 
    leaveType || 
    (fromDate && toDate);
  
  const handleReset = () => {
    setEmployeeType('employee');
    setSelectedEmployee('');
    setLeaveType('');
    setFromDate(null);
    setToDate(null);
  };

  const triggerToast = (message, type) => {
    setToastState({ show: true, message, type });
    setTimeout(() => {
      setToastState({ show: false, message: "", type: "" });
    }, 2500);
  };
  

  const handleReportGeneration = () => {
    // 1. Get the raw data from History (leaveHistory)
    const historyData = JSON.parse(localStorage.getItem("leaveHistory") || "[]");

    // 2. Determine the filter values
    const selectedId = employeeType === 'all' ? 'ALL' : (selectedEmployee.includes(' - ') ? selectedEmployee.split(' - ')[1] : '');
    const selectedType = leaveType;
    const fromDt = fromDate ? dayjs(fromDate).startOf('day') : null;
    const toDt = toDate ? dayjs(toDate).endOf('day') : null;

    // 3. Apply Filtering logic based on selected filters
    const filteredReports = historyData.filter(item => {
      // Convert item dates to Dayjs objects for comparison
      const itemDate = dayjs(item.startDate, 'DD-MM-YYYY');

      // Employee Filter: Check if the item matches the selected employee ID
      // Agar 'ALL' select kiya hai ya koi employee select nahi kiya, to yeh condition true hogi.
      const empMatch = selectedId === 'ALL' || !selectedId || item.empId === selectedId;

      // Leave Type Filter: Check if the item matches the selected leave type
      // Agar 'All Types' select kiya hai ya koi leave type select nahi kiya, to yeh condition true hogi.
      const typeMatch = !selectedType || selectedType === 'All Types' || item.leaveType === selectedType;

      // Date Range Filter: Check if the item's date is within the selected range
      // Agar fromDate aur toDate dono null hain, to yeh condition true hogi.
      const dateMatch = 
        (!fromDt || itemDate.isSame(fromDt, 'day') || itemDate.isAfter(fromDt)) && 
        (!toDt || itemDate.isSame(toDt, 'day') || itemDate.isBefore(toDt));

      // Item passes the filter if all selected filters match.
      return empMatch && typeMatch && dateMatch;
    });

    // 4. Transform the data for Timesheet page format
    const formattedReports = filteredReports.map(item => ({
        // Yahaan maine 'name' ko item.name se liya hai, taaki har employee ka naam dikhe.
        // Ye tab bhi kaam karega jab 'All Employees' select ho.
        name: item.name, 
        id: item.empId,
        date: item.startDate, 
        coding: 0,
        testing: 0,
        devops: 0,
        db: 0,
        meeting: 0,
        misc: 0,
        total: 0,
        status: item.leaveType,
        workStatus: item.status === 'Approved' ? 'On Leave (Approved)' : item.status
    }));

    // 5. Save filtered data to localStorage
    localStorage.setItem('filteredLeaveReports', JSON.stringify(formattedReports));
    
    // 6. Navigate and show toast
    if (formattedReports.length > 0) {
        triggerToast(`Found ${formattedReports.length} records.`, "success");
        navigate('/timesheet');
    } else {
        triggerToast("No leave records found for the selected criteria.", "warning");
    }
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
      <IconButton
        onClick={() => navigate('/dashboard')}
        sx={{ position: 'absolute', top: 16, left: 16, color: 'white' }}
      >
        <ArrowBackIosIcon />
      </IconButton>

      <Typography variant="h5" className="reports-title" sx={{ color: 'white' }}>REPORTS</Typography>

      <Box className="random" sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        width: '80%',
        height: '550px',
      }} >

        <Box className="reports-buttons" sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          mb: '20px'
        }}>
          <Button variant="contained" color="primary">LEAVE</Button>
          <Button variant="outlined" onClick={() => navigate('/timesheet')} >TIMESHEET</Button>
        </Box>


        <Paper elevation={6} sx={{
          width: '100%',
          maxWidth: 800,
          p: 4,
          mb: '50px',
          border: '3px solid rgba(255,255,255,0.7)',
          backgroundColor: 'rgba(255,255,255,0.6)'
        }}>

          <Typography variant="h6" sx={{ mb: 1, mt: 0, textAlign: 'center' }}>
            Employee Leave Transaction
          </Typography>

          <RadioGroup
            row
            value={employeeType}
            onChange={(e) => {
              const value = e.target.value;
              setEmployeeType(value);
              if (value === 'all') {
                setSelectedEmployee('ALL');
              } else {
                setSelectedEmployee('');
              }
            }}
            sx={{ mb: 2 }}
          >
            <FormControlLabel value="all" control={<Radio />} label="All Employees" />
            <FormControlLabel value="employee" control={<Radio />} label="Employee" />
          </RadioGroup>

          <TextField
            select
            fullWidth
            label="Employee"
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
            sx={{ mb: 2 }}
            disabled={employeeType === 'all'}
          >
            {employeeType === 'employee' && (
              <MenuItem value="">Select Employee</MenuItem>
            )}
            {employeeType === 'all' && (
              <MenuItem value="ALL">All Employees</MenuItem>
            )}
            <MenuItem value="Pranali - 10023">Pranali - 10023</MenuItem>
            <MenuItem value="Palak - 10022">Palak - 10022</MenuItem>
            <MenuItem value="Om - 100214">Om - 100235</MenuItem>
          </TextField>


          <TextField
            select
            fullWidth
            label="Leave Type"
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
            sx={{ mb: 2 }}
          >
            <MenuItem value="">All Types</MenuItem>
            <MenuItem value="Annual Leave">Annual Leave</MenuItem>
            <MenuItem value="Sick Leave">Sick Leave</MenuItem>
            <MenuItem value="Restricted Holiday">RH</MenuItem>
            <MenuItem value="LOP">LOP</MenuItem>
            <MenuItem value="Privilege Leave">PL</MenuItem>
            <MenuItem value="Maternity Leave">ML</MenuItem>
          </TextField>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
              <DatePicker
                label="From Date"
                value={fromDate}
                onChange={(newValue) => setFromDate(newValue)}
                slotProps={{ textField: { fullWidth: true } }}
              />
              <DatePicker
                label="To Date"
                value={toDate}
                onChange={(newValue) => setToDate(newValue)}
                minDate={fromDate || dayjs('1900-01-01')}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </Stack>
          </LocalizationProvider>

          <Stack direction="row" spacing={2} justifyContent="center" mt={2}>
            <Button
              variant="contained"
              disabled={!isFormFilled}
              sx={{ minWidth: 100 }}
              onClick={handleReportGeneration}
            >
              SUBMIT
            </Button>

            <Button
              variant="outlined"
              color="error"
              onClick={handleReset}
              sx={{ minWidth: 100 }}
            >
              RESET
            </Button>
          </Stack>
        </Paper>
      </Box>
      <Snackbar
        open={toastState.show}
        autoHideDuration={3000}
        onClose={() => setToastState({ show: false, message: "", type: "" })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setToastState({ show: false, message: "", type: "" })}
          severity={toastState.type}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {toastState.message}
        </Alert>
      </Snackbar>
    </Box>

  );
}