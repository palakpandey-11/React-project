import React, { useState } from 'react';
import Header from './Header';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Breadcrumbs,
  Typography,
  Link as MuiLink,
  Paper,
  Stepper,
  Step,
  StepLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Autocomplete,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  useTheme,
  useMediaQuery
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const steps = [
  'Employee',
  'Resignation Details',
  'Notice Pay',
  'Work Days',
  'Leave Encashment',
  'Remarks'
];

export default function SettleEmployee() {
  const [activeStep, setActiveStep] = useState(0);
  const [mode, setMode] = useState('separated');
  const [searchValue, setSearchValue] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleNext = () => setActiveStep(s => Math.min(s + 1, steps.length - 1));
  const handleBack = () => setActiveStep(s => Math.max(s - 1, 0));

  return (
    <>
      <Header />

      {/* Breadcrumbs */}
      <Box sx={{ p: 2, bgcolor: 'rgba(10,20,40,0.7)' }}>
        <Breadcrumbs separator=">" sx={{ '& .MuiBreadcrumbs-separator': { color: 'rgba(255,255,255,0.5)' } }}>
          <MuiLink component={RouterLink} to="/welcome" sx={{ color: 'rgba(255,255,255,0.7)' }}>Home</MuiLink>
          <MuiLink component={RouterLink} to="/updatepayroll" sx={{ color: 'rgba(255,255,255,0.7)' }}>Payroll</MuiLink>
          <MuiLink component={RouterLink} to="/finalsettlement" sx={{ color: 'rgba(255,255,255,0.7)' }}>Final Settlement</MuiLink>
          <Typography sx={{ color: 'rgba(255,255,255,0.5)' }}>Settle Employee</Typography>
        </Breadcrumbs>
      </Box>

      {/* Centered container with max width */}
      <Box
        sx={{
          maxWidth: 800,
          width: '100%',
          mx: 'auto',
          px: 2,
          my: 2,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 2,
            bgcolor: 'rgba(255,255,255,0.05)',
            borderRadius: 2
          }}
        >
          <Stepper
            activeStep={activeStep}
            alternativeLabel={!isMobile}
            orientation={isMobile ? 'vertical' : 'horizontal'}
            sx={{
              width: '100%',
              '& .MuiStepIcon-root': { color: 'rgba(255,255,255,0.3)' },
              '& .MuiStepIcon-root.Mui-active': { color: 'green' },
              '& .MuiStepIcon-root.Mui-completed': { color: 'white' },
              '& .MuiStepLabel-label': { color: 'rgba(255,255,255,0.3)', fontSize: isMobile ? '0.75rem' : '0.875rem' },
              '& .MuiStepLabel-label.Mui-active': { color: '#e5e5e5', fontWeight: 600 },
              '& .MuiStepLabel-label.Mui-completed': { color: 'grey' },
            }}
          >
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {/* Step content... */}
          <Box sx={{ mt: isMobile ? 2 : 4 }}>
              {/* --- Step 1: Employee --- */}
          {activeStep === 0 && (
            <Box>
              <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
                Step 1: Employee
              </Typography>

              <RadioGroup
                row
                value={mode}
                onChange={e => setMode(e.target.value)}
                sx={{ color: 'white', mb: 2 }}
              >
                <FormControlLabel
                  value="separated"
                  control={<Radio sx={{ color: 'white', '&.Mui-checked': { color: 'green' } }} />}
                  label="Separated Employee"
                />
                <FormControlLabel
                  value="search"
                  control={<Radio sx={{ color: 'white', '&.Mui-checked': { color: 'green' } }} />}
                  label="Search Employee"
                />
              </RadioGroup>

              <Typography sx={{ color: 'rgba(255,255,255,0.7)', mb: 2 }}>
                {mode === 'separated'
                  ? '1 employee(s) to be settled'
                  : 'Start typing to search employee'}
              </Typography>

              {mode === 'search' && (
                <Autocomplete
                  freeSolo
                  options={[]}
                  inputValue={searchValue}
                  onInputChange={(e, v) => setSearchValue(v)}
                  sx={{
                    mb: 3,
                    '& .MuiOutlinedInput-root': {
                      bgcolor: 'rgba(255,255,255,0.08)',
                      color: 'white',
                      '& fieldset': { borderColor: 'rgba(255,255,255,0.4)' },
                      '&:hover fieldset': { borderColor: 'white' },
                      '&.Mui-focused fieldset': { borderColor: 'green' }
                    }
                  }}
                  renderInput={params => (
                    <TextField
                      {...params}
                      placeholder="Search by Emp No/Name"
                      size="small"
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton sx={{ color: 'white' }}>
                              <SearchIcon />
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                />
              )}
            </Box>
          )}

          {/* --- Steps 2–5 placeholders --- */}
          {activeStep > 0 && activeStep < steps.length - 1 && (
            <Typography sx={{ color: 'white' }}>Step {activeStep + 1}: {steps[activeStep]} (TODO)</Typography>
          )}

          {/* --- Final Step 6: Remarks placeholder --- */}
          {activeStep === steps.length - 1 && (
            <Typography sx={{ color: 'white' }}>Step 6: Remarks (TODO)</Typography>
          )}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3, flexDirection: isMobile ? 'column-reverse' : 'row', gap: 2 }}>
              <Button
                onClick={handleBack}
                disabled={activeStep === 0}
                fullWidth={isMobile}
                sx={{
                  color: activeStep === 0 ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.7)',
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
                }}
              >
                Previous
              </Button>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: isMobile ? 'center' : 'flex-end', width: isMobile ? '100%' : 'auto' }}>
                <Button
                  onClick={handleNext}
                  variant="contained"
                  color="primary"
                  fullWidth={isMobile}
                >
                  {activeStep < steps.length - 1 ? 'Next →' : 'Finish'}
                </Button>
                <Button
                  onClick={() => setActiveStep(0)}
                  sx={{ color: 'white' }}
                  fullWidth={isMobile}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
    </>
  );
}
