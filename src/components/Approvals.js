import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  IconButton,
  Stack,
  Button,
  TextField,
  InputAdornment,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  Paper,
  TablePagination,
  Snackbar,    // ← add this
  Alert  
} from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import SearchIcon from '@mui/icons-material/Search'
import RejectButton from './RejectButton'

// initial ACTIVE rows
const activeSampleRows = [
  { id: 1150, name: 'Dhanush',  leaveType: 'Annual Leave', startDate: '09-06-2025', endDate: '09-06-2025', days: 1, reason: '', appliedOn: '30-05-2025', status: 'Withdraw Pending' },
  { id: 1151, name: 'Divesh',   leaveType: 'Annual Leave', startDate: '09-06-2025', endDate: '09-06-2025', days: 1, reason: '', appliedOn: '30-05-2025', status: 'Withdraw Pending' },
  { id: 1152, name: 'Dakshesh', leaveType: 'Annual Leave', startDate: '09-06-2025', endDate: '09-06-2025', days: 1, reason: '', appliedOn: '30-05-2025', status: 'Withdraw Pending' },
  {id: 1246, name: 'Palak P',  leaveType: 'Annual Leave', startDate: '21-10-2024', endDate: '21-10-2024', days: 1, reason: 'Personal', appliedOn: '21-05-2025', status: 'withdraw pending' }
]

export default function Approvals() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  // state
const [activeTab, setActiveTab]         = useState('ACTIVE')
const [activeRows, setActiveRows] = useState(() => {
  const stored = localStorage.getItem("leaveApprovals");
  return stored ? JSON.parse(stored) : [];
});
const [selected, setSelected]   = useState([])
  const [page, setPage]                 = useState(0)

  const [rowsPerPage, setRowsPerPage]   = useState(5)
  // ← NEW: snackbar open state
  const [snackbarOpen, setSnackbarOpen] = useState(false)
// NEW: state for the Reject modal
 const [openReject, setOpenReject] = useState(false)
 const [toRejectRows, setToRejectRows] = useState([])

  // toggle a single row’s checkbox
  function handleSelect(id){
    setSelected(prev =>
    prev.includes(id)
      ? prev.filter(rid => rid !== id)
      : [...prev, id]
  )
}
  // APPROVE logic
const handleApprove = () => {
    if (!selected.length) return

    const approvedItems = activeRows
      .filter(r => selected.includes(r.id))
    .map(r => ({
      ...r,
      status:  'Approved',
      reason:  r.reason  || 'SickLeave',  // or whatever default you like
      balance: r.balance || 10.0      //else whatever defaukt you like to give
    }))

 const updatedActiveRows = activeRows.filter(r => !selected.includes(r.id));
setActiveRows(updatedActiveRows);
localStorage.setItem("leaveApprovals", JSON.stringify(updatedActiveRows));

    const existing = JSON.parse(localStorage.getItem('closedRows')||'[]')
    localStorage.setItem('closedRows', JSON.stringify([...existing, ...approvedItems]))

     const updatedHistory = JSON.parse(localStorage.getItem("leaveHistory") || "[]").map(entry =>
      selected.includes(entry.empId) ? { ...entry, status: "Approved" } : entry
    );
    localStorage.setItem("leaveHistory", JSON.stringify(updatedHistory));

    setSelected([])
    setActiveTab('CLOSED')

    // ← NEW: fire success toast
    setSnackbarOpen(true)
  }

  // REJECT logic (no-op here)
