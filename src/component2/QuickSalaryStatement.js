// src/component2/QuickSalaryStatement.js
import React, { useState, useMemo } from 'react';
import Header from './Header';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Breadcrumbs,
  Typography,
  Link as MuiLink,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  useTheme,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

const ROWS = [
  {
    id: 1,
    empNo: 'T0001',
    name: 'Nandish Shetty',
    conveyance: '1,600.00',
    allowance: '31,459.00',
    gross: '75,133.00',
    pf: '3,606.00',
    incomeTax: '0.00',
    profTax: '200.00',
    totalDeductions: '-3,806.00',
    netPay: '71,327.00',
  },
  {
    id: 2,
    empNo: 'T0010',
    name: 'Aarav Gandhi',
    conveyance: '1,600.00',
    allowance: '53,400.00',
    gross: '1,25,000.00',
    pf: '0.00',
    incomeTax: '7,812.00',
    profTax: '200.00',
    totalDeductions: '-8,012.00',
    netPay: '1,16,988.00',
  },
  {
    id: 3,
    empNo: 'T0013',
    name: 'Rita George',
    conveyance: '1,600.00',
    allowance: '15,856.00',
    gross: '39,673.00',
    pf: '0.00',
    incomeTax: '0.00',
    profTax: '200.00',
    totalDeductions: '-200.00',
    netPay: '39,473.00',
  },
  {
    id: 4,
    empNo: 'T0014',
    name: 'Lipika Jena',
    conveyance: '1,600.00',
    allowance: '61,650.00',
    gross: '1,43,750.00',
    pf: '6,900.00',
    incomeTax: '10,542.00',
    profTax: '1,250.00',
    totalDeductions: '-18,692.00',
    netPay: '1,25,058.00',
  },
  {
    id: 5,
    empNo: 'T0016',
    name: 'Madan Mohan',
    conveyance: '1,600.00',
    allowance: '51,992.00',
    gross: '1,21,800.00',
    pf: '5,846.00',
    incomeTax: '7,332.00',
    profTax: '200.00',
    totalDeductions: '-13,378.00',
    netPay: '1,08,422.00',
  },
  {
    id: 6,
    empNo: 'T0017',
    name: 'D Mohan Rao',
    conveyance: '1,600.00',
    allowance: '56,869.00',
    gross: '1,32,883.00',
    pf: '6,378.00',
    incomeTax: '8,995.00',
    profTax: '200.00',
    totalDeductions: '-15,573.00',
    netPay: '1,17,310.00',
  },
  {
    id: 7,
    empNo: 'T0019',
    name: 'Aadesh Sonar',
    conveyance: '1,600.00',
    allowance: '53,400.00',
    gross: '1,25,000.00',
    pf: '6,000.00',
    incomeTax: '7,812.00',
    profTax: '200.00',
    totalDeductions: '-14,012.00',
    netPay: '1,10,988.00',
  },
  {
    id: 8,
    empNo: 'T0022',
    name: 'P Harihara Rao',
    conveyance: '1,600.00',
    allowance: '81,197.00',
    gross: '1,88,175.00',
    pf: '9,032.00',
    incomeTax: '20,481.00',
    profTax: '200.00',
    totalDeductions: '-29,713.00',
    netPay: '1,58,462.00',
  },
  {
    id: 9,
    empNo: 'T0023',
    name: 'A Kalyan Kumar',
    conveyance: '1,600.00',
    allowance: '12,345.00',
    gross: '35,000.00',
    pf: '2,100.00',
    incomeTax: '3,000.00',
    profTax: '200.00',
    totalDeductions: '-5,300.00',
    netPay: '29,700.00',
  },
  // …add more rows later as needed
];

