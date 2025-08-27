import React, { useState, useEffect} from 'react';
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
import { ListSubheader } from "@mui/material";


const LeavePage = () => {
  const navigate = useNavigate();
  const [leaveType, setLeaveType] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [applyTo, setApplyTo] = useState('');
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [showHistory, setShowHistory] = useState(false);
  // const [selectedRows, setSelectedRows] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const directory  = JSON.parse(localStorage.getItem("directory") || "[]");
  const userGender = user?.gender?.toLowerCase();  // "male" or "female"
  //const [userGender, setUserGender] = useState("");
  //const user = useSelector(state => state.auth.user);
//const userGender = user?.gender; // e.g. "male" or "female"
// Find assigned manager from directory
const myManager = user?.managerId ? directory.find(u => u.empId === user.managerId):null;
const isHr = user?.role === "hr";
const isManager = user?.role === "manager";
const assignedManagerName =  (isHr && "HR") ||
  (isManager && (directory.find(u => u.role === "hr")?.name || "HR")) ||
    (myManager?.name || "");
const extraPeople = ["Aditya", "Saurabh", "Pankaj","Shivam"];

const [toastState, setToastState] = useState({ show: false, message: "", type: "" });

const triggerToast = (message, type) => {
  setToastState({ show: true, message, type });
  setTimeout(() => {
    setToastState({ show: false, message: "", type: "" });
  }, 2500);
};


  const [history, setHistory] = useState(() => {
    const stored = localStorage.getItem("leaveHistory");
    return stored ? JSON.parse(stored) : [];
  });
useEffect(() => {
  if (assignedManagerName) setApplyTo(assignedManagerName);
}, [assignedManagerName]);

  const [leaveBalances, setLeaveBalances] = useState([
    { code:'Annual Leave',type: 'Annual', value: 0.75 },
    { code:'Restricted Holiday',type: 'RH', value: 8 },
    { code:'LOP',type: 'LOP', value: 5 },
    { code:'Privilege Leave',type: 'PL', value: 5 },
    { code:'Maternity Leave',type: 'ML', value: 7 },
    { code:'Sick Leave',type: 'SL', value: 10 }
  ]);

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
    //enforce correct manager
    if (applyTo !== assignedManagerName) {
        triggerToast("Please select your assigned manager.", "error");
        return;
    }

    if (leaveType === "Maternity Leave" && userGender !== "female") {
    triggerToast("Maternity Leave can only be applied by female employees.", "error");
    return;
  }
    const isDateOverlap = history.some((entry) => {
    const existingStart = dayjs(entry.startDate, 'DD-MM-YYYY');
    const existingEnd = dayjs(entry.endDate, 'DD-MM-YYYY');
    return (
      dayjs(startDate).isBetween(existingStart, existingEnd, null, '[]') ||
      dayjs(endDate).isBetween(existingStart, existingEnd, null, '[]') ||
      existingStart.isBetween(dayjs(startDate), dayjs(endDate), null, '[]') ||
      existingEnd.isBetween(dayjs(startDate), dayjs(endDate), null, '[]')
    );
  });

  if (isDateOverlap) {
    triggerToast("Leave already applied for selected date(s).", "error");
    return;
  }

    const days = dayjs(endDate).diff(dayjs(startDate), 'day') + 1;

//Find both the picked bucket and the LOP bucket
  const pick = leaveBalances.find(lb => lb.code === leaveType);
  const lop  = leaveBalances.find(lb => lb.type === 'LOP');
if (!pick || !lop) return; 
  // How many days left after emptying the primary bucket?
const overflow = Math.max(days - pick.value, 0);

  setLeaveBalances(bs => bs.map(lb => {
    if (lb.code === leaveType) {
      // if it under-flowed, zero it out; otherwise subtract days normally
      return { ...lb, value: Math.max(lb.value - days, 0) };
    }
    if (lb.type === 'LOP' && overflow> 0) {
      // subtract any overflow from LOP
      return { ...lb, value: lb.value - overflow };
    }
    return lb;
  }));


// now create your history entry with the updated balance
  const newEntry = {
    id: Date.now(),
   // empId: user?.empId || "10022",
    empId:user?.empId  || "",
    name: user?.name  || "",
    leaveType,
    startDate: dayjs(startDate).format('DD-MM-YYYY'),
    endDate:   dayjs(endDate).format('DD-MM-YYYY'),
    days,
    appliedOn: dayjs().format('DD-MM-YYYY'),
    reason:    "",
    balance:   Math.max(pick.value - days, 0),
    status:    "Withdraw Pending",
    approverName: assignedManagerName,
    approverId:   myManager?.empId || null
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
                    minDate={dayjs()} // ✅ This line restricts past dates
                   onChange={(newValue) => {
                      setSelectedDate(newValue);
                      if (!startDate || (startDate && endDate)) {
                        setStartDate(newValue);
                        setEndDate(null);
                      } else if (!endDate && (newValue.isSame(startDate) || newValue.isAfter(startDate))) {
                        setEndDate(newValue);
                      } else {
                        // Do nothing if a past date is selected after the start date
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
                      '.MuiPickersDay-root.Mui-disabled': { // ✅ This is the new style
                        color: 'rgba(250, 250, 250, 0.8)',
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
                      {userGender !== "female" && (
                      <MenuItem value="Privilege Leave" >PL</MenuItem>
                      )}
                      {userGender === "female" && (
                      <MenuItem value="Maternity Leave" >ML</MenuItem>
                      )}
                      <MenuItem value="Sick Leave">SL</MenuItem>
                    </Select>

                    <DatePicker
                      label="Start Date"
                      value={startDate}
                      onChange={(newValue) => setStartDate(newValue)}
                      format="DD-MM-YYYY"
                      minDate={dayjs()} // ✅ This line restricts past dates
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
                      minDate={startDate || dayjs()} // ✅ This line restricts past dates relative to start date
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
                      {assignedManagerName && ( 
                        <MenuItem value={assignedManagerName}>{assignedManagerName}</MenuItem>
                      )}
                      
                      {/* <ListSubheader>Others</ListSubheader> */}
                      {extraPeople
                        .filter(name => name && name !== assignedManagerName) // avoid duplicate
                        .map(name => (
                          <MenuItem key={name} value={name}>{name}</MenuItem>
                        ))}
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