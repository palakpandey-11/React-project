// src/pages/PrepareLetterForm.js
import React from 'react';
import { Box, Typography, Select, MenuItem, TextField, Button, Paper } from '@mui/material';

const PrepLetter = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ border: '1px solid #cfd8dc', p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
          {/* Left Side Nav (General, Select Employee...) */}
          <Box sx={{ width: 250, mr: 3 }}>
            <Box sx={{ mb: 4 }}>
              <Typography fontWeight={600} color="#2196f3">1 General</Typography>
              <Typography color="#777" sx={{ mt: 2 }}>2 Select Employees</Typography>
              <Typography color="#777" sx={{ mt: 2 }}>3 Preview</Typography>
              <Typography color="#777" sx={{ mt: 2 }}>4 Publish/Download</Typography>
            </Box>

            <Box sx={{ bgcolor: '#f9f9f9', p: 2, borderRadius: 1 }}>
              <Typography fontWeight={600} sx={{ mb: 1 }}>Summary:</Typography>
              <Typography fontSize={14}>Letter Template</Typography>
              <Typography fontSize={14} sx={{ mb: 1 }}>-</Typography>
              <Typography fontSize={14}>Employee</Typography>
              <Typography fontSize={14} sx={{ mb: 1 }}>-</Typography>
              <Typography fontSize={14}>Signatory</Typography>
              <Typography fontSize={14}>-</Typography>
            </Box>
          </Box>

          {/* Right Side Form */}
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Box>
                <Typography>Letter Template<span style={{ color: 'red' }}> *</span></Typography>
                <Select fullWidth defaultValue="">
                  <MenuItem value="" disabled>Select</MenuItem>
                  <MenuItem value="address">Address Proof Letter</MenuItem>
                  <MenuItem value="appointment">Appointment Order</MenuItem>
                  <MenuItem value="confirm">Confirmation Letter</MenuItem>
                  <MenuItem value="experience">Experience Letter</MenuItem>
                </Select>
              </Box>

              <Box>
                <Typography>Serial No.</Typography>
                <TextField fullWidth />
              </Box>

              <Box>
                <Typography>Authorised Signatory</Typography>
                <Select fullWidth defaultValue="">
                  <MenuItem value="" disabled>Select</MenuItem>
                  <MenuItem value="sign1">Signatory 1</MenuItem>
                </Select>
              </Box>

              <Box>
                <Typography>Remarks</Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={6}
                  placeholder="Type your description...."
                />
              </Box>

              {/* Navigation Buttons */}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button variant="text">Cancel</Button>
                <Button variant="contained">Next</Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default PrepLetter;
