import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
//import './App.css';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  CircularProgress,
  Backdrop,
  Checkbox,
  Button,
  Container,
  Box,
  createTheme,
  ThemeProvider,
  styled,
  IconButton,
  Alert,
  Snackbar,
  Modal,
  TextField,
  Stack,
  Paper,
  Grid,
  TableContainer
} from "@mui/material";
 //import Grid from '@mui/material/Unstable_Grid2';
import MuiAlert from "@mui/material/Alert";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import "../App.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Taskname from "./Taskname";

const TableHeaderCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: "#1e88e5",
  color: theme.palette.common.white,
  padding: "2px !important",
  textAlign: "center",
}));

const CustomTableCell = styled(TableCell)({
  padding: "2px !important",
  textAlign: "center",
});

const TableCheckbox = styled(Checkbox)({
  color: "#3f51b5",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "& .MuiSvgIcon-root": {
    fontSize: "1.4rem",
  },
});

const AppbarCheckbox = styled(Checkbox)({
  color: "white",
});

const CloseIconButton = styled(IconButton)({
  position: "absolute",
  top: "50%",
  right: "4px",
  transform: "translateY(-50%)",
});

export default function LeaveReconcilation({ empID, projectId }) {
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [codingValues, setCodingValues] = React.useState(0);
  const [testingValues, setTestingValues] = React.useState(0);
  const [devopsValues, setDevopsValues] = React.useState(0);
  const [meetingValues, setMeetingValues] = React.useState(0);
  const [dataValues, setDataValues] = React.useState(0);
  const [taValues, setTaValues] = React.useState(0);
  const [tdValues, setTdValues] = React.useState(0);
  const [eeValues, setEeValues] = React.useState(0);
  const [pmValues, setPmValues] = React.useState(0);
  const [cbValues, setCbValues] = React.useState(0);
  const [acValues, setAcValues] = React.useState(0);
  const [misValues, setMisValues] = React.useState(0);
  const [totalValues, setTotalValues] = React.useState(0);
  const [total, setTotal] = React.useState(0);
  const [add, setAdd] = React.useState(0);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [result1, setResult1] = useState();
  const [reconciliationDate, setReconciliationDate] = useState(null);
  const [results, setResults] = useState(null);
  const [taskId, setTaskId] = useState(null);
  const [successSnackbarOpen, setSuccessSnackbarOpen] = React.useState(false);
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };
  
  //dummy rows
  const [leaveDays, setLeaveDays] = useState([
    { reconciliation_date: "01-07-25", status: "Open", reason: "" },
    {
      reconciliation_date: "28-06-25",
      status: "Resolved",
      reason: "Missed Timesheet",
    },
  ]);
  

  const [oldReasons, setOldReasons] = useState([]);
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noRowSelectedSnackbarOpen, setNoRowSelectedSnackbarOpen] =
    useState(false);

