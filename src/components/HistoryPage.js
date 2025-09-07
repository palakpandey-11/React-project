import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Paper,
  TablePagination,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const HistoryPage = () => {
  const navigate = useNavigate();

  const [selectedRows, setSelectedRows] = useState([]);
  const [rowsData, setRowsData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  // Get logged-in user and directory data from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const isHr = user?.role === "hr";

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("leaveHistory") || "[]");
    
    let filteredHistory = [];
    if (isHr) {
      // If user is HR, show all entries
      filteredHistory = storedHistory;
    } else {
      // For all other users (employees/managers), show only their own entries
      filteredHistory = storedHistory.filter(entry => entry.empId === user.empId);
    }
    setRowsData(filteredHistory);
  }, [isHr, user?.empId]);

  const handleSelectRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };
  
  const handleWithdraw = () => {
    // Check if user is HR; if so, prevent withdrawal
    if (isHr) {
      triggerToast("You do not have permission to withdraw leaves.", "error");
      setSelectedRows([]);
      return;
    }
    
    // Check if all selected leaves are in "Withdraw Pending" status
    const leavesToWithdraw = rowsData.filter(row => selectedRows.includes(row.id));
    const canWithdraw = leavesToWithdraw.every(row => row.status === "Withdraw Pending");

    if (!canWithdraw) {
      triggerToast("Only 'Withdraw Pending' leaves can be withdrawn.", "error");
      return;
    }
    
    // Leave balances ko recover karein
    const storedBalances = JSON.parse(localStorage.getItem(`leaveBalances_${user.empId}`) || "[]");
    const updatedBalances = [...storedBalances];
    
    leavesToWithdraw.forEach(leave => {
      const leaveTypeToUpdate = updatedBalances.find(lb => lb.code === leave.leaveType);
      if (leaveTypeToUpdate) {
        leaveTypeToUpdate.value += leave.days;
      }
    });

    localStorage.setItem(`leaveBalances_${user.empId}`, JSON.stringify(updatedBalances));

    // Fetch the full leave history from localStorage
    const storedHistory = JSON.parse(localStorage.getItem("leaveHistory") || "[]");
    
    // Filter the full history to remove the withdrawn leaves
    const updatedHistory = storedHistory.filter((row) => !selectedRows.includes(row.id));

    // Update localStorage with the new, complete history
    localStorage.setItem("leaveHistory", JSON.stringify(updatedHistory));
    
    // Update the local state (rowsData) to reflect the changes
    const newRowsData = rowsData.filter((row) => !selectedRows.includes(row.id));
    setRowsData(newRowsData);

    // Also remove from leaveApprovals
    const approvals = JSON.parse(localStorage.getItem("leaveApprovals") || "[]");
    const updatedApprovals = approvals.filter((row) => !selectedRows.includes(row.id));
    localStorage.setItem("leaveApprovals", JSON.stringify(updatedApprovals));

    setSelectedRows([]);
    triggerToast("Leave withdrawn successfully and balance recovered!", "success");
  };

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [toastState, setToastState] = useState({ show: false, message: "", type: "" });

  const triggerToast = (message, type) => {
    setToastState({ show: true, message, type });
    setTimeout(() => {
      setToastState({ show: false, message: "", type: "" });
    }, 2500);
  };

  // Disable withdraw button if no rows are selected, or if the user is HR, or if any selected row is not "Withdraw Pending"
  const isWithdrawDisabled = selectedRows.length === 0 || isHr || selectedRows.some(id => {
    const row = rowsData.find(r => r.id === id);
    return row.status !== "Withdraw Pending";
  });

  return (
    <Box className="leave-container" sx={{ p: 3 }}>
      <IconButton
        onClick={() => navigate('/leavepage')}
        sx={{ position: 'absolute', top: 16, left: 16, color: 'white' }}
      >
        <ArrowBackIosIcon />
      </IconButton>

      <Box className="leave-header" sx={{ maxWidth: 1100, mx: 'auto' }}>
        <Typography variant="h5" className="leave-title" sx={{ color: 'white', mb: 2 }}>LEAVE</Typography>

        <Box className="random2">
          <Box className="leave-buttons" sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <Button variant="outlined" color="primary" onClick={() => navigate('/leavepage')}>APPLY</Button>
            <Button variant="contained" className="history-button">HISTORY</Button>
          </Box>
          <Box
            sx={{
              backgroundColor: 'transparent',
              borderRadius: '12px',
              padding: '20px',
            }}
          >
            
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
              <Button
                variant="contained"
                color="error"
                onClick={handleWithdraw}
                disabled={isWithdrawDisabled}
                sx={{
                  "&.Mui-disabled": {
                    backgroundColor: 'rgba(255, 255, 255, 0.25)',
                    color: 'rgba(0, 0, 0, 0.26)'
                  }
                }}
              >
                WITHDRAW
              </Button>
            </Box>
              
            <TableContainer component={Paper} sx={{ backgroundColor: '#1b1a1aff', height: "350px",border:'1px solid rgba(255, 255, 255, 0.85)' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}></TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Emp ID</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Leave Type</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Start Date</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>End Date</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Reason</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Balance</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rowsData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                     // Calculate the balance to display based on the status
                     let balanceToDisplay = row.balance;
                     if (row.status === "Withdraw Pending" || row.status === "Rejected") {
                       balanceToDisplay = row.balance + row.days;
                     }
                     return (
                    <TableRow key={row.id} sx={{ height: '36px' }}>
                      <TableCell sx={{ color: 'white', py: 0.5 }}>
                        <Checkbox
                          checked={selectedRows.includes(row.id)}
                          onChange={() => handleSelectRow(row.id)}
                          disabled={row.status !== "Withdraw Pending" || isHr} // Disable checkbox for HR and non-"Withdraw Pending" statuses
                          sx={{ color: 'white', p: 0.5 }}
                        />
                      </TableCell>
                      <TableCell sx={{ color: 'white', p: 0.5 }}>{row.empId}</TableCell>
                      <TableCell sx={{ color: 'white', p: 0.5 }}>{row.leaveType}</TableCell>
                      <TableCell sx={{ color: 'white', p: 0.5 }}>{row.startDate}</TableCell>
                      <TableCell sx={{ color: 'white', p: 0.5 }}>{row.endDate}</TableCell>
                      <TableCell sx={{ color: 'white', p: 0.5 }}>{row.reason}</TableCell>
                      <TableCell sx={{ color: 'white', p: 0.5 }}>{balanceToDisplay}</TableCell>
                      <TableCell sx={{ color: 'white', p: 0.5 }}>{row.status}</TableCell>
                    </TableRow>
                     );
                  })}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              component="div"
              count={rowsData.length}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              sx={{
                backgroundColor: '#e0e0e0',
                borderBottomLeftRadius: '8px',
                borderBottomRightRadius: '8px',
                mt:'4px'
              }}
            />
          </Box>
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
  );
};

export default HistoryPage;