const handleOpenReject = () => {
  // grab the full row objects for any selected IDs
  setToRejectRows(
    filteredRows.filter(r => selected.includes(r.id))
  )
  setOpenReject(true)
  }

 const handleCloseReject = () => setOpenReject(false)

  // this will be called when RejectButton finishes
  const onRowsRejected = (rejectedItems) => {
    // remove them from activeRows
    const updatedActive = activeRows.filter(r => !rejectedItems.some(x => x.id === r.id));
setActiveRows(updatedActive);
localStorage.setItem("leaveApprovals", JSON.stringify(updatedActive));
    setSelected([])
    // optionally switch to CLOSED tab:
    //setActiveTab('CLOSED')
     const updatedHistory = JSON.parse(localStorage.getItem("leaveHistory") || "[]").map(entry =>
      rejectedItems.some(item => item.id === entry.empId) ? { ...entry, status: "Rejected" } : entry
       );
    localStorage.setItem("leaveHistory", JSON.stringify(updatedHistory));

    setActiveTab('CLOSED');
  }

  const filteredRows = activeRows.filter(r => {
  const term = searchTerm.trim().toLowerCase()
  if (!term) return true
  return (
    r.id.toString().includes(term) ||
    r.name.toLowerCase().includes(term)
  )
})
 // header checkbox state (based on filteredRows)
 const allSelected  = selected.length === filteredRows.length && filteredRows.length > 0
 const someSelected = selected.length > 0 && selected.length < filteredRows.length

  return (
    <div style={{
      position: 'relative',
      textAlign: 'center',
      color: 'white',
      fontFamily: 'Arial',
      paddingTop: 16
    }}>
      {/* back arrow */}
      <IconButton
        onClick={() => navigate('/timesheettable')}
        sx={{ position: 'absolute', top: 16, left: 16, color: 'white' }}
      >
        <ArrowBackIosIcon />
      </IconButton>

      <h2 style={{ margin: 0 }}>Leave Approval / Reconciliation</h2>

      {/* outer box */}
      <Box sx={{
        mt: 3,
        width: '90%',
        maxWidth: 1450,
        mx:'auto',
        border: '2px solid rgba(45, 44, 44, 0.26)',
        borderRadius: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.59)',
        p: 2,
      }}>
        {/* Tabs */}
        <Stack direction="row" spacing={1} sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            sx={{ backgroundColor: '#1976d2', color: 'white', '&:hover': { backgroundColor: '#1565c0' } }}
          >
            ACTIVE
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate('/approvals/closed')}
            sx={{
              color: 'rgba(255,255,255,0.7)',
              borderColor: 'rgba(255,255,255,0.5)',
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.08)' }
            }}
          >
            CLOSED
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate('/approvals/reconcilation')}
            sx={{
              color: 'rgba(255,255,255,0.7)',
              borderColor: 'rgba(255,255,255,0.5)',
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.08)' }
            }}
          >
            RECONCILIATION
          </Button>
        </Stack>

        {/* inner bordered box: search + table + pagination */}
        <Box sx={{
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: 1,
          overflow: 'hidden',
          width:'90%',
          mx:'auto',
          p: 2,
          mt:2,
          display:'flex',
          flexDirection:'column',
          height:460, //
          
          //mb:19,
        }}>

          {/* Search + Actions */}
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            flexShrink:0,
            justifyContent: 'space-between',
            mb: 2
          }}>
            <TextField
              variant="filled"
              placeholder="Search By Employee Name or Employee Id"
              size="small"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              sx={{
                flex: 1, 
                maxWidth: '400px',
                bgcolor: 'rgba(255,255,255,0.1)',
                '& .MuiFilledInput-root': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderRadius: 1,
                  border: '1px solid rgba(255,255,255,0.3)'
                },
                '& .MuiFilledInput-input': { color: 'white', py: 1 }
              }}
              InputProps={{
                disableUnderline: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon sx={{ color: 'rgba(255,255,255,0.7)' }} />
                  </InputAdornment>
                )
              }}
            />

            <Stack direction="row" spacing={1} sx={{ flexShrink: 0 }}>
              <Button
                variant="outlined"
                disabled={!selected.length}
                onClick={handleApprove}
                sx={{
                  color: 'white',
                  borderColor: 'rgba(255,255,255,0.5)',
                   
                  '&:not(.Mui-disabled):hover': {
                    borderColor: 'green',
                    backgroundColor: 'rgba(255,255,255,0.1)'
                  },
                  '&.Mui-disabled': {
                    color: 'rgba(255, 255, 255, 0.57)',
                    borderColor: 'rgba(255,255,255,0.3)',
                    bgcolor: 'rgba(255, 255, 255, 0.25)',
                  }
                }}
              >
                APPROVE
              </Button>
              <Button
                variant="outlined"
                disabled={!selected.length}
                onClick={handleOpenReject}
                sx={{
                  color: 'white',
                  borderColor: 'rgba(255,255,255,0.5)',
                  '&:not(.Mui-disabled):hover': {
                    borderColor: 'red',
                    backgroundColor: 'rgba(255,255,255,0.08)'
                  },
                  '&.Mui-disabled': {
                    color: 'rgba(255, 255, 255, 0.57)',
                    borderColor: 'rgba(255,255,255,0.3)',
                    bgcolor: 'rgba(255, 255, 255, 0.25)',
                  }
                }}
              >
                REJECT
              </Button>
