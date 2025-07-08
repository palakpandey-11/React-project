import React, { useState } from 'react';
import {
  Box,
  Typography,
  Breadcrumbs,
  Link,
  Select,
  MenuItem,
  TextField,
  IconButton,
  InputAdornment,
  Paper,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  TablePagination,
  TableSortLabel
} from '@mui/material';

import StarIcon from '@mui/icons-material/Star';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GroupIcon from '@mui/icons-material/Group';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import dayjs from 'dayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const AnalyticsHub = () => {
  const [payrollMonth, setPayrollMonth] = useState("Jul'25");
  const [employeeType, setEmployeeType] = useState('All');
  const [selectedCard, setSelectedCard] = useState('All Employee Info');
  const [searchTerm, setSearchTerm] = useState('');
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('id');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const cards = [
    'All Employee Info',
    'Confirmation Dues',
    'Recent New Joiners',
    'Total Experience Headcount',
    'Blood Group Details',
    'Basic Information',
    'Upcoming Birthdays',
  ];

  const employeeData = [
    {
      id: 'T0043',
      name: 'Rose Shah',
      doj: '12 Jun 2024',
      gender: 'Female',
      dob: '13 May 1980',
      email: 'Rose@greythr.com',
      status: 'Probation',
      confirmation: '05 Jul 2025',
    },
    {
      id: 'T0041',
      name: 'Daisy George',
      doj: '09 Jun 2024',
      gender: 'Female',
      dob: '13 Jun 1973',
      email: 'Daisy@greythr.com',
      status: 'Confirmed',
      confirmation: '30 Jun 2025',
    },
    {
      id: 'T0044',
      name: 'Appy Samson',
      doj: '01 May 2024',
      gender: 'Female',
      dob: '08 Jul 1975',
      email: 'Appy@greythr.com',
      status: 'Confirmed',
      confirmation: '30 Jun 2025',
    },
    {
      id: 'T0014',
      name: 'Lipika Jena',
      doj: '01 Sep 2021',
      gender: 'Female',
      dob: '28 May 1982',
      email: 'Lipikajena@greythr.com',
      status: 'Confirmed',
      confirmation: '30 Jun 2025',
    },
    {
      id: 'T0015',
      name: 'Balaji S K',
      doj: '04 Jun 2025',
      gender: 'Male',
      dob: '22 Jun 1977',
      email: 'Balaji@greythr.com',
      status: 'Probation',
      confirmation: '15 Jul 2025',
    },
  ];

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredData = employeeData.filter((emp) =>
    Object.values(emp).some(val =>
      val.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (orderBy === 'name' || orderBy === 'email' || orderBy === 'status') {
      return order === 'asc'
        ? a[orderBy].localeCompare(b[orderBy])
        : b[orderBy].localeCompare(a[orderBy]);
    }
    return 0;
  });

  return (
    <Box sx={{ p: 3, bgcolor: '#f9f9f9', minHeight: '100vh' }}>
      {/* Breadcrumb */}
      <Breadcrumbs sx={{ mb: 2 }}>
        <Link underline="hover" color="inherit" href="#">Home</Link>
        <Link underline="hover" color="inherit" href="#">Employee</Link>
        <Typography fontWeight={600}>Analytics Hub</Typography>
      </Breadcrumbs>

      {/* Filter Row */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', px: 2, borderRadius: 1, bgcolor: '#fff' }}>
          <CalendarMonthIcon sx={{ mr: 1, color: '#555' }} />
          <Select value={payrollMonth} onChange={(e) => setPayrollMonth(e.target.value)} variant="standard" disableUnderline>
            <MenuItem value="Jul'25">Jul'25</MenuItem>
            <MenuItem value="Jun'25">Jun'25</MenuItem>
          </Select>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', px: 2, borderRadius: 1, bgcolor: '#fff' }}>
          <GroupIcon sx={{ mr: 1, color: '#555' }} />
          <Select value={employeeType} onChange={(e) => setEmployeeType(e.target.value)} variant="standard" disableUnderline>
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Permanent">Permanent</MenuItem>
            <MenuItem value="Intern">Intern</MenuItem>
          </Select>
        </Box>
        <IconButton><RefreshIcon /></IconButton>
      </Box>

      {/* Cards */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 3 }}>
        {cards.map((card, i) => (
          <Box
            key={i}
            onClick={() => setSelectedCard(card)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              px: 2,
              py: 1,
              bgcolor: selectedCard === card ? '#e8f0fe' : 'white',
              border: selectedCard === card ? '1px solid #90caf9' : '1px solid #ddd',
              borderRadius: 2,
              cursor: 'pointer',
              minWidth: 200,
              transition: '0.3s',
            }}
          >
            <StarIcon fontSize="small" sx={{ color: card === 'Basic Information' ? '#ccc' : '#f9a825' }} />
            <Typography variant="body2" color="text.primary">{card}</Typography>
          </Box>
        ))}
      </Box>

      {/* Employee Info Section */}
      <Paper sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography fontWeight={600}>All Employee Info</Typography>
          <Button variant="contained">Add Employee</Button>
        </Box>

        {/* Search Input */}
        <TextField
          size="small"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            sx: {
              borderRadius: '50px',
              backgroundColor: '#f5f7fa',
              pl: 1
            }
          }}
          sx={{ mb: 2, width: 300 }}
        />

        {/* Table */}
        <TableContainer sx={{ borderRadius: '12px', border: '1px solid #e0e0e0', maxHeight: 440 }}>
          <Table stickyHeader size="small">
            <TableHead >
              <TableRow>
                {[
                  { id: 'id', label: 'Emp ID' },
                  { id: 'name', label: 'Emp Name' },
                  { id: 'doj', label: 'DOJ' },
                  { id: 'gender', label: 'Gender' },
                  { id: 'dob', label: 'DOB' },
                  { id: 'email', label: 'Email ID' },
                  { id: 'status', label: 'Status' },
                  { id: 'confirmation', label: 'Confirmation Date' }
                ].map((column) => (
                  <TableCell key={column.id} sortDirection={orderBy === column.id ? order : false}>
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : 'asc'}
                      onClick={() => handleRequestSort(column.id)}
                    >
                      {column.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((emp, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      backgroundColor: index % 2 === 0 ? '#fff' : '#f9f9f9',
                      '&:hover': { backgroundColor: '#eef5ff' },
                      borderBottom: '1px solid #eee',
                    }}
                  >
                    <TableCell>{emp.id}</TableCell>
                    <TableCell>
                      <Link href="#" underline="hover" sx={{ color: '#1a73e8', fontWeight: 500 }}>
                        {emp.name}
                      </Link>
                    </TableCell>
                    <TableCell>{emp.doj}</TableCell>
                    <TableCell>{emp.gender}</TableCell>
                    <TableCell>{emp.dob}</TableCell>
                    <TableCell>{emp.email}</TableCell>
                    <TableCell>{emp.status}</TableCell>
                    <TableCell>{emp.confirmation}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={sortedData.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Paper>
    </Box>
  );
};

export default AnalyticsHub;
