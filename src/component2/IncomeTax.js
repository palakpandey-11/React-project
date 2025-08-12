// src/component2/IncomeTax.js
import React, { useState, useMemo } from 'react';
import Header from './Header';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Breadcrumbs,
  Typography,
  Autocomplete,
  TextField,
  InputAdornment,
  Paper,
  IconButton,
  Tabs,
  Tab,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
   TablePagination,
   useTheme,
  useMediaQuery,
  Button
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import MuiLink from '@mui/material/Link';

const EMPLOYEES = [
  {
    id: 'T0018',
    name: 'Pranali',
    joinDate: '10 May 2020',
    dob: '26 july 2003',
    gender: 'Female',
    location: 'Pune',
    leavingDate: '-'
  },
   {
    id: 'T0019',
    name: 'Palak',
    joinDate: '10 April 2015',
    dob: '25 june 2001',
    gender: 'Female',
    location: 'Mumbai',
    leavingDate: '-'
  },
   {
    id: 'T0020',
    name:'Om',
    joinDate: '10 May 2013',
    dob: '20 Nov 1986',
    gender: 'Male',
    location: 'Ahembdabadh',
    leavingDate: '25 july 2025'
  },
  // …other employees…
];

// dummy tax components
const TAX_COMPONENTS = [
  { component: 'SPECIAL ALLOWANCE', total: 382184, Apr: 3669, May: 0, Jun: 1526, Jul: 0, Aug:0, Sep:0, Oct:0, Nov:0, Dec:0, Jan:0, Feb:0, Mar:0 },
  { component: 'PF',               total: 46060,  Apr: 44220,  May: 0, Jun: 1840,  Jul: 0, Aug:0, Sep:0, Oct:0, Nov:0, Dec:0, Jan:0, Feb:0, Mar:0 },
  { component: 'INCOME TAX',       total: 36080,  Apr: 3225,  May: 0, Jun: 3833,  Jul: 0, Aug:0, Sep:0, Oct:0, Nov:0, Dec:0, Jan:0, Feb:0, Mar:0 },
  { component: 'PROF TAX',       total: 36080,  Apr: 3224,  May: 0, Jun: 3833,  Jul: 0, Aug:0, Sep:0, Oct:0, Nov:0, Dec:0, Jan:0, Feb:0, Mar:0 },
  { component: 'RAW TAX MONTHLY WITH PREV EMP',       total: 36080,  Apr: 3224,  May: 0, Jun: 3833,  Jul: 0, Aug:0, Sep:0, Oct:0, Nov:0, Dec:0, Jan:0, Feb:0, Mar:0 },
  { component: 'UNCLAIMED SALARY',       total: 36080,  Apr: 3224,  May: 0, Jun: 3833,  Jul: 0, Aug:0, Sep:0, Oct:0, Nov:0, Dec:0, Jan:0, Feb:0, Mar:0 },
  { component: 'INCOME TAX',       total: 36080,  Apr: 3224,  May: 0, Jun: 3833,  Jul: 0, Aug:0, Sep:0, Oct:0, Nov:0, Dec:0, Jan:0, Feb:0, Mar:0 },
  { component: 'INCOME TAX',       total: 36080,  Apr: 3227,  May: 0, Jun: 3833,  Jul: 0, Aug:0, Sep:0, Oct:0, Nov:0, Dec:0, Jan:0, Feb:0, Mar:0 },
  { component: 'INCOME TAX',       total: 36080,  Apr: 3247,  May: 0, Jun: 3833,  Jul: 0, Aug:0, Sep:0, Oct:0, Nov:0, Dec:0, Jan:0, Feb:0, Mar:0 },
  // …etc…
];

