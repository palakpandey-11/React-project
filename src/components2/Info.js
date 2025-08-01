import React from 'react';
import { Box, Typography, Grid, Paper,TextField,Button, IconButton, Accordion, AccordionSummary, AccordionDetails, Divider } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Info = () => {
  const renderField = (label, value = '-') => (
    <Grid item xs={12} sm={6} md={3}>
      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.85)' }}>{label}</Typography>
      <Typography variant="body2" sx={{ fontWeight: 500 }}>{value}</Typography>
    </Grid>
  );

  const Section = ({ title, children, color = '#2196f3' }) => (
    <Paper sx={{ p: 2, mb: 1,borderRadius: 1,bgcolor: 'rgba(255, 255, 255, 0.1)',backdropFilter: 'blur(8px)',color:'white' }} elevation={0}>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="subtitle1" fontWeight={600} sx={{ borderLeft: `4px solid ${color}`, pl: 1 }}>{title}</Typography>
        <IconButton size="small" sx={{ color: 'white' }}><EditIcon fontSize="small" /></IconButton>
      </Box>
      <Grid container spacing={2}>{children}</Grid>
    </Paper>
  );

  return (
    <Box p={2} >
      {/* Profile Header */}
      <Paper sx={{ background: 'linear-gradient(to right, #162324ff, #61d1c4)', p: 2,mb:1, color: 'white' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center" gap={2}>
            <Box
              sx={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                backgroundColor: 'white',
                color: '#2196f3',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: 24,
              }}
            >
              P
            </Box>
            <Box>
              <Typography variant="h6">Palak</Typography>
              <Typography variant="body2">#12345</Typography>
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* Sections */}
      <Section title="Employee Information">
        {renderField('Title')}
        {renderField('Nick Name')}
        {renderField('Gender')}
        {renderField('Name', 'Palak')}
        {renderField('Employee Login Username')}
        {renderField('Mobile')}
        {renderField('Email', 'palak@123')}
        {renderField('Extension')}
      </Section>

      <Section title="Personal Information">
        {renderField('DOB')}
        {renderField('Birthday')}
        {renderField('Blood Group')}
        {renderField("Father's Name")}
        {renderField('Marital Status')}
        {renderField('Marriage Date')}
        {renderField('Spouse Name')}
        {renderField('Nationality')}
        {renderField('Residential Status')}
        {renderField('Place Of Birth')}
        {renderField('Country Of Origin')}
        {renderField('Religion')}
        {renderField('International Employee', 'No')}
        {renderField('Physically Challenged', 'No')}
        {renderField('Is Director', 'No')}
        {renderField('Personal Email')}
        {renderField('Height')}
        {renderField('Weight')}
        {renderField('Identification Mark')}
        {renderField('Hobby')}
        {renderField('Caste')}
      </Section>

      <Section title="Joining Details">
        {renderField('Joined On', '01 Jul 2025')}
        {renderField('Confirmation Date', '30 Aug 2025')}
        {renderField('Status', 'Probation')}
        {renderField('Probation Period')}
        {renderField('Notice Period')}
        {renderField('Current Company Experience')}
        {renderField('Previous Experience')}
        {renderField('Total Experience')}
        {renderField('Referred By')}
      </Section>

      {/* New Sections */}
      <Section title="Current Position" color="#4caf50">
        {renderField('Location', 'Bangalore')}
      </Section>

      {['Employee Identity', 'Education', 'Course Details'].map((title) => (
        <Accordion key={title} sx={{ mb: 1,borderRadius: 1,bgcolor: 'rgba(255, 255, 255, 0.1)',backdropFilter: 'blur(8px)',color:'white' }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight={600}>{title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2">No records available</Typography>
          </AccordionDetails>
        </Accordion>
      ))}

      <Typography variant="subtitle1" fontWeight={600} sx={{ mt:1, mb: 1, color:'white' }}>Address</Typography>

      <Section title="Present" color="tomato">
        {renderField('Name')}
        {renderField('Address')}
        {renderField('City')}
        {renderField('State')}
        {renderField('Country')}
        {renderField('Pincode')}
        {renderField('Phone1')}
        {renderField('Phone2')}
        {renderField('Ext')}
        {renderField('Fax')}
        {renderField('Mobile no')}
        {renderField('Email')}
      </Section>

      <Divider  />

      <Section title="Permanent" color="tomato">
        {renderField('Name')}
        {renderField('Address')}
        {renderField('City')}
        {renderField('State')}
        {renderField('Country')}
        {renderField('Pincode')}
        {renderField('Phone1')}
        {renderField('Phone2')}
        {renderField('Ext')}
        {renderField('Fax')}
        {renderField('Mobile no')}
        {renderField('Email')}
      </Section>

      <Divider/>

      <Section title="Contact" color="tomato">
        {renderField('Name')}
        {renderField('Address')}
        {renderField('City')}
        {renderField('State')}
        {renderField('Country')}
        {renderField('Pincode')}
        {renderField('Phone1')}
        {renderField('Phone2')}
        {renderField('Ext')}
        {renderField('Fax')}
        {renderField('Mobile no')}
        {renderField('Email')}
      </Section>

      <Divider/>

      <Section title="Emergency Contact" color="tomato">
        {renderField('Name')}
        {renderField('Relationship')}
        {renderField('Address')}
        {renderField('City')}
        {renderField('State')}
        {renderField('Country')}
        {renderField('Pincode')}
        {renderField('Phone1')}
        {renderField('Phone2')}
        {renderField('Ext')}
        {renderField('Fax')}
        {renderField('Mobile no')}
        {renderField('Email')}
      </Section>

      <Divider/>

      <Section title="Background Check" color="#4caf50">
        {renderField('Verification Status')}
        {renderField('Verification Completed on')}
        {renderField('Agency Name')}
        {renderField('Remarks')}
      </Section>  

      <Divider/>
      <Section title="Remarks" color="#2196f3">
        <TextField
          fullWidth
          multiline
          rows={6}
          placeholder="Type your description...."
          variant="outlined"
          sx={{
            input: { color: 'white' },
            textarea: { color: 'white' }, // For multiline
            '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: 'white' },
            '&:hover fieldset': { borderColor: 'white' },
            '&.Mui-focused fieldset': { borderColor: 'white' },
            },
            '& .MuiInputBase-input::placeholder': {
             color: 'white',
             opacity: 0.5,
            },
          }}          
        />
        <Box display="flex" justifyContent="center" gap={2} mt={2}>
          <Button variant="outlined" sx={{ color: 'primary', borderColor: 'primary' }}>Cancel</Button>
          <Button variant="contained" color="primary">Save</Button>
        </Box>        
      </Section>    
    </Box>
  );
};

export default Info;
