import React from "react";
import {
  Box,
  Typography,
  Breadcrumbs,
  Link as MuiLink,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { ThumbUp } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import Header from "./Header";

const dummyLogs = [
  {
    payroll: "Apr 2025",
    description: "Took 11.349 seconds for A Kalyan Kumar [T0023].",
    processed: "Processed on 02 Apr 2025 by pranalibagul2607@gmail.com",
  },
  {
    payroll: "Apr 2023",
    description: "Took 24.307 seconds for 39 employees.",
    processed: "Processed on 19 Jul 2024 by pranalibagul2607@gmail.com",
  },
  {
    payroll: "May 2024",
    description: "Took 1.236 seconds for Dinesh Babu [T0046].",
    processed: "Processed on 19 Jul 2024 by pranalibagul2607@gmail.com",
  },
  {
    payroll: "May 2024",
    description: "Took 1.217 seconds for Dinesh Babu [T0046].",
    processed: "Processed on 19 Jul 2024 by pranalibagul2607@gmail.com",
  },

];

export default function PayrollProcess() {
  return (
    <>
      <Header />

      {/* Breadcrumb */}
      <Box sx={{ p: 2, bgcolor: "rgba(10,20,40,0.8)" }}>
        <Breadcrumbs
          separator=">"
          sx={{ "& .MuiBreadcrumbs-separator": { color: "rgba(255,255,255,0.5)" } }}
        >
          <MuiLink
            component={RouterLink}
            to="/welcome"
            sx={{ color: "rgba(255,255,255,0.7)", textDecoration: "none" }}
          >
            Home
          </MuiLink>
          <MuiLink
            component={RouterLink}
            to="/updatepayroll"
            sx={{ color: "rgba(255,255,255,0.7)", textDecoration: "none" }}
          >
            Payroll
          </MuiLink>
          <Typography sx={{ color: "rgba(255,255,255,0.5)" }}>Process Payroll</Typography>
        </Breadcrumbs>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          mt: 3,
          px: 2,
         
        }}
      >
      {/* Actions */}
      <Box sx={{ p: 2, display: "flex", gap: 2 }}>
        <Button variant="contained" color="primary" startIcon={<i className="fas fa-cogs" />}>
          Process Payroll
        </Button>
        <Button variant="contained" color="secondary" startIcon={<i className="fas fa-bolt" />}>
          Quick Process
        </Button>
      </Box>

      {/* Process Log Table */}
      <Box sx={{ p: 2,   }}>
        <Typography variant="h6" sx={{ color: "white", mb: 2, textAlign:'center' }}>
          Last 20 process log
        </Typography>
        <TableContainer component={Paper} sx={{ backgroundColor: "#121c3490", maxWidth: 1500,
            width: "100%",
            mt: 1, }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Payroll</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Description</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dummyLogs.map((log, idx) => (
                <TableRow key={idx}>
                  <TableCell sx={{ color: "#cddfff" }}>{log.payroll}</TableCell>
                  <TableCell sx={{ color: "#cddfff" }}>
                    {log.description}
                    <Typography variant="body2" sx={{ color: "#8899aa" }}>
                      {log.processed}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ color: "#90ee90" }}>
                    <ThumbUp fontSize="small" sx={{ mr: 1 }} />
                    COMPLETED
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </Box>
      </Box>
    </>
  );
}
