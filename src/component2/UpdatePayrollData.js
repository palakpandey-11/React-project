import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Stack,
  Paper,
  TextField,
  InputAdornment,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Search as SearchIcon,
  Settings as SettingsIcon,
  PowerSettingsNew as PowerIcon,
  KeyboardArrowDown as ArrowIcon,
  KeyboardArrowRight as ArrowRightIcon,
} from "@mui/icons-material";

export default function UpdatePayrollData() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [anchorEl, setAnchorEl] = useState({});

  const handleOpen = (key) => (e) =>
    setAnchorEl((prev) => ({ ...prev, [key]: e.currentTarget }));
  const handleClose = (key) => () =>
    setAnchorEl((prev) => ({ ...prev, [key]: null }));

  const menus = {
    payrollInputs: [
      "Salary",
      "Loan",
      "Income Tax",
      "Reimbursement",
      "Employee LOP Days",
      "Stop Salary Processing",
      "Arrears",
      "Final Settlement",
    ],
    process: ["Payroll Process"],
    verify: ["Quick Salary Statement", "Payroll Statement"],
    payout: ["Bank Transfer", "Payslips"],
    publishedInfo: [
      "Payslip",
      "CTC Payslip",
      "YTD Summary",
      "Loan Statement",
      "IT Statement",
    ],
    admin: [
      "Form 16",
      "Form24Q",
      "Employee IT Declaration",
      "POI Overview",
      "FBP Planner",
    ],
  };

  const renderMenu = (key) => (
    <Menu
      anchorEl={anchorEl[key]}
      open={Boolean(anchorEl[key])}
      onClose={handleClose(key)}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      PaperProps={{
        sx: {
          color: "grey",
          bgcolor: "rgba(0,0,0,0.7)",
          backdropFilter: "blur(8px)",
          "& .MuiMenuItem-root": {
            px: 3,
            py: 1,
            borderLeft: "4px solid transparent",
            transition: "all .2s ease",
            "&:hover": {
              bgcolor: "rgba(25,118,210,0.2)",
              color: "common.white",
              borderLeftColor: "primary.main",
            },
          },
        },
      }}
    >
      {menus[key].map((item) => (
        <MenuItem key={item} onClick={handleClose(key)}>
          {item}
        </MenuItem>
      ))}
    </Menu>
  );

  return (
     <Box sx={{ minHeight: "100vh" }}>
      <AppBar
        position="static"
        sx={{ bgcolor: "rgba(39, 37, 37, 0.74)", boxShadow: "none" }}
      >
        <Toolbar sx={{ px: 2 }}>
          {/* Logo */}
          <Typography
            variant="h6"
            sx={{ mr: 4, fontWeight: "bold", color: "grey" }}
          >
            FlowSync
          </Typography>

          {/* Navbar */}
          <Stack
            direction="row"
            spacing={2}
            sx={{ flexGrow: 1, overflowX: "auto" }}
          >
            {/* Always show Payroll */}
            <Button
              sx={{
                textTransform: "none",
                bgcolor: "rgba(255,246,246,0.29)",
                color: "black",
              }}
            >
              Payroll
            </Button>

            {/* Desktop: show all menus inline */}
            {!isMobile &&
              Object.keys(menus).map((key) => (
                <Box key={key}>
                  <Button
                    endIcon={<ArrowIcon />}
                    sx={{ color: "white", textTransform: "none" }}
                    onClick={handleOpen(key)}
                  >
                    {
                      {
                        payrollInputs: "Payroll Inputs",
                        process: "Process",
                        verify: "Verify",
                        payout: "Payout",
                        publishedInfo: "Published Info",
                        admin: "Admin",
                      }[key]
                    }
                  </Button>
                  {renderMenu(key)}
                </Box>
              ))}

            {/* Mobile: collapse rest under More */}
            {isMobile && (
              <Box>
                <Button
                  endIcon={<ArrowIcon />}
                  sx={{ color: "white", textTransform: "none" }}
                  onClick={handleOpen("more")}
                >
                  More
                </Button>
                <Menu
                  anchorEl={anchorEl.more}
                  open={Boolean(anchorEl.more)}
                  onClose={handleClose("more")}
                  anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                  transformOrigin={{ vertical: "top", horizontal: "left" }}
                  PaperProps={{
                    sx: {
                      color: "grey",
                      bgcolor: "rgba(0,0,0,0.85)",
                      backdropFilter: "blur(8px)",
                      "& .MuiMenuItem-root": {
                        color: "common.white",
                        px: 3,
                        py: 1,
                        transition: "all 0.2s ease",
                        borderLeft: "4px solid transparent",
                        display: "flex",
                        justifyContent: "space-between",
                        "&:hover": {
                          bgcolor: "rgba(25,118,210,0.2)",
                          borderLeftColor: "primary.light",
                        },
                      },
                    },
                  }}
                >
                  {Object.keys(menus).map((key) => (
                    <MenuItem key={key} onClick={handleOpen(key)}>
                      {
                        {
                          payrollInputs: "Payroll Inputs",
                          process: "Process",
                          verify: "Verify",
                          payout: "Payout",
                          publishedInfo: "Published Info",
                          admin: "Admin",
                        }[key]
                      }
                      <ArrowRightIcon fontSize="small" />
                    </MenuItem>
                  ))}
                </Menu>
                {/* Nested submenus */}
                {Object.keys(menus).map((key) => renderMenu(key))}
              </Box>
            )}
          </Stack>

          {/* Right icons */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton sx={{ color: "white" }}>
              <SearchIcon />
            </IconButton>
            <IconButton sx={{ color: "white" }}>
              <SettingsIcon />
            </IconButton>
            <IconButton sx={{ color: "error.light" }}>
              <PowerIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Page content */}
      <Box sx={{ p: 3 }}><Paper sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(255, 246, 246, 0.82)', mt: 3 }}>
            <Box width="100%" maxWidth="500px">
              <Typography fontWeight="bold" fontSize="18px" mb={1}>
                Start searching to see specific employee details here
              </Typography>
              <Typography variant="body2" mb={1}>
                Employee Type: <b>Current Employees</b>
              </Typography>

              <TextField
                fullWidth
                placeholder="Search by Emp No/ Name"
                variant="outlined"
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: 'grey.600' }} />
                    </InputAdornment>
                  )
                }}
              />
            </Box>

            <Box>
              <img
                src="data:image/jpeg;base64,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"
                alt="illustration"
                width={180}
                
              />
            </Box>
          </Paper></Box>
    </Box>
  );
}