export default function QuickSalaryStatement() {
  const theme = useTheme();

  const [category, setCategory] = useState('All');
  const [status, setStatus]   = useState('All');
  const [filterEmp, setFilterEmp] = useState('All');

  // stub filtering logic
  const rows = useMemo(() => ROWS, [category, status, filterEmp]);

  const columns = [
    { field: 'id', headerName: '#', width: 60 },
    { field: 'empNo', headerName: 'EMPLOYEE NO', width: 130 },
    { field: 'name', headerName: 'NAME', width: 180 },
    { field: 'conveyance', headerName: 'CONVEYANCE', width: 120 },
    { field: 'allowance', headerName: 'SPECIAL ALLOWANCE', width: 160 },
    { field: 'gross', headerName: 'GROSS', width: 120 },
    { field: 'pf', headerName: 'PF', width: 100 },
    { field: 'incomeTax', headerName: 'INCOME TAX', width: 120 },
    { field: 'profTax', headerName: 'PROF TAX', width: 120 },
    { field: 'totalDeductions', headerName: 'TOTAL DEDUCTIONS', width: 160 },
    { field: 'netPay', headerName: 'NET PAY', width: 120 },
  ];

  return (
    <>
      <Header />

      {/* Breadcrumbs */}
      <Box sx={{ p: 2, bgcolor: 'rgba(10,20,40,0.7)' }}>
        <Breadcrumbs separator=">" sx={{ '& .MuiBreadcrumbs-separator': { color: 'rgba(255,255,255,0.5)' } }}>
          <MuiLink component={RouterLink} to="/" sx={{ color: 'rgba(255,255,255,0.7)' }}>
            Home
          </MuiLink>
          <MuiLink component={RouterLink} to="/updatepayroll" sx={{ color: 'rgba(255,255,255,0.7)' }}>
            Payroll
          </MuiLink>
          <Typography sx={{ color: 'rgba(255,255,255,0.5)' }}>
            Quick Salary Statement
          </Typography>
        </Breadcrumbs>
      </Box>

      {/* Filters + Export */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: 2,
          p:2,
          bgcolor: 'rgba(10,20,40,0.7)',
        }}
      >
        <FormControl size="small">
          <InputLabel  sx={{color: 'rgba(255,255,255,0.7)'}}>Category</InputLabel>
          <Select
            value={category}
            label="Category"
            onChange={e => setCategory(e.target.value)}
            sx={{ width:140,
                        bgcolor:'rgba(255,255,255,0.1)',
                        color:'white',
                        '& .MuiOutlinedInput-notchedOutline':{ borderColor:'rgba(255,255,255,0.3)' }
                      }}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="A">A</MenuItem>
            <MenuItem value="B">B</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small">
          <InputLabel sx={{color: 'rgba(255,255,255,0.7)'}}>Employment Status</InputLabel>
          <Select
            value={status}
            label="Employment Status"
            onChange={e => setStatus(e.target.value)}
            sx={{ width:180,
                        bgcolor:'rgba(255,255,255,0.1)',
                        color:'white',
                        '& .MuiOutlinedInput-notchedOutline':{ borderColor:'rgba(255,255,255,0.3)' }
                      }}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Current">Current</MenuItem>
            <MenuItem value="Resigned">Resigned</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small">
          <InputLabel  sx={{color: 'rgba(255,255,255,0.7)'}}>Employee Filter</InputLabel>
          <Select
            value={filterEmp}
            label="Employee Filter"
            onChange={e => setFilterEmp(e.target.value)}
            sx={{ width:160,
                        bgcolor:'rgba(255,255,255,0.1)',
                        color:'white',
                        '& .MuiOutlinedInput-notchedOutline':{ borderColor:'rgba(255,255,255,0.3)' }
                      }}
          >
            <MenuItem value="All">All</MenuItem>
            {ROWS.map(r => (
              <MenuItem key={r.empNo} value={r.empNo}>
                {r.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box sx={{ flexGrow: 1 }} />

        <Button variant="outlined" startIcon={<FileDownloadIcon />}>
          Export to Excel
        </Button>
      </Box>

      {/* Paginated Table */}
      <Box sx={{height: 470, px: 2, py: 1,
          overflow: 'hidden',  // hide any outer scroll
      }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          sx={{
            bgcolor: 'rgba(33, 39, 70, 0.38)',
            color: 'black',
            border: 'none',

            // header bar
            '& .MuiDataGrid-columnHeaders': {
              bgcolor: 'rgba(92, 92, 92, 0.9)',
              color: 'white',
            },
            // cells
            '& .MuiDataGrid-cell': {
              color: 'grey',
            },
            // zebra striping (alternate rows)
            '& .MuiDataGrid-row:hover': {
               bgcolor: 'rgba(255,255,255,0.1)',   
            },
            '& .MuiDataGrid-row:nth-of-type(even)': {
                 bgcolor: 'rgba(255,255,255,0.02)', 
            },
            // scroller bg
            '& .MuiDataGrid-virtualScroller': {
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
            // footer (pagination)
            '& .MuiDataGrid-footerContainer': {
              bgcolor: 'rgba(110, 108, 108, 0.57)',
              color: 'black',
            },
          }}
        />
      </Box>
    </>
  );
}
