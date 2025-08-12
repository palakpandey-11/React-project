import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  IconButton,
  Stack,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TablePagination
} from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'

// only CLOSED rows here
const closedSampleRows = [
  { id: 10021, name: 'Pranali ', leaveType: 'Restricted', startDate: '09-06-2025', endDate: '09-06-2025', days: 1, reason: 'Holiday', appliedOn: '30-05-2025', balance: 4, status: 'Approved' },
]

export default function ClosedApprovals() {
  const navigate = useNavigate()
// 1️ State
const [closedRows, setClosedRows] = useState([])

// 2 On mount, merge built-in defaults + newly approved
useEffect(() => {
  // Check if we have anything saved already
  const stored = localStorage.getItem('closedRows')
  if (stored) {
    // Load exactly what was approved in Active
    setClosedRows(JSON.parse(stored))
  } else {
    // First‐time only: seed with our built‐in defaults
    localStorage.setItem('closedRows', JSON.stringify(closedSampleRows))
    setClosedRows(closedSampleRows)
  }
}, [])

// 3️ Pagination state (if you need it here too)
const [page, setPage]           = useState(0)
const [rowsPerPage, setRowsPerPage] = useState(5)


  return (
    <div style={{
      position: 'relative',
      textAlign: 'center',
      color: 'white',
      fontFamily: 'Arial',
      paddingTop: 16
    }}>
      <IconButton
        onClick={() => navigate('/timesheettable')}
        sx={{ position: 'absolute', top: 16, left: 16, color: 'white' }}
      >
        <ArrowBackIosIcon />
      </IconButton>

      <h2 style={{ margin: 0 }}>Leave Approval / Reconciliation</h2>

      <Box sx={{
        mt: 3,
        width: '90%',
        maxWidth: 1450,
        border: '2px solid rgba(0, 0, 0, 0.3)',
        borderRadius: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        p: 2,
        ml: '4%',
        height:540,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        {/* Tabs */}
        <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
          <Button variant="outlined" onClick={() => navigate('/approvals')} sx={{
            color: 'rgba(255,255,255,0.7)',
            borderColor: 'rgba(255,255,255,0.5)',
            '&:hover': { backgroundColor: 'rgba(255,255,255,0.08)' }
          }}>ACTIVE</Button>
          <Button variant="contained" sx={{
            backgroundColor: '#1976d2', color: 'white',
            '&:hover': { backgroundColor: '#1565c0' }
          }}>CLOSED</Button>
          <Button variant="outlined" //onClick={() => navigate('/approvals/closed')} 
          onClick={() => navigate('/approvals/reconcilation')}
          sx={{
            color: 'rgba(255,255,255,0.7)',
            borderColor: 'rgba(255,255,255,0.5)',
            
            '&:hover': { backgroundColor: 'rgba(255,255,255,0.08)' }
          }}>
            Reconciliation
          </Button>          
            </Stack>

          <Box sx={{
          flex: 1,
          width: '95%',
          display: 'flex',
          flexDirection: 'column' 
       }}>
        <TableContainer component={Paper} sx={{
          backgroundColor: 'rgba(0,0,0,0.26)',
          border: '1px solid rgba(255, 255, 255, 0.38)',
          borderRadius: 1,
          
          maxHeight: 420,
            overflowY: 'auto',
            flex:1,
            
        }}>
          <Table size='small'stickyHeader>
            <TableHead>
              <TableRow sx={{           "& .MuiTableCell-stickyHeader": {
      backgroundColor: "rgb(6, 6, 6)",  // your translucent blue
      color: "white",   } }}>
                {['Employee ID','Emp Name','Leave Type','From','To','Days','Reason','Applied On','Balance','Status'].map(h => (
                  <TableCell key={h} sx={{ color: 'white', fontWeight: 'bold', py:1.3, px:1 }}>{h}</TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {closedRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(row => (
                  <TableRow key={row.id} sx={{ backgroundColor: 'rgba(255, 253, 253, 0.11)' }}>
                    <TableCell sx={{ color: 'white',py:1.3, px:1,  }}>{row.empId}</TableCell>
                    <TableCell sx={{ color: 'white', py:1.3, px:1}}>{row.name}</TableCell>
                    <TableCell sx={{ color: 'white',  py:1.3,px:1 }}>{row.leaveType}</TableCell>
                    <TableCell sx={{ color: 'white', py:1.3, px:1 }}>{row.startDate}</TableCell>
                    <TableCell sx={{ color: 'white', py:1.3, px:1 }}>{row.endDate}</TableCell>
                    <TableCell sx={{ color: 'white', py:1.3, px:1 }}>{row.days}</TableCell>
                     <TableCell sx={{ color: 'white', py:1.3, px:1 }}>{row.reason}</TableCell>
                    <TableCell sx={{ color: 'white',py:1.3, px:1 }}>{row.appliedOn}</TableCell>
                    <TableCell sx={{ color: 'white', py:1.3, px:1 }}>{row.balance}</TableCell>
                    <TableCell sx={{ color: 'white',py:1.3, px:1 }}>{row.status}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
           </TableContainer>
                     {/* fixed footer pagination */}
          <Box sx={{ flexShrink: 0, mt: 2 }}>
            <TablePagination
              component="div"
              count={closedRows.length}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={(e,newPage) => setPage(newPage)}
              onRowsPerPageChange={e => { setRowsPerPage(+e.target.value); setPage(0) }}
              rowsPerPageOptions={[5,10,25]}
              sx={{
                color: 'black',
                backgroundColor: 'rgba(255,249,249,0.74)',
                '& .MuiTablePagination-selectIcon': { color: 'black' },
                '& .MuiTablePagination-select': { color: 'black' },
                '& .MuiIconButton-root': { color: 'black' }
              }}
            />
          </Box>
          </Box>
        </Box>
    </div>
  )
}
