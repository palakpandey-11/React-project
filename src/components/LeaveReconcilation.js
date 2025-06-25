import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  IconButton,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TextField,
  Checkbox,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const initialRows = [
  {
    id: 1,
    date: "14-06-2025",
    status: "Resolved",
    reason: "Reason",
    resolved: true,
  },
  {
    id: 2,
    date: "07-06-2025",
    status: "Open",
    reason: "",
    resolved: false,
  },
];

export default function LeaveReconcilation() {
  const navigate = useNavigate();
  const [rows, setRows] = useState(initialRows);

  const handleReasonChange = (id, val) => {
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, reason: val } : r)));
  };

  const handleToggleResolved = (id) => {
    setRows((rs) =>
      rs.map((r) =>
        r.id === id
          ? {
              ...r,
              resolved: !r.resolved,
              status: r.resolved ? "Open" : "Resolved",
            }
          : r
      )
    );
  };

  const handleClear = () => {
    setRows(
      initialRows.map((r) => ({
        ...r,
        reason: "",
        resolved: false,
        status: "Open",
      }))
    );
  };

  const handleSubmit = () => {
    console.log("Submitting reconciliation:", rows);
    // TODO: send to server…
  };

  return (
    <div
      style={{
        position: "relative",
        textAlign: "center",
        color: "white",
        fontFamily: "Arial",
        paddingTop: 16,
      }}
    >
      <IconButton
        onClick={() => navigate("/timesheettable")}
        sx={{ position: "absolute", top: 16, left: 16, color: "white" }}
      >
        <ArrowBackIosIcon />
      </IconButton>
      <Box
        sx={{
          position: "relative",
          mx: "auto",
          mt: 4,
          width: "90%",
          maxWidth: 900,
          bgcolor: "rgba(0,0,0,0.6)",
          border: "1px solid rgba(255,255,255,0.3)",
          borderRadius: 1,
          p: 2,
          color: "white",
        }}
      >
        <Box component="h2" sx={{ textAlign: "center", mb: 3 }}>
          Leave Reconciliation
        </Box>

        <TableContainer
          component={Paper}
          sx={{
            backgroundColor: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(4px)",
            border: "1px solid rgba(255,255,255,0.3)",
            borderRadius: 1,
            mb: 1,
          }}
        >
          <Table size="small">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#1976d2" }}>

            {/* ← new empty header cell for the checkbox */}
            <TableCell padding="checkbox">
              <Checkbox
                checked={rows.every(r => r.resolved)}
                indeterminate={
                  rows.some(r => r.resolved) && 
                  !rows.every(r => r.resolved)
                }
                onChange={e => {
                  const allResolved = e.target.checked;
                  setRows(rs =>
                    rs.map(r => ({
                      ...r,
                      resolved: allResolved,
                      status: allResolved ? 'Resolved' : 'Open'
                    }))
                  )
                }}
                sx={{ color: 'white' }}
              />
            </TableCell>
            {['Date','Status','Reason'].map(h => (
              <TableCell
                key={h}
                sx={{ color: 'white', fontWeight: 'bold', textAlign: h==='Reason'?'left':'center' }}
              >
                {h}
              </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
 {rows.map(row => (
            <TableRow key={row.id}
                      sx={{ borderBottom: '1px solid rgba(255,255,255,0.3)',
                            backgroundColor:'rgba(0,0,0,0.46)' }}>
              {/* ← the new checkbox cell */}
              <TableCell padding="checkbox">
                <Checkbox
                  checked={row.resolved}
                  onChange={()=>handleToggleResolved(row.id)}
                  sx={{ color:'white' }}
                />
              </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: "white",
                      fontWeight: "normal",
                      px: 2,
                      py: 1,
                    }}
                  >
                    {row.date}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: "white",
                      fontWeight: "normal",
                      px: 2,
                      py: 1,
                    }}
                  >
                    {row.status}
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        placeholder="Reason"
                        //value={row.reason}
                        onChange={(e) =>
                          handleReasonChange(row.id, e.target.value)
                        }
                        disabled={row.resolved}
                        sx={{
                          backgroundColor: "rgba(255,255,255,0.15)",
                          color: "grey",
                          "& .MuiInputBase-input": { color: "white" },
                          '& .MuiInputBase-input.Mui-disabled': {
                        WebkitTextFillColor: 'white', // Safari/Chrome
                        color: 'white' }
                        }}
                      />
                      {row.resolved && (
                        <IconButton
                          onClick={() => handleToggleResolved(row.id)}
                          sx={{ color: "white" }}
                        >
                          <CloseIcon />
                        </IconButton>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Stack direction="row" justifyContent="flex-end" spacing={2}>
          <Button variant="outlined" color="error" onClick={handleClear}>
            CLEAR
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            SUBMIT
          </Button>
        </Stack>
      </Box>
    </div>
  );
}
