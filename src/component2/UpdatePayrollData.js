import React, { useState, useMemo } from "react";
import { Link as RouterLink } from "react-router-dom";
import MuiLink from '@mui/material/Link';
import Header from "./Header";  
import {
  Typography,
  Button,
  IconButton,
  Box,
  useTheme,
  Breadcrumbs,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@mui/material";
import {
  PowerSettingsNew as PowerIcon,
  KeyboardArrowDown as ArrowIcon,
  KeyboardArrowRight as ArrowRightIcon,
  ArrowBackIos,
  ArrowForwardIos,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

// Utility to generate months
const generateMonths = (startDate, count) => {
  const months = [];
  const date = new Date(startDate);
  for (let i = 0; i < count; i++) {
    months.push({
      label: date.toLocaleString('default', { month: 'short' }),
      year: date.getFullYear(),
      date: new Date(date),
    });
    date.setMonth(date.getMonth() + 1);
  }
  return months;
};

// Inline MonthPicker with glassy controls, inherits page background
function MonthPicker({ monthsToShow = 12, onMonthChange }) {
  const today = useMemo(() => new Date(), []);
   const start = useMemo(
     () => new Date(today.getFullYear(), today.getMonth() - 3, 1),
    [today]
  );
  const months = useMemo(
    () => generateMonths(start, monthsToShow),
    [start, monthsToShow]
  );
  const [selectedIndex, setSelectedIndex] = useState(
    months.findIndex(
      m => m.date.getMonth() === today.getMonth() && m.date.getFullYear() === today.getFullYear()
    )
  );
  const [openDelete, setOpenDelete] = useState(false);

  const handleSelect = idx => {
    if (months[idx].date > today) return;
    setSelectedIndex(idx);
    onMonthChange && onMonthChange(months[idx].date);
  };
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  return (
    <>
  
      {/* Month navigation */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          overflowX: 'auto',
          bgcolor: 'rgba(255, 255, 255, 0.29)',
          backdropFilter: 'blur(8px)',
          p: 1,
          borderRadius: 1,
          mb: 2,
          
        }}
      >
        <IconButton disabled sx={{ color: 'rgba(255,255,255,0.6)' }}>
          <ArrowBackIos />
        </IconButton>
        {months.map((m, idx) => {
          const isFuture = m.date > today;
          const isSelected = idx === selectedIndex;
          return (
            <Button
              key={`${m.label}-${m.year}`}
              onClick={() => handleSelect(idx)}
              disabled={isFuture}
              sx={{
                mx: 0.5,
                flexShrink: 0,
                color: isSelected ? 'common.white' : 'rgba(255,255,255,0.7)',
                bgcolor: isSelected ? 'primary.main' : 'transparent',
                textTransform: 'uppercase',
                borderRadius: 1,
                '&:hover': {
                  bgcolor: isSelected ? 'primary.dark' : 'rgba(255,255,255,0.2)',
                },
              }}
            >
              <Typography variant="button" sx={{ fontWeight: 600 }}>{m.label}</Typography>
              <Typography variant="caption" sx={{ ml: 0.5 }}>{m.year}</Typography>
            </Button>
          );
        })}
        <IconButton disabled sx={{ color: 'rgba(255,255,255,0.6)' }}>
          <ArrowForwardIos />
        </IconButton>
      </Box>

      {/* Detail panel */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          bgcolor: 'rgba(255,255,255,0.05)',
          p: 2,
          borderRadius: 1,
          mb: 4,
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ color: 'common.white' }}>
            {months[selectedIndex].label} {months[selectedIndex].year}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', fontStyle: 'italic' }}>
              Cutoff from 01 {months[selectedIndex].label} {months[selectedIndex].year} to 31 {months[selectedIndex].label} {months[selectedIndex].year}
            </Typography>
            <IconButton size="small" sx={{ color: 'rgba(255,255,255,0.7)', ml: 1 }}>
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" sx={{ color: 'error.light', ml: 0.5 }} onClick={handleOpenDelete}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
        <Button variant="contained" sx={{ textTransform: 'none' }}>
          Process Payroll
        </Button>
      </Box>

      {/* Delete confirmation */}
      <Dialog
        open={openDelete}
        onClose={handleCloseDelete}
        BackdropProps={{
          sx: {
            backdropFilter: 'blur(2px)',
            backgroundColor: 'rgba(0,0,0,0.5)',
          },
        }}
      >
        <DialogTitle sx={{ bgcolor: 'rgba(139, 139, 139, 0.19)' }}>Delete Payroll</DialogTitle>
        <DialogContent sx={{ bgcolor: 'rgba(139, 139, 139, 0.19)' }}>
          <DialogContentText sx={{ color: 'text.primary' }}>
            ⚠️ Deleted records cannot be retrieved!<br />
            You are about to delete payroll for {months[selectedIndex].label} {months[selectedIndex].year}.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ bgcolor: 'rgba(139, 139, 139, 0.19)' }}>
          <Button onClick={handleCloseDelete}>Cancel</Button>
          <Button onClick={() => { /* delete logic */ handleCloseDelete(); }} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

// Main component
export default function UpdatePayrollData() {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState('Payroll Overview');


  return (
    <Box sx={{ minHeight: "100vh" }}>
 
     <Header/>
      {/* Breadcrumbs */}
      <Box sx={{ p: 2, bgcolor: 'rgba(10,20,40,0.7)' }}>
        <Breadcrumbs separator=">" sx={{ '& .MuiBreadcrumbs-separator': { color: 'rgba(255,255,255,0.5)' } }}>
          <MuiLink component={RouterLink} to="/welcome" underline="hover" sx={{ color: 'rgba(255,255,255,0.7)' }}>
            Home
          </MuiLink>
          <MuiLink component={RouterLink} to="/updatepayroll" underline="hover" sx={{ color: 'rgba(255,255,255,0.7)' }}>
            Payroll
          </MuiLink>
          <Typography sx={{ color: 'rgba(255,255,255,0.5)' }}>{activeTab}</Typography>
        </Breadcrumbs>
      </Box>

      {/* MonthPicker */}
            <MonthPicker onMonthChange={date => console.log('Selected:', date)} />
      
    </Box>
  );
}