useEffect(() => {
  setLoading(false); // simulate fetch complete

  const mockLeaveDays = [
    { reconciliation_date: "01-07-25", status: "Open", reason: "" },
    { reconciliation_date: "28-06-25", status: "Resolved", reason: "Missed Timesheet" },
    
  ];

  const mockResults = [
    { effortDate: "01-07-25", taskId: 1, effort: 2 },
    { effortDate: "01-07-25", taskId: 2, effort: 3 },
    { effortDate: "01-07-25", taskId: 3, effort: 1 },
  ];

  setLeaveDays(mockLeaveDays);
  setOldReasons(mockLeaveDays.map((ld) => ld.reason));
  setReasons(mockLeaveDays.map((ld) =>
    ld.status === "Rejected" || ld.status === "Pending" ? ld.reason : ""
  ));
  setResults(mockResults);
}, []);


  const [reasons, setReasons] = useState(leaveDays.map(() => ""));
  const [enabledRows, setEnabledRows] = useState([]);
  const [appbarChecked, setAppbarChecked] = useState(false);
  const [resetButtonsVisible, setResetButtonsVisible] = useState(
    leaveDays.map(() => false)
  );
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setReasons(leaveDays.map(() => ""));
    setEnabledRows([]);
    setAppbarChecked(false);
    setResetButtonsVisible(leaveDays.map(() => false));
    setCodingValues(0);
    setTestingValues(0);
    setMeetingValues(0);
    setDataValues(0);
    setTaValues(0);
    setTdValues(0);
    setEeValues(0);
    setPmValues(0);
    setCbValues(0);
    setAcValues(0);
    setMisValues(0);
    setDevopsValues(0);
    setTotalValues(0);
    setOpen(false);
  };

  const [emptyReasonSnackbarOpen, setEmptyReasonSnackbarOpen] = useState(false);

  const handleResetButtonClick = (index) => () => {
    const updatedReasons = [...reasons];
    updatedReasons[index] = "";
    setReasons(updatedReasons);
    setResetButtonsVisible((prevResetButtonsVisible) => {
      const updatedButtonsVisible = [...prevResetButtonsVisible];
      updatedButtonsVisible[index] = false;
      return updatedButtonsVisible;
    });
  };

  const handleAppbarCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    setAppbarChecked(isChecked);
    if (isChecked) {
      setEnabledRows(Array.from(Array(leaveDays.length).keys()));
    } else {
      setEnabledRows([]);
    }
  };

  const handleCheckboxChange = (index) => (event) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      setEnabledRows([index]);
      const selectedReconciliationDate = leaveDays[index].reconciliation_date;
      setReconciliationDate(selectedReconciliationDate);
    } else {
      setEnabledRows([]);
      setReconciliationDate(null);
    }
  };

  const handleReasonChange = (index) => (event) => {
    const updatedReasons = [...reasons];
    updatedReasons[index] = event.target.value;
    setReasons(updatedReasons);
    const updatedLeaveDays = [...leaveDays];
    updatedLeaveDays[index].reason = event.target.value;
    setLeaveDays(updatedLeaveDays);
    setResetButtonsVisible((prevResetButtonsVisible) => {
      const updatedButtonsVisible = [...prevResetButtonsVisible];
      updatedButtonsVisible[index] = true;
      return updatedButtonsVisible;
    });
  };

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: '90%',
  maxWidth: 550,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};


  if (!empID) {
  console.error("empID is missing. Cannot proceed.");
  return (
    <Box p={4}>
      <Typography variant="h6" color="error">
        Error: Employee ID is missing.
      </Typography>
    </Box>
  );
}


  const handleSubmit = async () => {
     if (!empID) {
    console.error('Missing empID');
    return;
  }

  // 2) ensure the user actually clicked a row checkbox
  if (!reconciliationDate) {
    setNoRowSelectedSnackbarOpen(true);
    console.error('Please select a reconciliation row before submitting');
    return;
  }
  
    if (enabledRows.length === 0) {
      setNoRowSelectedSnackbarOpen(true);
      return;
    }

    setLoading(true);

    const hasEmptyReason = leaveDays.some(
      (leaveDay, index) => enabledRows.includes(index) && !leaveDay.reason
    );

    if (hasEmptyReason) {
      setEmptyReasonSnackbarOpen(true);
      setLoading(false);
      return;
    }

    // try {
    //   const formattedDate = formatDate(reconciliationDate);
    //   const url = `/ahWorkwave/totalEffort/employee/${empID}/effortDate/${formattedDate}`;
    //   const response = await axios.get(url, {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });

    //   if (response.status === 200) {
    //     const final = response.data;
    //     setTotal(final);
    //     console.log("Total Effort is:", total);
    //   }
    // } catch (error) {
    //   console.error("Error fetching total effort:", error);
    // }

    handleOpen(true);
    setLoading(false);
  };

  const handleClearModal = () => {
    const formattedReconciliationDate = formatDate(reconciliationDate);
    setCodingValues(handleEffortValue(formattedReconciliationDate, 1) || "0");
    console.log("Coding values" + " " + codingValues);
    setTestingValues(handleEffortValue(formattedReconciliationDate, 2) || "0");
    console.log("Testing values" + " " + testingValues);
    setDevopsValues(handleEffortValue(formattedReconciliationDate, 3) || "0");
    console.log("Devops values" + " " + devopsValues);
    setMeetingValues(handleEffortValue(formattedReconciliationDate, 4) || "0");
    console.log("Meeting values" + " " + meetingValues);
    setDataValues(handleEffortValue(formattedReconciliationDate, 5) || "0");
    console.log("Data values" + " " + dataValues);
    setMisValues(handleEffortValue(formattedReconciliationDate, 7) || "0");
    console.log("Mis values" + " " + misValues);
    setTotalValues(handleEffortValue(formattedReconciliationDate, 8) || "0");
    console.log("Total values" + " " + totalValues);
  };

  const handleEffortValue = (formattedDate, taskId) => {
    const effort = handleEffort(formattedDate, taskId);
    return effort !== null && effort !== undefined ? effort : "0";
  };

  const getEffortValue = (formattedDate, taskId) => {
    if (!results) {
      return null;
    }
    const matchingEntry = results.find(
      (entry) => entry.effortDate === formattedDate && entry.taskId === taskId
    );
    return matchingEntry ? matchingEntry.effort : null;
  };

  const handleBlurEvent = (taskId, effortDate, typedValue) => {
    const convertedEffortDate = convertDateFormat(effortDate);
    const newData = {
      taskId: taskId,
      effortDate: convertedEffortDate,
      effort: typedValue,
      employeeId: empID,
      project_id: projectId,
      effort_task_description: getTaskDescription(taskId),
    };
    setFormData((prevData) => [...prevData, newData]);
  };

  const convertDateFormat = (oldFormat) => {
    const [dd, mm, yy] = oldFormat.split("-");
    const convertedDate = `20${yy}-${mm}-${dd}`;
    return convertedDate;
  };

  const getTaskDescription = (taskId) => {
    switch (taskId) {
      case 1:
        return "Coding";
      case 2:
        return "Testing";
      case 3:
        return "DevOps";
      case 4:
        return "Meeting";
      case 5:
        return "Database";
      case 6:
        return "Talent and Acquisition";
      case 7:
        return "Miscellaneous";
      case 8:
        return "Training and Development";
      case 9:
        return "Employee Engagement";
      case 10:
        return "Performance Management";
      case 11:
        return "Compensation and Benefits";
      default:
        return "Audits and Compilance";
    }
  };

