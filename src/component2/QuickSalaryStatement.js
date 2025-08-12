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
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Paper,
  useTheme,
  useMediaQuery
} from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

const ROWS = [  {
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
 ];

export default function QuickSalaryStatement() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // filters
  const [category, setCategory]   = useState('All');
  const [status, setStatus]       = useState('All');
  const [filterEmp, setFilterEmp] = useState('All');

  // pagination
  const [page, setPage]         = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = e => {
    setRowsPerPage(+e.target.value);
    setPage(0);
  };

  // apply (stub) filtering
  const rows = useMemo(() => ROWS, [category, status, filterEmp]);

  return (
    <>
      <Header/>

      {/* Breadcrumbs */}
      <Box sx={{ p:2, bgcolor:'rgba(10,20,40,0.7)' }}>
        <Breadcrumbs separator=">">
          <MuiLink component={RouterLink} to="/welcome" sx={{ color:'rgba(255,255,255,0.7)' }}>Home</MuiLink>
          <MuiLink component={RouterLink} to="/updatepayroll" sx={{ color:'rgba(255,255,255,0.7)' }}>Payroll</MuiLink>
          <Typography sx={{ color:'rgba(255,255,255,0.5)' }}>Quick Salary Statement</Typography>
        </Breadcrumbs>
      </Box>
<Box
        sx={{
          maxWidth: 1400,
          width: '100%',
          mx: 'auto',
          px: 2,
          my: 2,
        }}>
      {/* Centered container */}
      <Box sx={{
        maxWidth: 1000,
        width: '100%',
        mx: 'auto',
        px: 2,
        pt: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }}>
        {/* Filters + Export */}
        <Box sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: 2,
        }}>
          {[
            { label: 'Category',       value: category,   onChange: setCategory,   width: 120 },
            { label: 'Employment Status', value: status,   onChange: setStatus,     width: 140 },
            { label: 'Employee Filter',   value: filterEmp, onChange: setFilterEmp, width: 140 },
          ].map(({ label, value, onChange, width }) => (
            <FormControl key={label} size="small" sx={{
              width,
              bgcolor:'rgba(255,255,255,0.1)',
              '& .MuiOutlinedInput-notchedOutline': { borderColor:'rgba(255,255,255,0.3)' },
              '& .MuiSelect-root': { color:'white' },
              '& .MuiSvgIcon-root': { color:'white' }
            }}>
              <InputLabel sx={{ color:'rgba(255,255,255,0.7)' }}>{label}</InputLabel>
              <Select
                value={value}
                label={label}
                onChange={e => onChange(e.target.value)}
              >
                <MenuItem value="All">All</MenuItem>
                {/* Add your real options here */}
              </Select>
            </FormControl>
          ))}

          <Box sx={{ flexGrow: 1 }} />

          <Button
            variant="outlined"
            startIcon={<FileDownloadIcon />}
            sx={{
              whiteSpace: 'nowrap',
              borderColor: 'rgba(255,255,255,0.7)',
              color: 'rgba(255,255,255,0.7)',
              '&:hover': { borderColor: 'white', color: 'white' }
            }}
          >
            Export to Excel
          </Button>
        </Box>

        {/* Table */}
        <Box sx={{
          width: '100%',
          height:'340px',
          display:'flex',
          justifyContent:'center',
          overflowX: isMobile ? 'auto' : 'visible'
        }}>
          <TableContainer component={Paper} sx={{ boxShadow:'none', bgcolor: 'rgba(77, 76, 76, 0.42)', mx:'auto', minWidth:800, width:'auto', maxWidth:1000 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  {['#','EMPLOYEE NO','NAME','CONVEYANCE','SPECIAL ALLOWANCE','GROSS','PF','INCOME TAX','PROF TAX','TOTAL DEDUCTIONS','NET PAY']
                    .map(col => (
                      <TableCell
                        key={col}
                        sx={{
                          bgcolor: 'rgba(0, 0, 0, 1)',
                          color: 'white',
                          whiteSpace: 'nowrap',
                          py:2
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
                  .map((row,i) => (
                    <TableRow key={row.id || i} hover >
             
                      <TableCell sx={{ color:'white' }}>{i + 1 + page*rowsPerPage}</TableCell>
                      <TableCell sx={{ color:'white' }}>{row.empNo}</TableCell>
                      <TableCell sx={{ color:'white' }}>{row.name}</TableCell>
                      <TableCell sx={{ color:'white' }}>{row.conveyance}</TableCell>
                      <TableCell sx={{ color:'white' }}>{row.allowance}</TableCell>
                      <TableCell sx={{ color:'white' }}>{row.gross}</TableCell>
                      <TableCell sx={{ color:'white' }}>{row.pf}</TableCell>
                      <TableCell sx={{ color:'white' }}>{row.incomeTax}</TableCell>
                      <TableCell sx={{ color:'white' }}>{row.profTax}</TableCell>
                      <TableCell sx={{ color:'white' }}>{row.totalDeductions}</TableCell>
                      <TableCell sx={{ color:'white' }}>{row.netPay}</TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
{/* <Box sx={{
     display: 'flex',
     justifyContent: 'center',
     width: '100%',
   }} */}

        {/* Pagination */}
        <TablePagination
          component="div"
          count={rows.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5,10,20]}
         
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
    </>
  );
}
