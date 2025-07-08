import React, { useState, useEffect } from 'react'
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
  TablePagination
} from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import SearchIcon from '@mui/icons-material/Search'
import axios from 'axios';


// sample data for Reconciliation tab
const reconSampleRows = [
  { id: 100214, name: 'om', reason: 'Forgot to enter time', date: '17-10-2024', status: 'Pending' },
  { id: 100218, name: 'palak',     reason: 'fgh',                 date: '16-10-2024', status: 'Pending' },
  { id: 100146, name: 'pranali',reason: 'okkkk fill',          date: '16-10-2024', status: 'Pending' },
  // …add more as needed…
]

export default function ReconciliationApproval() {
  const navigate = useNavigate()

  // search + selection + pagination state
  const [searchTerm, setSearchTerm]   = useState('')
  const [selected, setSelected]       = useState([])
  const [page, setPage]               = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
   // new state for rows coming from your API
 const [reconRows,  setReconRows]    = useState([])

useEffect(() => {
  const stored = localStorage.getItem('reconciliationData');
  if (stored) {
    setReconRows(JSON.parse(stored));
  }
}, []);


//merge yoyr static sample+dynamic api rows
  // filter by id or name 
 const allRows      = [...reconSampleRows, ...reconRows]
 const filteredRows = allRows.filter(r => {
    const t = searchTerm.trim().toLowerCase()
    if (!t) return true
    return (
      r.id.toString().includes(t) ||
      r.name.toLowerCase().includes(t)
    )
  })

  const allSelected  = selected.length === filteredRows.length && filteredRows.length > 0
  const someSelected = selected.length > 0 && selected.length < filteredRows.length

  const handleSelect = id => {
    setSelected(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : [...prev, id]
    )
  }

  return (
    <div style={{ position: 'relative', textAlign: 'center', color: 'white', fontFamily: 'Arial', paddingTop: 16 }}>
      {/* back arrow */}
      <IconButton onClick={() => navigate('/timesheettable')} sx={{ position: 'absolute', top: 16, left: 16, color: 'white' }}>
        <ArrowBackIosIcon />
      </IconButton>

      <h2 style={{ margin: 0 }}>Leave Approval / Reconciliation</h2>

      {/* outer container */}
      <Box sx={{
        mt: 3,
        width: '90%',
        maxWidth: 1450,
        mx: 'auto',
        border: '2px solid rgba(45,44,44,0.26)',
        borderRadius: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        p: 2
      }}>
        {/* Tabs */}
        <Stack direction="row" spacing={1} sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
          <Button variant="outlined" onClick={() => navigate('/approvals')} sx={{ color: 'rgba(255,255,255,0.7)', borderColor: 'rgba(255,255,255,0.5)' }}>
            ACTIVE
          </Button>
          <Button variant="outlined" onClick={() => navigate('/approvals/closed')} sx={{ color: 'rgba(255,255,255,0.7)', borderColor: 'rgba(255,255,255,0.5)' }}>
            CLOSED
          </Button>
          <Button variant="contained" sx={{ backgroundColor: '#1976d2', color: 'white', '&:hover': { backgroundColor: '#1565c0' } }}>
            RECONCILIATION
          </Button>
        </Stack>

        {/* search + actions */}
        <Box sx={{ border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: 1,
          overflow: 'hidden',
          width:'90%',
          mx:'auto',
          p: 2,
          mt:2,
          display:'flex',
          flexDirection:'column',
          height:460, //
          }}>
            <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexShrink:0,
                        justifyContent: 'space-between',
                        mb: 2
                      }}>
          <TextField
            variant="filled"
            placeholder="Search By Name or ID"
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

          <Stack direction="row" spacing={1} sx={{ flexShrink: 0}}>
            <Button
              variant="outlined"
              disabled={!selected.length}
              onClick={() => {/* TODO: reconciliation-approve */}}
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
              onClick={() => {/* TODO: reconciliation-reject */}}
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
          </Stack>
        </Box>

        {/* table */}
        <TableContainer component={Paper} sx={{
            maxHeight: 380,
            overflowY: 'auto',
            flex:1,
            mb:2,
            backgroundColor: 'rgba(0,0,0,0.26)',
            border: '1px solid rgba(255,255,255,0.9)',
            borderRadius: 1,
        }}>
          <Table size="small" >
            <TableHead>
              <TableRow sx={{ backgroundColor: 'rgba(0,0,0,0.12)' }}>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={allSelected}
                    indeterminate={someSelected}
                    onChange={e =>
                      e.target.checked
                        ? setSelected(filteredRows.map(r => r.id))
                        : setSelected([])
                    }
                    sx={{  color: 'white',
                '& .MuiSvgIcon-root': {
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  borderRadius: 1,
                },
            '&:hover .MuiSvgIcon-root': {
              backgroundColor: 'rgba(255, 255, 255, 0.4)',}
             }}
                  />
                </TableCell>
                {['EmployeeId','EmployeeName','Reason','Date','Status'].map(h => (
                  <TableCell key={h} sx={{ color: 'white', fontWeight: 'bold', backgroundColor: 'rgba(0,0,0,0.3)', py:1.5, px:2 }}>
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(row => (
                  <TableRow
                    key={row.id}
                    hover
                    selected={selected.includes(row.id)}
                    sx={{
                         cursor: 'default',
                      backgroundColor: 'rgba(255,255,255,0.11)',
                      
                    }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selected.includes(row.id)}
                        onChange={() => handleSelect(row.id)}
                        sx={{  
                        color: 'white',
                '& .MuiSvgIcon-root': {
                  backgroundColor: 'rgba(255, 255, 255, 0.22)',
                  borderRadius: 1,}
                 }}
                      />
                    </TableCell>
                    <TableCell sx={{ color: 'white', py:1.3, px:2 }}>{row.id}</TableCell>
                    <TableCell sx={{ color: 'white', py:1.3, px:2 }}>{row.name}</TableCell>
                    <TableCell sx={{ color: 'white', py:1.3, px:2 }}>{row.reason}</TableCell>
                    <TableCell sx={{ color: 'white', py:1.3, px:2 }}>{row.date}</TableCell>
                    <TableCell sx={{ color: 'white', py:1.3, px:2 }}>{row.status}</TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>

        {/* pagination fixed at bottom */}
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
        </Box>
      </Box>
    </div>
  )
}
