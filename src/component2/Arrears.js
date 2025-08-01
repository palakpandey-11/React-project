// src/component2/Arrears.js
import React, { useState } from 'react';
import Header from './Header';
import { useNavigate } from 'react-router-dom'
import { Navigate, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Breadcrumbs,
  Typography,
  Link as MuiLink,
  TextField,
  InputAdornment,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Paper
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

export default function Arrears() {
  // <-- your future data will go here
  const [rows /*, setRows*/] = useState([]);
const navigate = useNavigate();
const handlePay = () => { navigate('/arrears/payarrears') };
  // pagination
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;
  const handleChangePage = (e, newPage) => setPage(newPage);

  return (
    <>
      <Header/>
      {/* Breadcrumbs */}
      <Box sx={{ p: 2, bgcolor: 'rgba(10,20,40,0.7)' }}>
        <Breadcrumbs separator=">" sx={{ '& .MuiBreadcrumbs-separator': { color: 'rgba(255,255,255,0.5)' }}}>
          <MuiLink component={RouterLink} to="/" sx={{ color: 'rgba(255,255,255,0.7)' }}>
            Home
          </MuiLink>
          <MuiLink component={RouterLink} to="/updatepayroll" sx={{ color: 'rgba(255,255,255,0.7)' }}>
            Payroll
          </MuiLink>
          <Typography sx={{ color: 'rgba(255,255,255,0.5)' }}>
            Arrears
          </Typography>
        </Breadcrumbs>
      </Box>

      {/* Search + Pay Arrears */}
      <Box
        sx={{
          mx: 2,
          my: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <TextField
          placeholder="Search…"
          size="small"
          variant="outlined"
          sx={{
            flexGrow: 1,
            bgcolor: 'rgba(30,40,60,0.6)',
            input: { color: 'white' },
            '.MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.3)' },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.5)' },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#fff' }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'rgba(255,255,255,0.5)' }} />
              </InputAdornment>
            )
          }}
        />

        <Button
        onClick={handlePay}
          variant="outlined"
          startIcon={<AddIcon />}
          sx={{
            ml: 2,
            color: 'white',
            borderColor: 'white',
            '&:hover': { borderColor: 'rgba(255,255,255,0.8)' }
          }}
        >
          Pay Arrears
        </Button>
      </Box>

      {/* Table */}
      <TableContainer
        component={Paper}
        sx={{
          mx: 2,
          bgcolor: 'rgba(17,20,27,0.6)',
          backdropFilter: 'blur(8px)'
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {['#','Employee No','Employee Name','Payroll','Amount','Actions'].map(col => (
                <TableCell
                  key={col}
                  sx={{
                    bgcolor: 'rgba(30,40,60,0.8)',
                    color: 'white',
                    fontWeight: 'bold'
                  }}
                >
                  {col}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, idx) => (
                <TableRow key={row.id || idx} hover>
                  <TableCell sx={{ color: 'white' }}>{idx + 1 + page * rowsPerPage}</TableCell>
                  <TableCell sx={{ color: 'white' }}>{row.empNo}</TableCell>
                  <TableCell sx={{ color: 'white' }}>{row.name}</TableCell>
                  <TableCell sx={{ color: 'white' }}>{row.payroll}</TableCell>
                  <TableCell sx={{ color: 'white' }}>{row.amount}</TableCell>
                  <TableCell>
                    <Button size="small" variant="outlined" sx={{ color: 'white', borderColor: 'white' }}>
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={rows.length}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[rowsPerPage]}
          onPageChange={handleChangePage}
          sx={{
            bgcolor: 'rgba(30,40,60,0.8)',
            '.MuiTablePagination-toolbar': { color: 'white' }
          }}
        />
      </TableContainer>

      {/* Bottom Actions */}
      <Box
        sx={{
          mx: 2,
          my: 2,
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 1
        }}
      >
        <Button variant="contained" color="primary">
          Process
        </Button>
        <Button variant="contained" color="primary">
          Process All
        </Button>
      </Box>
    </>
  );
}
