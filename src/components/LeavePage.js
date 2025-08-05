import React, { useState} from 'react';
import {
  Button, Card, CardContent, MenuItem, Select, Typography, Box, Grid, TextField
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import './../style/Leave.css';
import dayjs from 'dayjs';
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import IconButton from '@mui/material/IconButton';
import { Snackbar, Alert } from '@mui/material';


const LeavePage = () => {
  const navigate = useNavigate();
  const [leaveType, setLeaveType] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [applyTo, setApplyTo] = useState('');
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [showHistory, setShowHistory] = useState(false);
  // const [selectedRows, setSelectedRows] = useState([]);
   const userGender='Male';
 //const [userGender, setUserGender] = useState("");
  //const user = useSelector(state => state.auth.user);
//const userGender = user?.gender; // e.g. "male" or "female"

const [toastState, setToastState] = useState({ show: false, message: "", type: "" });

const triggerToast = (message, type) => {
  setToastState({ show: true, message, type });
  setTimeout(() => {
    setToastState({ show: false, message: "", type: "" });
  }, 1500);
};


  const [history, setHistory] = useState(() => {
    const stored = localStorage.getItem("leaveHistory");
    return stored ? JSON.parse(stored) : [];
  });

  const leaveBalances = [
    { type: 'Annual', value: 0.75 },
    { type: 'RH', value: 4 },
    { type: 'LOP', value: 0 },
    { type: 'PL', value: 5 },
    { type: 'ML', value: 7 },
    { type: 'SL', value: 6 }
  ];

  const handleClear = () => {
    setLeaveType('');
    setStartDate(null);
    setEndDate(null);
    setApplyTo('');
  };

  const handleApply = () => {
    if (!startDate || !endDate || !leaveType || !applyTo) {
      triggerToast("Please fill all fields.", "error");
      return;
    }

    if (leaveType === "Maternity Leave" && userGender !== "female") {
    triggerToast("Maternity Leave can only be applied by female employees.", "error");
    return;
  }

  if (dayjs(endDate).isBefore(dayjs(startDate).startOf('day'))) {
  triggerToast("End date cannot be before start date.", "error");
  return;
}

   const newEntry = {
    id: Date.now(), // unique ID
    empId: "10022",
    name: "Palak", // 👈 Add employee name
    leaveType,
    startDate: dayjs(startDate).format('DD-MM-YYYY'),
    endDate: dayjs(endDate).format('DD-MM-YYYY'),
    days: dayjs(endDate).diff(dayjs(startDate), 'day') + 1,
    appliedOn: dayjs().format('DD-MM-YYYY'),
    reason: "",
    balance: 15,
    status: "Withdraw Pending"
  };

    const updatedHistory = [...history, newEntry];
    setHistory(updatedHistory);
    localStorage.setItem("leaveHistory", JSON.stringify(updatedHistory));

    const approvals = JSON.parse(localStorage.getItem("leaveApprovals") || "[]");
    approvals.push(newEntry);
    localStorage.setItem("leaveApprovals", JSON.stringify(approvals));

    handleClear();
    triggerToast("Leave applied successfully!", "success");
  };


  return (
    <Box className="leave-container">
      <IconButton
              onClick={() => navigate('/timesheettable')}
              sx={{ position: 'absolute', top: 16, left: 16, color: 'white' }}
            >
              <ArrowBackIosIcon />
            </IconButton>
      <Box className="leave-header">
        <Typography variant="h5" className="leave-title">LEAVE</Typography>

        <Box className="random" >
          <Box className="leave-buttons">
            <Button variant={showHistory ? "outlined" : "contained"} color="primary">APPLY</Button>
            <Button variant={showHistory ? "contained" : "outlined"} className="history-button" onClick={() => navigate('/history')}>HISTORY</Button>
          </Box>

            <Box className="leave-content">
              <Box className="left-panel">
                {leaveBalances.map((leave, index) => (
                  <Button
                    key={index}
                    className="leave-type-btn"
                    variant="contained"
                    sx={{
                      border: '4px solid #6fbcff',
                      color: 'white',
                      borderRadius: '10px',
                      padding: '10px 20px',
                      marginBottom: '10px',
                    }}
                  >
                    {leave.type}
                    <div className="leave-value">{leave.value}</div>
                  </Button>
                ))}
              </Box>

              <Box className="calendar-panel">
                <Typography variant="h6">Select Dates</Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateCalendar
                    value={selectedDate}
                   onChange={(newValue) => {
  setSelectedDate(newValue);
  if (!startDate || (startDate && endDate)) {
    setStartDate(newValue);
    setEndDate(null);
  } else if (!endDate && (newValue.isSame(startDate) || newValue.isAfter(startDate))) {
    // ✅ Allow same day or future date
    setEndDate(newValue);
  } else {
    
  }
}}
                    sx={{
                      '.MuiPickersDay-root': {
                        color: 'white',
                        fontSize: '1rem',
                        width: 40,
                        height: 35,
                      },
                      '.Mui-selected': {
                        backgroundColor: '#1976d2',
                        color: '#fff',
                      },
                      '.MuiPickersDay-today': {
                        border: '1px solid #fff',
                      },
                      '.MuiDayCalendar-weekDayLabel': {
                        color: 'white',
                        fontSize: '1rem',
                        width: 40,
                        height: 40,
                      },
                      '.MuiPickersCalendarHeader-label': {
                        color: 'white',
                        fontSize: '1.2rem',
                      },
                      '.MuiPickersCalendarHeader-switchViewIcon, .MuiSvgIcon-root': {
                        color: 'white',
                      },
                      '.MuiPickersCalendarHeader-labelContainer': {
                        color: 'white',
                      },
                    }}
                  />
                </LocalizationProvider>
              </Box>

              <Card className="form-panel" sx={{ backgroundColor: ' rgba(255, 255, 255, 0.7)' }}>
                <CardContent>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Select
                      value={leaveType}
                      onChange={(e) => setLeaveType(e.target.value)}
                      displayEmpty
                      fullWidth
                      style={{ marginBottom: '16px' }}
                    >
                      <MenuItem value="" disabled>Leave Type</MenuItem>
                      <MenuItem value="Annual Leave">AL</MenuItem>
                      <MenuItem value="Restricted Holiday">RH</MenuItem>
                      <MenuItem value="LOP">LOP</MenuItem>
                      <MenuItem value="Privilege Leave">PL</MenuItem>
                       <MenuItem
   value="Maternity Leave"
   disabled={userGender !== "female"}
 >
   ML
 </MenuItem>
                      <MenuItem value="Sick Leave">SL</MenuItem>
                    </Select>

                    <DatePicker
                      label="Start Date"
                      value={startDate}
                      onChange={(newValue) => setStartDate(newValue)}
                      format="DD-MM-YYYY"
                      enableAccessibleFieldDOMStructure={false}
                      slots={{
                        openPickerIcon: () => null,
                        textField: (params) => (
                          <TextField
                            {...params}
                            fullWidth
                            inputProps={{
                              ...params.inputProps,
                            }}
                          />
                        ),
                      }}
                    />
                    <br /><br />
                    <DatePicker
                      label="End Date"
                      value={endDate}
                      onChange={(newValue) => setEndDate(newValue)}
                      format="DD-MM-YYYY"
                      enableAccessibleFieldDOMStructure={false}
                      slots={{
                        openPickerIcon: () => null,
                        textField: (params) => (
                          <TextField
                            {...params}
                            fullWidth
                            inputProps={{
                              ...params.inputProps,
                         
                            }}
                          />
                        ),
                      }}
                    />
                    <br /><br />
                    <Select
                      value={applyTo}
                      onChange={(e) => setApplyTo(e.target.value)}
                      displayEmpty
                      fullWidth
                    >
                      <MenuItem value="" disabled>Apply To</MenuItem>
                      <MenuItem value="Niranjan Achutharam">Pankaj</MenuItem>
                    </Select>
                    <br /><br />
                    <Grid container spacing={1} sx={{ justifyContent: 'center' }}>
                      <Grid item xs={6}>
                        <Button fullWidth variant="outlined" color="error" onClick={handleClear}>CLEAR</Button>
                      </Grid>
                      <Grid item xs={6}>
                        <Button fullWidth variant="contained" color="primary" onClick={handleApply}>APPLY</Button>
                      </Grid>
                    </Grid>
                  </LocalizationProvider>
                </CardContent>
              </Card>
            </Box>
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
    </Box>
  );
};

export default LeavePage;

