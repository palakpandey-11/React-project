import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import IconButton from '@mui/material/IconButton';


const HistoryPage = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("leaveHistory");
    if (stored) {
      setHistory(JSON.parse(stored));
    }
  }, []);

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

             <Box className="random2" >
                       <Box className="leave-buttons">
                         <Button variant= "outlined" color="primary" onClick={() => navigate('/leave')}>APPLY</Button>
                         <Button variant= "contained" className="history-button">HISTORY</Button>
                       </Box> 

    <Box className="leave-history-section" sx={{ height: 430, width: '100%', backgroundColor: 'transparent', borderRadius: 2, padding: 2, mt: -2 }}>
      {history.length === 0 ? (
        <Typography sx={{ color: 'white' }}>No leave records found.</Typography>
      ) : (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
            <Button variant="contained" color="error">
              WITHDRAW
            </Button>
          </Box>

          <DataGrid
            rows={history.map((entry, index) => ({ id: index, ...entry }))}
            columns={[
              { field: 'empId', headerName: 'Emp ID', flex: 1, sortable: false },
              { field: 'leaveType', headerName: 'Leave Type', flex: 1, sortable: false },
              { field: 'startDate', headerName: 'Start Date', flex: 1, sortable: false },
              { field: 'endDate', headerName: 'End Date', flex: 1, sortable: false },
              { field: 'reason', headerName: 'Reason', flex: 1, sortable: false },
              { field: 'balance', headerName: 'Balance', flex: 1, sortable: false },
              { field: 'status', headerName: 'Status', flex: 1, sortable: false }
            ]}
            pageSize={5}
            rowsPerPageOptions={[5]}
            rowHeight={35} 
            checkboxSelection
            disableColumnMenu
            hideFooterSelectedRowCount
            disableRowSelectionOnClick
            sx={{
              backgroundColor: 'rgba(0,0,0,0.5) ',
              color: 'rgba(255, 255, 255, 0.8)',
              // border: '3px solid rgba(255, 255, 255, 0.2)',
              '& .MuiDataGrid-cell': { color: 'white',textAlign: 'center', justifyContent: 'center',display: 'flex',alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.9) !important',},
              '& .MuiCheckbox-root': { color: 'rgba(255, 255, 255, 0.8) !important' },
              '& .MuiDataGrid-row.Mui-selected': { backgroundColor: 'transparent !important' },
              '& .MuiDataGrid-row.Mui-selected:hover': { backgroundColor: 'transparent !important' },
              '& .MuiPaper-root': { backgroundColor: 'transparent' },
              '& .MuiDataGrid-footerContainer': { backgroundColor: 'rgba(255, 255, 255, 0.8)', color: 'black' },
               '& .MuiDataGrid-row': {
    backgroundColor: 'rgba(255, 255, 255, 0.9) !important',
  },
              '& .MuiDataGrid-row:hover': { backgroundColor: 'transparent' },
              '& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer': { display: 'none' },
              '& .MuiDataGrid-columnHeaders': {backgroundColor: 'rgba(0, 0, 0, 0.6) !important'},
              '& .MuiDataGrid-columnHeader': {
                      backgroundColor: 'rgba(0, 0, 0,3) !important',
                      color:'white',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    },
              '& .MuiDataGrid-columnHeaderTitleContainer': {
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
              },
              '& .MuiDataGrid-columnHeaderTitle': {
                color:'white',
                fontWeight: 'bold',
                flexGrow: 1,
                textAlign: 'center',
              },
              '& .MuiDataGrid-columnSeparator': {
                display: 'none !important',
              },
              // '& .MuiDataGrid-cell': {
              //   display: 'flex',
              //   alignItems: 'center',
              //   justifyContent: 'center',
              //   color: 'white',
              //   textAlign: 'center',
              // },
            }}
          />
        </>
      )}
    </Box>
    </Box>
    </Box>
    </Box>
  );
};

export default HistoryPage;