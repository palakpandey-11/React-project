import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Breadcrumbs,
  Typography,
  Link as MuiLink,
  Button,
  Paper,
  Stack,
  IconButton,
  Chip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Header from './Header';

const statements = [
  { name: 'CTC Statement', status: 'Public' },
  { name: 'Department Summary' },
  { name: 'IT Statement' },
  { name: 'Payroll Statement' },
  { name: 'Reimbursements' },
];

export default function PayrollStatement() {
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
          <Typography sx={{ color: 'rgba(255,255,255,0.5)' }}>Payroll Statement</Typography>
        </Breadcrumbs>
      </Box>

      {/* Main Content */}
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
           <Button
            variant="outlined"
            component={RouterLink}
            to="/add-statement"
            sx={{
              borderColor: 'rgba(255,255,255,0.6)',
              color: 'rgba(255,255,255,0.8)',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderColor: 'rgba(255,255,255,0.8)',
                color: '#fff',
              },
            }}
          >
            Add Statement
          </Button>
        </Box>

        <Stack spacing={1}>
          {statements.map(({ name, status }) => (
            <Paper
              key={name}
              sx={{
               p: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                bgcolor: 'rgba(255,255,255,0.1)',     // light gray overlay
                color: 'rgba(255,255,255,0.9)',        // almost-white text
                borderRadius: 1,
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.15)',
                },
              }}
            >
              <MuiLink
                component={RouterLink}
                to={`/statements/${name.replace(/\s+/g, '-').toLowerCase()}`}
                sx={{
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  color: 'rgba(100, 181, 246, 0.9)',     // softer blue
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                {name}
              </MuiLink>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {status && (
                  <Chip
                    label={status}
                    size="small"
                    color="primary"
                    sx={{ textTransform: 'uppercase', fontSize: '0.75rem', backgroundColor: 'rgba(30,136,229,0.8)', }}
                  />
                )}
                <IconButton size="small" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </Paper>
          ))}
        </Stack>
      </Box>
    </>
  );
}
