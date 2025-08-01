// src/component2/FinalSettlement.js
import React, { useState } from 'react';
import Header from './Header';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Breadcrumbs,
  Link as MuiLink,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Stack
} from '@mui/material';

export default function FinalSettlement() {
  // dummy state – swap these out for your real data/hooks
  const [filterMonth, setFilterMonth]     = useState("Jul 2025");
  const [filterEmployee, setFilterEmployee] = useState("All");
  const rows = []; // future settlement data
  const navigate = useNavigate()
  const handlePay=()=>{ navigate('/finalsettlement/settleEmployee') }

  return (
    <>
      <Header />

      {/* Breadcrumbs */}
      <Box sx={{ p: 2, bgcolor: 'rgba(10,20,40,0.7)' }}>
        <Breadcrumbs separator=">">
          <MuiLink component={RouterLink} to="/" sx={{ color: 'rgba(255,255,255,0.7)' }}>
            Home
          </MuiLink>
          <MuiLink component={RouterLink} to="/updatepayroll" sx={{ color: 'rgba(255,255,255,0.7)' }}>
            Payroll
          </MuiLink>
          <Typography sx={{ color: 'rgba(255,255,255,0.5)' }}>
            Final Settlement
          </Typography>
        </Breadcrumbs>
      </Box>

      {/* Top controls */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 2,
          px: 2,
          py: 1
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <FormControl size="small"  sx={{
      '& .MuiInputLabel-root': {
        color: 'rgba(255,255,255,0.8)',       // label color
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'rgba(255,255,255,0.6)',
        },
        '&:hover fieldset': {
          borderColor: 'white',
        },
      },
      '& .MuiSelect-select': {
        color: 'white',                       // selected text color
      },
      '& .MuiSvgIcon-root': {
        color: 'white',                       // dropdown arrow
      },
    }} >
            <InputLabel>Filter</InputLabel>
            <Select
              value={filterMonth}
              label="Filter"
              onChange={e => setFilterMonth(e.target.value)}
               sx={{
        color: 'white',
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: 'rgba(255,255,255,0.6)',
        },
      }}
            >
              <MenuItem value="Jul 2025">Jul 2025</MenuItem>
              <MenuItem value="Jun 2025">Jun 2025</MenuItem>
              {/* …other months… */}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{
      '& .MuiInputLabel-root': {
        color: 'rgba(255,255,255,0.8)',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'rgba(255,255,255,0.6)',
        },
        '&:hover fieldset': {
          borderColor: 'white',
        },
      },
      '& .MuiSelect-select': {
        color: 'white',
      },
      '& .MuiSvgIcon-root': {
        color: 'white',
      },
    }}>
            <InputLabel>Employee</InputLabel>
            <Select
              value={filterEmployee}
              label="Employee"
              onChange={e => setFilterEmployee(e.target.value)}
              sx={{
        color: 'white',
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: 'rgba(255,255,255,0.6)',
        },
      }}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Current">Current</MenuItem>
              <MenuItem value="Resigned">Resigned</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        <Button onClick={handlePay}
         variant="contained">
          Settle Employee
        </Button>
      </Box>

      {/* Settlement table */}
      <TableContainer
        component={Paper}
        sx={{
          mx: 2,
          mt: 1,
          mb: 4,
          bgcolor: 'rgba(226, 223, 223, 0.14)',
          boxShadow: 'none'
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow sx={{ "& .MuiTableCell-stickyHeader": {
      backgroundColor: "rgb(0, 0, 0)",  // your translucent blue
      color: "white",   }}} >
              {[
                '#',
                'Payout Month',
                'Serial No',
                'Emp ID',
                'Employee Name',
                'Leaving Date',
                'Settlement Date',
                'Net Pay',
                'Processed On',
                'Lock / Unlock'
              ].map(col => (
                <TableCell key={col} sx={{ color: 'rgba(255, 241, 241, 0.7)', bgcolor: 'rgba(0,0,0,0)' }}>
                  {col}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} align="center" sx={{ py: 4, color: 'rgba(255,255,255,0.5)' }}>
                  No settlement records to display.
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row, idx) => (
                <TableRow key={idx} hover>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{row.payoutMonth}</TableCell>
                  <TableCell>{row.serialNo}</TableCell>
                  <TableCell>{row.empId}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.leavingDate}</TableCell>
                  <TableCell>{row.settlementDate}</TableCell>
                  <TableCell>{row.netPay}</TableCell>
                  <TableCell>{row.processedOn}</TableCell>
                  <TableCell>
                    {/* e.g. a lock/unlock toggle */}
                    {row.locked ? '🔒' : '🔓'}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