<RejectButton
   openReject={openReject}
   onCloseReject={handleCloseReject}
   leaveRows={toRejectRows}
   onRejected={(rejectedItems) => {
     // remove them from your ACTIVE table
     setActiveRows(prev => prev.filter(r => !selected.includes(r.id)))
     setSelected([])
     // you can also decide to switch tabs here
     setActiveTab('CLOSED')
     // then refresh from localStorage or however you like
   }}
 />
            </Stack>
          </Box>

          {/* Table */}
          <TableContainer component={Paper} sx={{
            maxHeight: 380,
            overflowY: 'auto',
            flex:1,
            mb:2,
            backgroundColor: 'rgba(0,0,0,0.26)',
            border: '1px solid rgba(255,255,255,0.9)',
            borderRadius: 1,
          }}>
            {/* stickyHeader */}
            <Table size='small' stickyHeader>  
              <TableHead>
                <TableRow sx={{ "& .MuiTableCell-stickyHeader": {
      backgroundColor: "rgb(0, 0, 0)",  // your translucent blue
      color: "white",   }}}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={ selected.length === filteredRows.length }
                      onChange={e =>
                        e.target.checked
                          ? setSelected(activeRows.map(r => r.id))
                          : setSelected([])
                      }
                      sx={{
            color: 'white',
                '& .MuiSvgIcon-root': {
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  borderRadius: 1,
                },
            '&:hover .MuiSvgIcon-root': {
              backgroundColor: 'rgba(255, 255, 255, 0.4)',
            }
          }}
                    />
                  </TableCell>
                  {[
                    'Emp Id','Emp Name','Leave Type',
                    'Start Date','End Date','Days',
                    'Applied On','Reason','Status'
                  ].map(h => (
                    <TableCell
                      key={h}
                      sx={{
                        color: 'white',
                        fontWeight: 'bold',
                        backgroundColor: 'rgba(0,0,0,0.3)',
                        py:1.5, //vertical paddding
                        px:2,   //horizontal padding
                      }}
                    >
                      {h}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredRows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(row => (
                    <TableRow
                      key={row.id}
                      hover
                      selected={selected.includes(row.id)}
                      sx={{ cursor: 'default', backgroundColor: 'rgba(255,253,253,0.11)' }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selected.includes(row.id)}
                          onChange={() => handleSelect(row.id)}
                          sx={{
                color: 'white',
                '& .MuiSvgIcon-root': {
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  borderRadius: 1,
                },

              }}
                        />
                      </TableCell>
                      <TableCell sx={{ color: 'white', py:1.3, px:2, }}>{row.id}</TableCell>
                      <TableCell sx={{ color: 'white', py:0.5, px:2, }}>{row.name}</TableCell>
                      <TableCell sx={{ color: 'white', py:0.5, px:2, }}>{row.leaveType}</TableCell>
                      <TableCell sx={{ color: 'white', py:0.5, px:2,}}>{row.startDate}</TableCell>
                      <TableCell sx={{ color: 'white', py:0.5, px:2, }}>{row.endDate}</TableCell>
                      <TableCell sx={{ color: 'white', py:0.5, px:2, }}>{row.days}</TableCell>
                      <TableCell sx={{ color: 'white', py:0.5, px:2, }}>{row.appliedOn}</TableCell>
                      <TableCell sx={{ color: 'white', py:0.5, px:2, }}>{row.reason}</TableCell>
                      <TableCell sx={{ color: 'white', py:0.5, px:2, }}>{row.status}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination inside the same border */}
          <TablePagination
            component="div"
           count={filteredRows.length}
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
        </Box>{/* end inner bordered box */}
      </Box>{/* end outer box */}

      {/* ← NEW: Snackbar at bottom center */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1500}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
<Alert variant="filled" severity="success">
  Approved successfully
</Alert>
      </Snackbar>
    </div>
  )
}