const handleSubmitModal = async () => {
  setLoading(true);

const newEntries = enabledRows.map(index => ({
    empID: '10022', // or use a unique taskId if needed
    name: "Palak", // replace with actual name if available
    reason: leaveDays[index].reason,
    date: leaveDays[index].reconciliation_date,
    status: "Pending"
  }));

  // ✅ Save to localStorage
  const existingData = JSON.parse(localStorage.getItem('reconciliationData')) || [];
  const updatedData = [...existingData, ...newEntries];
  localStorage.setItem('reconciliationData', JSON.stringify(updatedData));

  // ✅ You can still log the output if needed
  newEntries.forEach(entry => {
    console.log("Simulated POST: ", entry);
  });

  const dataToSubmit = leaveDays.reduce((result, { reason }, index) => {
    const oldReason = oldReasons[index];
    if (reason !== oldReason) {
      result[index] = reason;
    }
    return result;
  }, {});
  console.log("Simulated PUT: updateReasons", dataToSubmit);

  handleClose();
  setSuccessSnackbarOpen(true);
  setLoading(false);
};


  const handleCancel = () => {
    const updatedReasons = leaveDays.map((day) => {
      if (day.status == "Open") {
        return "";
      } else {
        return day.reason;
      }
    });
    setReasons(updatedReasons);
    setEnabledRows([]);
    setAppbarChecked(false);
    setResetButtonsVisible(leaveDays.map(() => false));
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#1e88e5",
      },
      text: {
        primary: "#333",
      },
    },
  });

  const styles = {
    iconButton: {
      marginRight: "10px",
      fontSize: "0.5rem",
      marginTop: "-3%",
      transition: "box-shadow 0.3s",
    },
    iconButtonHover: {
      boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.2)",
    },
  };

  const MAX_VALUE = 24;

  const handleIntegerChange = (value, setterFunction) => {
    if (value === "" || value === "\b") {
      setterFunction(0);
      return;
    }
    const intValue = parseInt(value, 10);
    if (!isNaN(intValue) && intValue <= MAX_VALUE) {
      const newValue = String(intValue).slice(0, 2);
      setterFunction(newValue);
    } else {
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleCloseIcon = () => {
    setReasons(leaveDays.map(() => ""));
    setEnabledRows([]);
    setAppbarChecked(false);
    setResetButtonsVisible(leaveDays.map(() => false));
    setOpen(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    return `${day}-${month}-${year}`;
  };

  const handleEffort = (date, intValue, index) => {
    if (!results) {
      return 0;
    }
    const matchingEntry = results.find(
      (entry) => entry.effortDate === date && entry.taskId === intValue
    );
    if (matchingEntry) {
      console.log("Effort Date:", date);
      console.log("Task Id:", intValue);
      console.log("Matching Effort:", matchingEntry.effort);
      return matchingEntry.effort;
    }
    return 0;
  };

  const handleSuccessSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccessSnackbarOpen(false);
  };

  const calculateSum = () => {
    let sum = 0;
    let elements = [
      "coding",
      "testing",
      "devops",
      "meeting",
      "data",
      "ta",
      "td",
      "ee",
      "pm",
      "cb",
      "ac",
      "mis",
    ];

    elements.forEach((elementId) => {
      let element = document.getElementById(elementId);
      if (element !== null) sum += Number(element.value) || 0;
    });

    return sum;
  };

  const handleInputChange = () => {
    let sum = calculateSum();
    console.log("Sum is: " + sum);
    setTotal(sum);
  };

  const theme1 = createTheme({
    palette: {
      primary: {
        main: "#585858",
      },
    },
  }); 

  return (
    <ThemeProvider theme={theme}>
      {/* back arrow */}
      <IconButton
        onClick={() => navigate('/timesheettable')}
        sx={{ position: 'absolute', top: 16, left: 16, color: 'white' }}
      >
        <ArrowBackIosIcon />
      </IconButton>

      <Backdrop open={loading} style={{ zIndex: 999 }}></Backdrop>
      <Container maxWidth="md" sx={{ pt: 6 }}>
  {loading && (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <CircularProgress size={24} />
    </Box>
  )}

  <Box
    sx={{
      border: "1px solid rgba(255,255,255,0.2)",
      borderRadius: 2,
      p: 2,
      mb: 2,
      bgcolor: "rgba(0,0,0,0.6)",
      backdropFilter: "blur(6px)",
      color: "white",
    }}
  >
    {/* header bar */}
    <Grid container alignItems="center" spacing={2}>
      <Grid item xs={8}>
        <Typography variant="h6">Leave Reconciliation</Typography>
      </Grid>
      <Grid item xs={4} textAlign="right">
        <IconButton
          component={Link}
          to="/approvals/reconcilation"
          sx={{ color: "white" }}
        >
          <CloseIcon />
        </IconButton>
      </Grid>
    </Grid>

    {/* styled table */}
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        bgcolor: "rgba(0,0,0,0.5)",
        border: "1px solid rgba(255,255,255,0.2)",
        borderRadius: 1,
        maxHeight: "calc(100vh - 225px)",
      }}
    >
      <Table
        stickyHeader
        size="small"
        
        sx={{
          "& .MuiTableCell-stickyHeader": {
      backgroundColor: "rgba(0, 0, 0, 0.8)",  // your translucent blue
      color: "white",                            // keep the labels white
      zIndex: 2, 
      py:1.5,
    },
// zebra stripes & hover for the body
      "& .MuiTableBody-root .MuiTableRow-root:nth-of-type(odd)": {
        bgcolor: "rgba(255,255,255,0.05)",
      },
      "& .MuiTableBody-root .MuiTableRow-root:nth-of-type(even)": {
        bgcolor: "rgba(255,255,255,0.10)",
      },
      "& .MuiTableBody-root .MuiTableRow-root:hover": {
        bgcolor: "rgba(255,255,255,0.15)",
      },
      // lighten the cell text
      "& .MuiTableBody-root .MuiTableCell-root": {
        color: "rgba(255,255,255,0.9)",
        borderBottom: "none",
        py:-1,
        px:2
        
      },
      // narrow checkbox column
      "& .MuiTableCell-paddingCheckbox": {
        width: 48,
      },
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                checked={enabledRows.length === leaveDays.length}
                onChange={handleAppbarCheckboxChange}
                sx={{ color: "white" }}
              />
            </TableCell>
            <TableCell sx={{pl:2}}>Date</TableCell>
            <TableCell  sx={{pl:2}}>Status</TableCell>
            <TableCell sx={{ textAlign: "left" }}>Reason</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {leaveDays.map((leaveDay, index) => (
            <TableRow key={leaveDay.reconciliation_date} hover>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={enabledRows.includes(index) || appbarChecked}
                  onChange={handleCheckboxChange(index)}
                  disabled={leaveDay.status !== "Open"}
                  sx={{ color: "white" }}
                />
              </TableCell>
              <TableCell align="left"  sx={{pl:2}}>
                {leaveDay.reconciliation_date}
              </TableCell>
              <TableCell align="left" sx={{pl:2}}>{leaveDay.status}</TableCell>
              <TableCell>
                <TextField
                  fullWidth
                  size="small"
                  variant="filled"
                  placeholder="Reason"
                  value={reasons[index] || ""}
                  onChange={handleReasonChange(index)}
                  disabled={
                    !enabledRows.includes(index) || leaveDay.status !== "Open"
                  }
                  sx={{
                    bgcolor: "rgba(255,255,255,0.1)",
                    paddingTop:'2px',
                    "& .MuiInputBase-input": { color: "white" },
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    {/* button row with gap */}
    <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 1 }}>
      <Button variant="outlined" color="error" onClick={handleCancel}>
        Clear
      </Button>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </Stack>
  </Box>
</Container>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        BackdropProps={{
    style: {
      backdropFilter: 'blur(4px)',
      
    }
  }}
      >
        <Box
          sx={style}
          style={{
            maxHeight: "calc(100vh - 75px)",
            padding: "8px",
            overflowY: "auto",
                      
            
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
   <TableCell colSpan={3} align="center" sx={{
      py: 0.5,      // reduce vertical padding
      fontSize: "13px",
      fontWeight: 500,
    }}>
     <Typography>Date: {formatDate(reconciliationDate)}</Typography>
   </TableCell>
 </TableRow>
              <TableRow >
                <TableHeaderCell sx={{bgcolor:'black'}}>Category</TableHeaderCell>
                <TableHeaderCell sx={{bgcolor:'black'}}>Effort (in hours)</TableHeaderCell>
                <TableHeaderCell sx={{bgcolor:'black'}}>
                  <CloseIcon onClick={handleCloseIcon} />
                </TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projectId !== Taskname.humanResourceProjectId && (
                <TableRow className="customTableRow">
                  <TableCell
                    style={{
                      backgroundColor: theme.palette.primary.main,
                      fontFamily: "Arial",
                      fontSize: "13px",
                      color: "white",
                      textAlign: "center",
                      paddingTop: "1px",
                      paddingBottom: "1px",
                      backgroundColor: "#676c71"
                    }}
                  >
                    Coding
                  </TableCell>
                  <TableCell
                    style={{
                      backgroundColor: "white",
                      fontFamily: "Arial",
                      textAlign: "center",
                      paddingTop: "1px",
                      paddingBottom: "1px",
                     
                    }}
                  >
                    <TextField
                      type="text"
                      id="coding"
                      inputMode="numeric"
                      defaultValue={
                        handleEffort(formatDate(reconciliationDate), 1) ||
                        codingValues
                      }
                      onChange={(e) => {
                        setCodingValues(e.target.value);
                        handleInputChange();
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Backspace") {
                          handleIntegerChange("", setCodingValues);
                        }
                      }}
                      onBlur={(event) => {
                        setTaskId(1);
                        handleBlurEvent(
                          1,
                          formatDate(reconciliationDate),
                          event.target.value
                        );
                      }}
                      inputProps={{
                        maxLength: 2,
                        pattern: "[0-9]*",
                        style: {
                          textAlign: "center",
                          padding: "10px 0px",
                          fontSize: "13px",
                          height: "16px",
                          backgroundColor:'#e8e9e7'
                        },
                      }}
                      onKeyPress={(event) => {
                        const charCode = event.which
                          ? event.which
                          : event.keyCode;
                        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                          event.preventDefault();
                        }
                      }}
                      className="customTextField"
                    />
                  </TableCell>
                </TableRow>
              )}

              {projectId !== Taskname.humanResourceProjectId && (
                <TableRow className="customTableRow">
                  <TableCell
                    style={{
                      backgroundColor: theme.palette.primary.main,
                      fontFamily: "Arial",
                      fontSize: "13px",
                      color: "white",
                      textAlign: "center",
                      paddingTop: "1px",
                      paddingBottom: "1px",
                      backgroundColor: "#676c71"
                    }}
                  >
                    Testing
                  </TableCell>
                  <TableCell
                    style={{
                      backgroundColor: "white",
                      fontFamily: "Arial",
                      textAlign: "center",
                      paddingTop: "1px",
                      paddingBottom: "1px",
                    }}
                  >
                    <TextField
                      type="text"
                      id="testing"
                      defaultValue={
                        handleEffort(formatDate(reconciliationDate), 2) ||
                        testingValues
                      }
                      onChange={(e) => {
                        setTestingValues(e.target.value);
                        handleInputChange();
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Backspace") {
                          handleIntegerChange("", setTestingValues);
                        }
                      }}
                      onBlur={(event) => {
                        setTaskId(2);
                        handleBlurEvent(
                          2,
                          formatDate(reconciliationDate),
                          event.target.value
                        );
                      }}
                      inputProps={{
                        maxLength: 2,
                        pattern: "[0-9]*",
                        style: {
                          textAlign: "center",
                          padding: "10px 0px",
                          fontSize: "13px",
                          height: "16px",
                          backgroundColor:'#e8e9e7'
                        },
                      }}
                      onKeyPress={(event) => {
                        const charCode = event.which
                          ? event.which
                          : event.keyCode;
                        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                          event.preventDefault();
                        }
                      }}
                      className="customTextField"
                    />
                  </TableCell>
                </TableRow>
              )}

              {projectId !== Taskname.humanResourceProjectId && (
                <TableRow className="customTableRow">
                  <TableCell
                    style={{
                      backgroundColor: theme.palette.primary.main,
                      fontFamily: "Arial",
                      fontSize: "13px",
                      color: "white",
                      textAlign: "center",
                      paddingTop: "1px",
                      paddingBottom: "1px",
                      backgroundColor: "#676c71"
                    }}
                  >
                    DevOps
                  </TableCell>
                  <TableCell
                    style={{
                      backgroundColor: "white",
                      fontFamily: "Arial",
                      textAlign: "center",
                      paddingTop: "1px",
                      paddingBottom: "1px",
                    }}
                  >
                    <TextField
                      type="text"
                      id="devops"
                      defaultValue={
                        handleEffort(formatDate(reconciliationDate), 3) ||
                        devopsValues
                      }
                      onChange={(e) => {
                        setDevopsValues(e.target.value);
                        handleInputChange();
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Backspace") {
                          handleIntegerChange("", setDevopsValues);
                        }
                      }}
                      onBlur={(event) => {
                        setTaskId(3);
                        handleBlurEvent(
                          3,
                          formatDate(reconciliationDate),
                          event.target.value
                        );
                      }}
                      inputProps={{
                        maxLength: 2,
                        pattern: "[0-9]*",
                        style: {
                          textAlign: "center",
                          padding: "10px 0px",
                          fontSize: "13px",
                          height: "16px",
                          backgroundColor:'#e8e9e7'
                        },
                      }}
                      onKeyPress={(event) => {
                        const charCode = event.which
                          ? event.which
                          : event.keyCode;
                        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                          event.preventDefault();
                        }
                      }}
                      className="customTextField"
                    />
                  </TableCell>
                </TableRow>
              )}

              <TableRow className="customTableRow">
                <TableCell
                  style={{
                    backgroundColor: theme.palette.primary.main,
                    fontFamily: "Arial",
                    fontSize: "13px",
                    color: "white",
                    textAlign: "center",
                    paddingTop: "1px",
                    paddingBottom: "1px",
                    backgroundColor: "#676c71"
                  }}
                >
                  Meeting
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "white",
                    fontFamily: "Arial",
                    textAlign: "center",
                    paddingTop: "1px",
                    paddingBottom: "1px",
                  }}
                >
                  <TextField
                    type="text"
                    id="meeting"
                    defaultValue={
                      handleEffort(formatDate(reconciliationDate), 4) ||
                      meetingValues
                    }
                    onChange={(e) => {
                      setMeetingValues(e.target.value);
                      handleInputChange();
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Backspace") {
                        handleIntegerChange("", setMeetingValues);
                      }
                    }}
                    onBlur={(event) => {
                      setTaskId(4);
                      handleBlurEvent(
                        4,
                        formatDate(reconciliationDate),
                        event.target.value
                      );
                    }}
                    inputProps={{
                      maxLength: 2,
                      pattern: "[0-9]*",
                      style: {
                        textAlign: "center",
                        padding: "10px 0px",
                        fontSize: "13px",
                        height: "16px",
                        backgroundColor:'#e8e9e7'
                      },
                    }}
                    onKeyPress={(event) => {
                      const charCode = event.which
                        ? event.which
                        : event.keyCode;
                      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                        event.preventDefault();
                      }
                    }}
                    className="customTextField"
                  />
                </TableCell>
              </TableRow>

              {projectId !== Taskname.humanResourceProjectId && (
                <TableRow className="customTableRow">
                  <TableCell
                    style={{
                      backgroundColor: theme.palette.primary.main,
                      fontFamily: "Arial",
                      fontSize: "13px",
                      color: "white",
                      textAlign: "center",
                      paddingTop: "1px",
                      paddingBottom: "1px",
                      backgroundColor: "#676c71"
                    }}
                  >
                    Database
                  </TableCell>
                  <TableCell
                    style={{
                      backgroundColor: "white",
                      fontFamily: "Arial",
                      textAlign: "center",
                      paddingTop: "1px",
                      paddingBottom: "1px",
                    }}
                  >
                    <TextField
                      type="text"
                      id="data"
                      defaultValue={
                        handleEffort(formatDate(reconciliationDate), 5) ||
                        dataValues
                      }
                      onChange={(e) => {
                        setDataValues(e.target.value);
                        handleInputChange();
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Backspace") {
                          handleIntegerChange("", setDataValues);
                        }
                      }}
                      onBlur={(event) => {
                        setTaskId(5);
                        handleBlurEvent(
                          5,
                          formatDate(reconciliationDate),
                          event.target.value
                        );
                      }}
                      inputProps={{
                        maxLength: 2,
                        pattern: "[0-9]*",
                        style: {
                          textAlign: "center",
                          padding: "10px 0px",
                          fontSize: "13px",
                          height: "16px",
                          backgroundColor:'#e8e9e7'
                        },
                      }}
                      onKeyPress={(event) => {
                        const charCode = event.which
                          ? event.which
                          : event.keyCode;
                        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                          event.preventDefault();
                        }
                      }}
                      className="customTextField"
                    />
                  </TableCell>
                </TableRow>
              )}

              {projectId !== Taskname.ahWorkwaveProjectId &&
                projectId !== Taskname.aomaDeliveryProjectId &&
                projectId !== Taskname.aomaPromoProjectId &&
                projectId !== Taskname.grpsProjectId &&
                projectId !== Taskname.starProjectId &&
                projectId !== Taskname.samisProjectId &&
                projectId !== Taskname.eomProjectId &&
                projectId !== Taskname.devopsProjectId &&
                projectId !== Taskname.scubaProjectId &&
                projectId !== Taskname.carmaProjectId &&
                projectId !== Taskname.radarProjectId && (
                  <TableRow className="customTableRow">
                    <TableCell
                      style={{
                        backgroundColor: theme.palette.primary.main,
                        fontFamily: "Arial",
                        fontSize: "13px",
                        color: "white",
                        textAlign: "center",
                        paddingTop: "1px",
                        paddingBottom: "1px",
                        backgroundColor: "#676c71"
                      }}
                    >
                      Talent Acquisition
                    </TableCell>
                    <TableCell
                      style={{
                        backgroundColor: "white",
                        fontFamily: "Arial",
                        textAlign: "center",
                        paddingTop: "1px",
                        paddingBottom: "1px",
                      }}
                    >
                      <TextField
                        type="text"
                        id="ta"
                        defaultValue={
                          handleEffort(formatDate(reconciliationDate), 6) ||
                          taValues
                        }
                        onChange={(e) => {
                          setTaValues(e.target.value);
                          handleInputChange();
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Backspace") {
                            handleIntegerChange("", setTaValues);
                          }
                        }}
                        onBlur={(event) => {
                          setTaskId(6);
                          handleBlurEvent(
                            6,
                            formatDate(reconciliationDate),
                            event.target.value
                          );
                        }}
                        inputProps={{
                          maxLength: 2,
                          pattern: "[0-9]*",
                          style: {
                            textAlign: "center",
                            padding: "10px 0px",
                            fontSize: "13px",
                            height: "16px",
                            backgroundColor: '#e8e9e7'

                          },
                        }}
                        onKeyPress={(event) => {
                          const charCode = event.which
                            ? event.which
                            : event.keyCode;
                          if (
                            charCode > 31 &&
                            (charCode < 48 || charCode > 57)
                          ) {
                            event.preventDefault();
                          }
                        }}
                        className="customTextField"
                      />
                    </TableCell>
                  </TableRow>
                )}

              {projectId !== Taskname.ahWorkwaveProjectId &&
                projectId !== Taskname.aomaDeliveryProjectId &&
                projectId !== Taskname.aomaPromoProjectId &&
                projectId !== Taskname.grpsProjectId &&
                projectId !== Taskname.starProjectId &&
                projectId !== Taskname.samisProjectId &&
                projectId !== Taskname.eomProjectId &&
                projectId !== Taskname.devopsProjectId &&
                projectId !== Taskname.scubaProjectId &&
                projectId !== Taskname.carmaProjectId &&
                projectId !== Taskname.radarProjectId && (
                  <TableRow className="customTableRow">
                    <TableCell
                      style={{
                        backgroundColor: theme.palette.primary.main,
                        fontFamily: "Arial",
                        fontSize: "13px",
                        color: "white",
                        textAlign: "center",
                        paddingTop: "1px",
                        paddingBottom: "1px",
                        backgroundColor: "#676c71"
                      }}
                    >
                      Training and Development
                    </TableCell>
                    <TableCell
                      style={{
                        backgroundColor: "white",
                        fontFamily: "Arial",
                        textAlign: "center",
                        paddingTop: "1px",
                        paddingBottom: "1px",
                      }}
                    >
                      <TextField
                        type="text"
                        id="td"
                        defaultValue={
                          handleEffort(formatDate(reconciliationDate), 8) ||
                          tdValues
                        }
                        onChange={(e) => {
                          setTdValues(e.target.value);
                          handleInputChange();
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Backspace") {
                            handleIntegerChange("", setTdValues);
                          }
                        }}
                        onBlur={(event) => {
                          setTaskId(8);
                          handleBlurEvent(
                            8,
                            formatDate(reconciliationDate),
                            event.target.value
                          );
                        }}
                        inputProps={{
                          maxLength: 2,
                          pattern: "[0-9]*",
                          style: {
                            textAlign: "center",
                            padding: "10px 0px",
                            fontSize: "13px",
                            height: "16px",
                            backgroundColor:'#e8e9e7'
                          },
                        }}
                        onKeyPress={(event) => {
                          const charCode = event.which
                            ? event.which
                            : event.keyCode;
                          if (
                            charCode > 31 &&
                            (charCode < 48 || charCode > 57)
                          ) {
                            event.preventDefault();
                          }
                        }}
                        className="customTextField"
                      />
                    </TableCell>
                  </TableRow>
                )}

              {projectId !== Taskname.ahWorkwaveProjectId &&
                projectId !== Taskname.aomaDeliveryProjectId &&
                projectId !== Taskname.aomaPromoProjectId &&
                projectId !== Taskname.grpsProjectId &&
                projectId !== Taskname.starProjectId &&
                projectId !== Taskname.samisProjectId &&
                projectId !== Taskname.eomProjectId &&
                projectId !== Taskname.devopsProjectId &&
                projectId !== Taskname.scubaProjectId &&
                projectId !== Taskname.carmaProjectId &&
                projectId !== Taskname.radarProjectId && (
                  <TableRow className="customTableRow">
                    <TableCell
                      style={{
                        backgroundColor: theme.palette.primary.main,
                        fontFamily: "Arial",
                        fontSize: "13px",
                        color: "white",
                        textAlign: "center",
                        paddingTop: "1px",
                        paddingBottom: "1px",
                        backgroundColor: "#676c71"
                      }}
                    >
                      Employee Engagement
                    </TableCell>
                    <TableCell
                      style={{
                        backgroundColor: "white",
                        fontFamily: "Arial",
                        textAlign: "center",
                        paddingTop: "1px",
                        paddingBottom: "1px",
                      }}
                    >
                      <TextField
                        type="text"
                        id="ee"
                        defaultValue={
                          handleEffort(formatDate(reconciliationDate), 9) ||
                          eeValues
                        }
                        onChange={(e) => {
                          setEeValues(e.target.value);
                          handleInputChange();
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Backspace") {
                            handleIntegerChange("", setEeValues);
                          }
                        }}
                        onBlur={(event) => {
                          setTaskId(6);
                          handleBlurEvent(
                            9,
                            formatDate(reconciliationDate),
                            event.target.value
                          );
                        }}
                        inputProps={{
                          maxLength: 2,
                          pattern: "[0-9]*",
                          style: {
                            textAlign: "center",
                            padding: "10px 0px",
                            fontSize: "13px",
                            height: "16px",
                            backgroundColor:'#e8e9e7'
                          },
                        }}
                        onKeyPress={(event) => {
                          const charCode = event.which
                            ? event.which
                            : event.keyCode;
                          if (
                            charCode > 31 &&
                            (charCode < 48 || charCode > 57)
                          ) {
                            event.preventDefault();
                          }
                        }}
                        className="customTextField"
                      />
                    </TableCell>
                  </TableRow>
                )}

              {projectId !== Taskname.ahWorkwaveProjectId &&
                projectId !== Taskname.aomaDeliveryProjectId &&
                projectId !== Taskname.aomaPromoProjectId &&
                projectId !== Taskname.grpsProjectId &&
                projectId !== Taskname.starProjectId &&
                projectId !== Taskname.samisProjectId &&
                projectId !== Taskname.eomProjectId &&
                projectId !== Taskname.devopsProjectId &&
                projectId !== Taskname.scubaProjectId &&
                projectId !== Taskname.carmaProjectId &&
                projectId !== Taskname.radarProjectId && (
                  <TableRow className="customTableRow">
                    <TableCell
                      style={{
                        backgroundColor: theme.palette.primary.main,
                        fontFamily: "Arial",
                        fontSize: "13px",
                        color: "white",
                        textAlign: "center",
                        paddingTop: "1px",
                        paddingBottom: "1px",
                        backgroundColor: "#676c71"
                      }}
                    >
                      Performance Management
                    </TableCell>
                    <TableCell
                      style={{
                        backgroundColor: "white",
                        fontFamily: "Arial",
                        textAlign: "center",
                        paddingTop: "1px",
                        paddingBottom: "1px",
                      }}
                    >
                      <TextField
                        type="text"
                        id="pm"
                        defaultValue={
                          handleEffort(formatDate(reconciliationDate), 10) ||
                          pmValues
                        }
                        onChange={(e) => {
                          setPmValues(e.target.value);
                          handleInputChange();
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Backspace") {
                            handleIntegerChange("", setPmValues);
                          }
                        }}
                        onBlur={(event) => {
                          setTaskId(10);
                          handleBlurEvent(
                            10,
                            formatDate(reconciliationDate),
                            event.target.value
                          );
                        }}
                        inputProps={{
                          maxLength: 2,
                          pattern: "[0-9]*",
                          style: {
                            textAlign: "center",
                            padding: "10px 0px",
                            fontSize: "13px",
                            height: "16px",
                            backgroundColor:'#e8e9e7'
                          },
                        }}
                        onKeyPress={(event) => {
                          const charCode = event.which
                            ? event.which
                            : event.keyCode;
                          if (
                            charCode > 31 &&
                            (charCode < 48 || charCode > 57)
                          ) {
                            event.preventDefault();
                          }
                        }}
                        className="customTextField"
                      />
                    </TableCell>
                  </TableRow>
                )}

              {projectId !== Taskname.ahWorkwaveProjectId &&
                projectId !== Taskname.aomaDeliveryProjectId &&
                projectId !== Taskname.aomaPromoProjectId &&
                projectId !== Taskname.grpsProjectId &&
                projectId !== Taskname.starProjectId &&
                projectId !== Taskname.samisProjectId &&
                projectId !== Taskname.eomProjectId &&
                projectId !== Taskname.devopsProjectId &&
                projectId !== Taskname.scubaProjectId &&
                projectId !== Taskname.carmaProjectId &&
                projectId !== Taskname.radarProjectId && (
                  <TableRow className="customTableRow">
                    <TableCell
                      style={{
                        backgroundColor: theme.palette.primary.main,
                        fontFamily: "Arial",
                        fontSize: "13px",
                        color: "white",
                        textAlign: "center",
                        paddingTop: "1px",
                        paddingBottom: "1px",
                        backgroundColor: "#676c71"
                      }}
                    >
                      Compensation and Benefits
                    </TableCell>
                    <TableCell
                      style={{
                        backgroundColor: "white",
                        fontFamily: "Arial",
                        textAlign: "center",
                        paddingTop: "1px",
                        paddingBottom: "1px",
                      }}
                    >
                      <TextField
                        type="text"
                        id="cb"
                        defaultValue={
                          handleEffort(formatDate(reconciliationDate), 11) ||
                          cbValues
                        }
                        onChange={(e) => {
                          setCbValues(e.target.value);
                          handleInputChange();
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Backspace") {
                            handleIntegerChange("", setCbValues);
                          }
                        }}
                        onBlur={(event) => {
                          setTaskId(11);
                          handleBlurEvent(
                            11,
                            formatDate(reconciliationDate),
                            event.target.value
                          );
                        }}
                        inputProps={{
                          maxLength: 2,
                          pattern: "[0-9]*",
                          style: {
                            textAlign: "center",
                            padding: "10px 0px",
                            fontSize: "13px",
                            height: "16px",
                            backgroundColor:'#e8e9e7'
                          },
                        }}
                        onKeyPress={(event) => {
                          const charCode = event.which
                            ? event.which
                            : event.keyCode;
                          if (
                            charCode > 31 &&
                            (charCode < 48 || charCode > 57)
                          ) {
                            event.preventDefault();
                          }
                        }}
                        className="customTextField"
                      />
                    </TableCell>
                  </TableRow>
                )}
              {projectId !== Taskname.ahWorkwaveProjectId &&
                projectId !== Taskname.aomaDeliveryProjectId &&
                projectId !== Taskname.aomaPromoProjectId &&
                projectId !== Taskname.grpsProjectId &&
                projectId !== Taskname.starProjectId &&
                projectId !== Taskname.samisProjectId &&
                projectId !== Taskname.eomProjectId &&
                projectId !== Taskname.devopsProjectId &&
                projectId !== Taskname.scubaProjectId &&
                projectId !== Taskname.carmaProjectId &&
                projectId !== Taskname.radarProjectId && (
                  <TableRow className="customTableRow">
                    <TableCell
                      style={{
                        backgroundColor: theme.palette.primary.main,
                        fontFamily: "Arial",
                        fontSize: "13px",
                        color: "white",
                        textAlign: "center",
                        paddingTop: "1px",
                        paddingBottom: "1px",
                        backgroundColor: "#676c71"
                      }}
                    >
                      Audits and Compilance
                    </TableCell>
                    <TableCell
                      style={{
                        backgroundColor: "white",
                        fontFamily: "Arial",
                        textAlign: "center",
                        paddingTop: "1px",
                        paddingBottom: "1px",
                      }}
                    >
                      <TextField
                        type="text"
                        id="ac"
                        defaultValue={
                          handleEffort(formatDate(reconciliationDate), 12) ||
                          acValues
                        }
                        onChange={(e) => {
                          setAcValues(e.target.value);
                          handleInputChange();
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Backspace") {
                            handleIntegerChange("", setAcValues);
                          }
                        }}
                        onBlur={(event) => {
                          setTaskId(12);
                          handleBlurEvent(
                            12,
                            formatDate(reconciliationDate),
                            event.target.value
                          );
                        }}
                        inputProps={{
                          maxLength: 2,
                          pattern: "[0-9]*",
                          style: {
                            textAlign: "center",
                            padding: "10px 0px",
                            fontSize: "13px",
                            height: "16px",
                            backgroundColor:'#e8e9e7'
                          },
                        }}
                        onKeyPress={(event) => {
                          const charCode = event.which
                            ? event.which
                            : event.keyCode;
                          if (
                            charCode > 31 &&
                            (charCode < 48 || charCode > 57)
                          ) {
                            event.preventDefault();
                          }
                        }}
                        className="customTextField"
                      />
                    </TableCell>
                  </TableRow>
                )}

              <TableRow className="customTableRow">
                <TableCell
                  style={{
                    backgroundColor: theme.palette.primary.main,
                    fontFamily: "Arial",
                    fontSize: "13px",
                    color: "white",
                    textAlign: "center",
                    paddingTop: "1px",
                    paddingBottom: "1px",
                    backgroundColor: "#676c71"
                  }}
                >
                  Miscellaneous
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "white",
                    fontFamily: "Arial",
                    textAlign: "center",
                    paddingTop: "1px",
                    paddingBottom: "1px",
                  }}
                >
                  <TextField
                    type="text"
                    id="mis"
                    defaultValue={
                      handleEffort(formatDate(reconciliationDate), 7) ||
                      misValues
                    }
                    onChange={(e) => {
                      setMisValues(e.target.value);
                      handleInputChange();
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Backspace") {
                        handleIntegerChange("", setMisValues);
                      }
                    }}
                    onBlur={(event) => {
                      setTaskId(7);
                      handleBlurEvent(
                        7,
                        formatDate(reconciliationDate),
                        event.target.value
                      );
                    }}
                    inputProps={{
                      maxLength: 2,
                      pattern: "[0-9]*",
                      style: {
                        textAlign: "center",
                        padding: "10px 0px",
                        fontSize: "13px",
                        height: "16px",
                        backgroundColor:'#e8e9e7'
                      },
                    }}
                    onKeyPress={(event) => {
                      const charCode = event.which
                        ? event.which
                        : event.keyCode;
                      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                        event.preventDefault();
                      }
                    }}
                    className="customTextField"
                  />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell
                  style={{
                   backgroundColor: "#353638",
                    fontFamily: "Arial",
                    fontSize: "13px",
                    color: "white",
                    textAlign: "center",
                    paddingTop: "1px",
                    paddingBottom: "1px",

                  }}
                >
                  Total
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "white",
                    fontFamily: "Arial",
                    textAlign: "center",
                    paddingTop: "1px",
                    paddingBottom: "1px",

                  }}
                >
                  <TextField
                    type="text"
                    id="mis"
                    value={total}
                    readOnly
                    inputProps={{
                      style: {
                        textAlign: "center",
                        padding: "10px 0px",
                        fontSize: "13px",
                        height: "16px",
                        backgroundColor:'#cccccc'
                      },
                    }}
                    className="customTextField"
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Box className="buttonContainer"   sx={{ mt: 1, display: "flex", justifyContent: "center" }} >
            <Button
              variant="contained"
              color="primary"
              className="customButton"
              onClick={handleSubmitModal}
              style={{
      width: "30%",
      height: "36px",
      fontSize: "13px",
      boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.85)",
    }}
              disabled={loading}
            >
              Submit
            </Button>

            {/* {<Button
              variant="contained"
              color="primary"
              className="customButton"
              onClick={handleClearModal}
              style={{
                fontFamily: 'Arial',
                width: '15%',
                height: '40px',
                fontSize: '11px',
                boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.85)',
              }}
              disabled={loading} 
            >
              Clear
            </Button> } */}
          </Box>
        </Box>
      </Modal>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          Value cannot be greater than 24
        </Alert>
      </Snackbar>
      <Snackbar
        open={successSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleSuccessSnackbarClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MuiAlert
          onClose={handleSuccessSnackbarClose}
          severity="success"
          variant="filled"
          sx={{
            width: "100%",
            height: "70%",
            backgroundColor: "#2e7d32",
            color: "#ffffff",
          }}
        >
          Details submitted successfully!
        </MuiAlert>
      </Snackbar>
      <Snackbar
        open={emptyReasonSnackbarOpen}
        autoHideDuration={6000}
        onClose={() => setEmptyReasonSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity="error"
          onClose={() => setEmptyReasonSnackbarOpen(false)}
        >
          Please provide the reason
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}