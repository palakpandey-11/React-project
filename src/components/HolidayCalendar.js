import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  Table, TableHead, TableBody, TableRow, TableCell,
  Paper, TableContainer, Select, MenuItem,
  InputLabel, FormControl, Button, Typography, Box
} from '@mui/material';

const holidays = {
  'ind-blr': [
    { date: '01-01-2024', day: 'Monday', type: 'Annual Holiday', occasion: 'New Year' },
    { date: '26-01-2024', day: 'Friday', type: 'Annual Holiday', occasion: 'Republic Day' },
    { date: '25-03-2024', day: 'Monday', type: 'Restricted Holiday', occasion: 'Holi' },
    { date: '29-03-2024', day: 'Friday', type: 'Restricted Holiday', occasion: 'Good Friday' },
    { date: '09-04-2024', day: 'Tuesday', type: 'Restricted Holiday', occasion: 'Ugadi' },
    { date: '11-04-2024', day: 'Thursday', type: 'Restricted Holiday', occasion: 'Idul Fitr' },
    { date: '01-05-2024', day: 'Wednesday', type: 'Annual Holiday', occasion: 'Labour Day' },
    { date: '17-06-2024', day: 'Monday', type: 'Restricted Holiday', occasion: 'Bakrid/Eid al Adha' },
    { date: '15-08-2024', day: 'Thursday', type: 'Annual Holiday', occasion: 'Independence Day' },
    { date: '02-10-2024', day: 'Wednesday', type: 'Annual Holiday', occasion: 'Gandhi Jayanti' },
    { date: '11-10-2024', day: 'Friday', type: 'Restricted Holiday', occasion: 'Maha Navami' },
    { date: '31-10-2024', day: 'Thursday', type: 'Annual Holiday', occasion: 'Deepavali Holiday' },
  ],
  'usa-ny': [
    { date: '01-01-2024', day: 'Monday', type: 'Federal Holiday', occasion: 'New Year' },
    { date: '19-06-2024', day: 'Wednesday', type: 'Federal Holiday', occasion: 'Juneteenth National Independence Day' },
    { date: '04-07-2024', day: 'Thursday', type: 'Federal Holiday', occasion: 'Independence Day' },
    { date: '28-11-2024', day: 'Thursday', type: 'Federal Holiday', occasion: 'Thanksgiving Day' },
    { date: '11-11-2024', day: 'Wednesday', type: 'Federal Holiday', occasion: 'Veterans Day' },
    { date: '25-12-2024', day: 'Wednesday', type: 'Federal Holiday', occasion: 'Christmas Day' },
    
  ],
  'uk-ldn': [
    { date: '01-01-2024', day: 'Monday', type: 'Bank Holiday', occasion: 'New Year' },
    { date: '29-03-2024', day: 'Friday', type: 'Bank Holiday', occasion: 'Good Friday' },
    { date: '01-04-2024', day: 'Monday', type: 'Bank Holiday', occasion: 'Easter Monday' },
    { date: '25-09-2024', day: 'Wednesday', type: 'Bank Holiday', occasion: 'Summer bank holiday' },
    { date: '25-12-2024', day: 'Wednesday', type: 'Bank Holiday', occasion: 'Christmas Day' },
    { date: '26-12-2024', day: 'Friday', type: 'Bank Holiday', occasion: 'Boxing Day' },
  ]
};

function HolidayCalendar() {
  const [location, setLocation] = useState('ind-blr');
  const navigate = useNavigate();

  const theme = createTheme();

  const handleExport = () => {
    const selected = holidays[location];
    const csvContent = "data:text/csv;charset=utf-8,"
      + ["Date,Day,Type,Occasion", ...selected.map(h => `${h.date},${h.day},${h.type},${h.occasion}`)].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "holiday_calendar_2024_" + location + ".csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClose = () => {
    navigate("/timesheettable");
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          backgroundColor: 'background.paper',
          p: { xs: 2, sm: 3 },
          // borderRadius: 2,
          width: { xs: '95%', sm: '100%' },
          maxWidth: '1600px',
          margin: '10px auto',
          overflow: 'hidden',
          boxShadow: 4,
        }}
      >
        {/* Header with Title only */}
        <Box
          sx={{
            // display: 'flex',
            // flexDirection: { xs: 'column', sm: 'row' },
            // justifyContent: 'space-between',
            // alignItems: { xs: 'flex-start', sm: 'center' },
            mb: 2,
            gap: 1
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 'bold',textAlign: 'center',width: '100%' }}>Holiday Calendar 2024</Typography>
        </Box>

        {/* Table */}
        <TableContainer component={Paper} sx={{ maxHeight: 500, overflowX: 'auto' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ backgroundColor: '#1976d2', color: 'white' }}><strong>Holiday Date</strong></TableCell>
                <TableCell sx={{ backgroundColor: '#1976d2', color: 'white' }}><strong>Holiday Day</strong></TableCell>
                <TableCell sx={{ backgroundColor: '#1976d2', color: 'white' }}><strong>Holiday Type</strong></TableCell>
                <TableCell sx={{ backgroundColor: '#1976d2', color: 'white' }}><strong>Occasion</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {holidays[location].map((holiday, index) => (
                <TableRow key={index}>
                  <TableCell>{holiday.date}</TableCell>
                  <TableCell>{holiday.day}</TableCell>
                  <TableCell>{holiday.type}</TableCell>
                  <TableCell>{holiday.occasion}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Controls */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            flexWrap: 'wrap',
            gap: 2,
            alignItems: 'center',
            justifyContent: 'flex-start',
            mt: 2,
          }}
        >
          <FormControl size="small" sx={{ minWidth: 100, marginLeft: 'auto' }}>
            <InputLabel id="location-label">Location</InputLabel>
            <Select
              labelId="location-label"
              id="location"
              value={location}
              label="Location"
              onChange={(e) => setLocation(e.target.value)}
            >
              <MenuItem value="ind-blr">IND-BLR</MenuItem>
              <MenuItem value="usa-ny">USA-NY</MenuItem>
              <MenuItem value="uk-ldn">UK-LDN</MenuItem>
            </Select>
          </FormControl>

          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'row', sm: 'row' },
              gap: 2,
              width: '100%',
              maxWidth: '200px'
            }}
          >
            <Button fullWidth variant="contained" color="primary" onClick={handleExport}>
              EXPORT
            </Button>
            <Button fullWidth variant="outlined" color="error" onClick={handleClose}>
              CLOSE
            </Button>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default HolidayCalendar;