export default function IncomeTax() {
  const [employee, setEmployee] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);
  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

    // Paginated slice of your dummy data
  const paginatedRows = TAX_COMPONENTS.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const processedOn = useMemo(() => {
    const now = new Date();
    return `Today at ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  }, []);

  return (
    <>
      <Header/>

      {/* Breadcrumbs */}
      <Box sx={{ p: 2, bgcolor: 'rgba(10,20,40,0.7)', overflow:'hidden'}}>
        <Breadcrumbs separator=">" sx={{ '& .MuiBreadcrumbs-separator': { color: 'rgba(255,255,255,0.5)' } }}>
          <MuiLink component={RouterLink} to="/welcome" sx={{ color:'rgba(255,255,255,0.7)' }}>Home</MuiLink>
          <MuiLink component={RouterLink} to="/updatepayroll" sx={{ color:'rgba(255,255,255,0.7)' }}>Payroll</MuiLink>
          <Typography sx={{ color:'rgba(255,255,255,0.5)' }}>Income Tax</Typography>
        </Breadcrumbs>
      </Box>

<Box sx={{maxWidth: 1200,     // or whatever max width you prefer
    width: '100%',
    mx: 'auto',         // center horizontally
   // px: { xs: 2, md: 3 }, // small side padding on mobile
    mt: 1,
    overflow:'hidden'}}>
      {/* Search bar */}
      {!employee && (
        <Box
          sx={{
           my: 2, p: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            bgcolor: 'rgba(30,40,60,0.6)',
            backdropFilter: 'blur(8px)',
            borderRadius: 2,
            overflow:'hidden'
          }}
        >
          <IconButton sx={{ color: 'rgba(255,255,255,0.7)' }}>
            <PersonIcon fontSize="large" />
          </IconButton>
          <Autocomplete
            fullWidth
            options={EMPLOYEES}
            getOptionLabel={o => `${o.name} — #${o.id}`}
            onChange={(_, val) => setEmployee(val)}
            renderInput={params => (
              <TextField
                {...params}
                placeholder="Select an employee…"
                size="small"
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: 'rgba(255,255,255,0.7)' }} />
                    </InputAdornment>
                  ),
                  sx: {
                    bgcolor: 'rgba(0,0,0,0.5)',
                    color: 'white',
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.3)' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.5)' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#fff' }
                  }
                }}
              />
            )}
            PaperComponent={props => (
              <Paper
                {...props}
                sx={{
                  bgcolor: 'rgba(30,40,60,0.9)',
                  color: 'white'
                }}
              />
            )}
          />
        </Box>
      )}

      {/* Employee header + tabs + content */}
      {employee && (
        <Box sx={{ mx:2, mb:4, display:'flex', flexDirection:'column', overflow:'hidden',}}>
          {/* Employee info bar */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: { xs: 'flex-start', md: 'center' },
               justifyContent: 'space-between',
              p:1.5,
              bgcolor: 'rgba(255,255,255,0.1)',
              borderRadius: 1,
              backdropFilter: 'blur(4px)',
              gap:2
            }}
          >
            <Box sx={{ display:'flex', alignItems:'center', gap:2 }}>
              <PersonIcon sx={{ fontSize: 40, color:'rgba(255,255,255,0.7)' }} />
              <Box>
                <Typography sx={{ color:'white', fontWeight:600 }}>{employee.name}</Typography>
                <Typography sx={{ color:'rgba(255,255,255,0.7)' }}>#{employee.id}</Typography>
              </Box>
            </Box>
            <Box sx={{ display:'flex', gap:4, color:'common.white', fontSize:'0.875rem' }}>
              <Box>
                <Typography variant="caption" sx={{ color:'rgba(255,255,255,0.6)' }}>Join Date</Typography>
                <Typography>{employee.joinDate}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color:'rgba(255,255,255,0.6)' }}>Date of Birth</Typography>
                <Typography>{employee.dob}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color:'rgba(255,255,255,0.6)' }}>Gender</Typography>
                <Typography>{employee.gender}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color:'rgba(255,255,255,0.6)' }}>Location</Typography>
                <Typography>{employee.location}</Typography>
              </Box>
              {/* <Box>
                <Typography variant="caption" sx={{ color:'rgba(255,255,255,0.6)' }}>Leaving Date</Typography>
                <Typography>{employee.leavingDate}</Typography>
              </Box> */}
              <Box>
                <Typography variant="caption" sx={{ color:'rgba(255,255,255,0.6)' }}>Income Tax Processed On</Typography>
                <Typography sx={{ fontWeight:600 }}>{processedOn}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color:'rgba(255,255,255,0.6)' }}>Tax Regime</Typography>
                <Typography sx={{ color:'#4caf50', fontWeight:600 }}>New Tax Regime</Typography>
              </Box>
            </Box>
          </Box>

          {/* Tabs */}
          <Paper
            square
            sx={{
                mt:2,
              bgcolor: 'rgba(17, 20, 27, 0.6)',
              backdropFilter: 'blur(8px)',
              borderRadius: 1
            }}
          >
            <Tabs
              value={tabIndex ?? 0}
              onChange={(_, v) => setTabIndex(v)}
              variant="scrollable"
              scrollButtons="auto"
              sx={{ 
                '& .MuiTab-root': { color:'rgba(255,255,255,0.7)' },
                '& .Mui-selected': { color:'#fff' }
              }}
            >
              <Tab label="Income" />
              <Tab label="Income From Previous Employer" />
              <Tab label="Exemptions" />
              <Tab label="Perquisite" />
              <Tab label="Deductions" />
              <Tab label="Others" />
              <Tab label="House Property Income" />
              <Tab label="Regime" />
              <Tab label="Result" />
            </Tabs>
          </Paper>

          {/* Income tab panel */}
          {tabIndex === 0 && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
            Tax Related Components
          </Typography>

          {/* Horizontal scroll wrapper for mobile */}
          <Box
            sx={{
              overflowX: isMobile ? 'auto' : 'visible',
              width: '100%',
            }}
          >
            <TableContainer
              component={Paper}
              sx={{
                bgcolor: 'rgba(198,194,194,0.2)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                maxWidth:'100%',
              }}
            >
              <Table size="small"
              sx={{
                tableLayout:'fixed',
                minWidth:'700px',
                 '& th, & td': {
                  px:1,
                  py:0.5,
                  overflow:'hidden',
                  textOverflow:'ellipsis',
                  whiteSpace:'nowrap',
                 }
              }}
              >
                <TableHead>
                  <TableRow>
                    {[
                        {label:'Component', width:200},
                        {label:'Total', width:80},
                        { label: 'Apr',       width:  50 },
                        { label: 'May',       width:  50 },
                        { label: 'June',       width: 50 },
                        { label: 'July',       width: 50 },
                        { label: 'Aug',       width:  50 },
                        { label: 'Sep',       width:  50 },
                        { label: 'Oct',       width:  50 },
                        { label: 'Nov',       width:  50 },
                        { label: 'Dec',       width:  50 },
                        { label: 'Jan',       width:  50 },
                        { label: 'Feb',       width:  50 },
                        { label: 'Mar',       width:  50 },
                    ].map(({ label, width }) => (
                     <TableCell key={label}
                     sx={{
                          bgcolor: 'rgba(22,29,43,1)',
                          color:'white',
                          width,
                         }}
                     >
                        {label}
                     </TableCell>
                    ))}
                        
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedRows.map((row, i) => (
                    <TableRow key={i} hover>
                      <TableCell
                        sx={{
                          color: 'white',
                          bgcolor: i % 2
                            ? 'rgba(255,255,255,0.02)'
                            : 'transparent',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {row.component}
                      </TableCell>
                      {[
                        'total',
                        'Apr',
                        'May',
                        'Jun',
                        'Jul',
                        'Aug',
                        'Sep',
                        'Oct',
                        'Nov',
                        'Dec',
                        'Jan',
                        'Feb',
                        'Mar',
                      ].map((key) => (
                        <TableCell
                          key={key}
                          sx={{
                            color: 'white',
                            bgcolor: i % 2
                              ? 'rgba(255,255,255,0.02)'
                              : 'transparent',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {row[key]}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          {/* Pagination controls */}
          <TablePagination
            component="div"
            count={TAX_COMPONENTS.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
            sx={{
              '& .MuiTablePagination-toolbar': {
                color: 'white',
                bgcolor: 'rgba(22,29,43,1)',
              },
            }}
          />

              {/* Bottom actions */}
              <Box sx={{ mt:1, display:'flex', justifyContent:'flex-end', gap:1 }}>
                <Button component={RouterLink} to="/salary" variant="contained">
                  Back To Salary
                </Button>
                <Button variant="outlined" color="primary">
                  Preview
                </Button>
                <Button variant="outlined" color="primary">
                  Download
                </Button>
                <Button variant="contained" color="primary">
                  Recalculate
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      )}
      </Box>
    </>
  );
}
