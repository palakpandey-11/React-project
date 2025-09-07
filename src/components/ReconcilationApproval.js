import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  IconButton,
  Stack,
  Button,
  TextField,
  InputAdornment,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  Paper,
  TablePagination,
  Snackbar, Alert,
} from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import SearchIcon from '@mui/icons-material/Search'
import RejectButtonReconcilation from './RejectButtonReconcilation'

// sample data for Reconciliation tab
const reconSampleRows = [
  { id: "10023", name: 'pranali', reason: 'okkkk fill', date: '16-10-2024', status: 'Pending' },
]

export default function ReconciliationApproval() {
  const navigate = useNavigate()

  // search + selection + pagination state
  const [searchTerm, setSearchTerm]   = useState('')
  const [selected, setSelected]       = useState([])
  const [page, setPage]               = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  // rows coming from localStorage (dynamic)
  const [reconRows, setReconRows] = useState([])

  const [openReject, setOpenReject] = useState(false)
  const [rowsForReject, setRowsForReject] = useState([])

  useEffect(() => {
    const stored = localStorage.getItem('reconciliationData')
    if (stored) {
      setReconRows(JSON.parse(stored))
    }
  }, [])

  const rowKey = (r) =>
  r.recordId ??
  r.reconciliationId ??
  r.id ??                                   // if backend sends a unique id, great
  `${r.empID || r.empId || 'noEmp'}_${r.date || 'noDate'}_${r.reason || ''}`;

  // Normalize a reconciliation row to the "history/closed" shape
  const mapReconToHistory = (row, status, reasonOverride) => {
    const empId = row.empID || row.empId || row.id
    const date  = row.date || row.startDate || row.endDate || ''
    return {
      id: `${empId}-${Date.now()}`,
      empId: row.empId || empId || '',
      name: row.name || '',
      leaveType: row.leaveType || 'Reconciliation',
      startDate: row.startDate || date,
      endDate: row.endDate || date,
      days: row.days ?? 1,
      reason: reasonOverride ?? row.reason ?? '',
      appliedOn: row.appliedOn || date || '',
      balance: row.balance ?? '-',
      status,
      approverId: row.approverId || row.approverID || null, // 👈 keep who owns this row
     approverName: row.approverName || "",  
    }
  }

  // ===== Manager/HR view filter (Option 3) =====
  const viewer = JSON.parse(localStorage.getItem("user") || "{}")
  const isHr   = viewer?.role === "hr"

  // Merge static + dynamic rows
  const allRows = [...reconSampleRows, ...reconRows]

  // Only show rows where this viewer is the approver (HR sees all)
  const myRows = isHr
    ? allRows
    : allRows.filter(r => (r.approverId || r.approverID) === viewer.empId)

  // Search filter inside allowed rows
  const filteredRows = myRows.filter(r => {
    const t = searchTerm.trim().toLowerCase()
    if (!t) return true
    const idStr = String(r.empID || r.empId || r.id).toLowerCase()
    const nmStr = (r.name || "").toLowerCase()
    return idStr.includes(t) || nmStr.includes(t)
  })

  const allSelected  = selected.length === filteredRows.length && filteredRows.length > 0
  const someSelected = selected.length > 0 && selected.length < filteredRows.length

// toggle one using the key
const handleSelect = (key) => {
  setSelected((prev) => (prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]));
};

  // toast/snackbar state
  const [toast, setToast] = useState({
    open: false,
    msg: '',
    severity: 'success',
  })
const closedKey = r =>
  `${r.empId}|${r.startDate}|${r.endDate}|${r.leaveType}|Rejected|${r.reason}`;

const dedupAppend = (storeKey, items, keyFn) => {
  const existing = JSON.parse(localStorage.getItem(storeKey) || '[]');
  const seen = new Set(existing.map(keyFn));
  const merged = [...existing];
  for (const it of items) {
    const k = keyFn(it);
    if (!seen.has(k)) {
      seen.add(k);
      merged.push(it);
    }
  }
  localStorage.setItem(storeKey, JSON.stringify(merged));
  return merged;
};
 const handleRejected = (rejectedFromModal) => {
  // use current selection to identify the actual rows
  const selectedKeys = new Set(selected);
  const picked = myRows.filter(r => selectedKeys.has(rowKey(r)));
  if (!picked.length) return;

  // map to closed/history; prefer modal reason if provided
  const toWrite = picked.map(r =>
    mapReconToHistory(
      r,
      "Rejected",
      rejectedFromModal.find(x => rowKey(x) === rowKey(r))?.rejectReason ?? r.reason
    )
  );

  // write ONCE with de-dup
  dedupAppend("leaveHistory", toWrite, closedKey);
  dedupAppend("closedRows",   toWrite, closedKey);

  // remove from reconciliation using the stable keys
  const remaining = reconRows.filter(r => !selectedKeys.has(rowKey(r)));
  setReconRows(remaining);
  localStorage.setItem("reconciliationData", JSON.stringify(remaining));

  setSelected([]);
  setToast({ open: true, msg: "Rejected successfully", severity: "success" });
};
  const handleStatusChange = (newStatus) => {
    //  use myRows (not allRows) so actions only affect what this viewer is allowed to see
    const picked = myRows.filter((r) => selected.includes(rowKey(r)));
    if (!picked.length) return

    const toWrite = picked.map((r) => mapReconToHistory(r, newStatus))

    // 1) history
    const hist = JSON.parse(localStorage.getItem("leaveHistory") || "[]")
    localStorage.setItem("leaveHistory", JSON.stringify([...hist, ...toWrite]))

    // 2) closed
    const closed = JSON.parse(localStorage.getItem("closedRows") || "[]")
    localStorage.setItem("closedRows", JSON.stringify([...closed, ...toWrite]))

    // 3) remove only those from dynamic store
    const remainingRecon = reconRows.filter((r) => !selected.includes(rowKey(r)));
    setReconRows(remainingRecon)
    localStorage.setItem("reconciliationData", JSON.stringify(remainingRecon))

    setSelected([])
    setToast({ open: true, msg: `${newStatus} successfully`, severity: "success" })
  }

  return (
    <div style={{ position: 'relative', textAlign: 'center', color: 'white', fontFamily: 'Arial', paddingTop: 16 }}>
      {/* back arrow */}
      <IconButton onClick={() => navigate('/timesheettable')} sx={{ position: 'absolute', top: 16, left: 16, color: 'white' }}>
        <ArrowBackIosIcon />
      </IconButton>

      <h2 style={{ margin: 0 }}>Leave Approval / Reconciliation</h2>

      {/* outer container */}
      <Box sx={{
        mt: 3,
        width: '90%',
        maxWidth: 1450,
        mx: 'auto',
        border: '2px solid rgba(45,44,44,0.26)',
        borderRadius: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        p: 2
      }}>
        {/* Tabs */}
        <Stack direction="row" spacing={1} sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
          <Button variant="outlined" onClick={() => navigate('/approvals')} sx={{ color: 'rgba(255,255,255,0.7)', borderColor: 'rgba(255,255,255,0.5)' }}>
            ACTIVE
          </Button>
          <Button variant="outlined" onClick={() => navigate('/approvals/closed')} sx={{ color: 'rgba(255,255,255,0.7)', borderColor: 'rgba(255,255,255,0.5)' }}>
            CLOSED
          </Button>
          <Button variant="contained" sx={{ backgroundColor: '#1976d2', color: 'white', '&:hover': { backgroundColor: '#1565c0' } }}>
            RECONCILIATION
          </Button>
        </Stack>

        {/* search + actions */}
        <Box sx={{
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: 1,
          overflow: 'hidden',
          width:'90%',
          mx:'auto',
          p: 2,
          mt:2,
          display:'flex',
          flexDirection:'column',
          height:460,
        }}>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            flexShrink:0,
            justifyContent: 'space-between',
            mb: 2
          }}>
            <TextField
              variant="filled"
              placeholder="Search By Name or ID"
              size="small"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              sx={{
                flex: 1,
                maxWidth: '400px',
                bgcolor: 'rgba(255,255,255,0.1)',
                '& .MuiFilledInput-root': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderRadius: 1,
                  border: '1px solid rgba(255,255,255,0.3)'
                },
                '& .MuiFilledInput-input': { color: 'white', py: 1 }
              }}
              InputProps={{
                disableUnderline: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon sx={{ color: 'rgba(255,255,255,0.7)' }} />
                  </InputAdornment>
                )
              }}
            />

            <Stack direction="row" spacing={1} sx={{ flexShrink: 0}}>
              <Button
                variant="outlined"
                disabled={!selected.length}
                onClick={() => handleStatusChange("Approved")}
                sx={{
                  color: 'white',
                  borderColor: 'rgba(255,255,255,0.5)',
                  '&:not(.Mui-disabled):hover': {
                    borderColor: 'green',
                    backgroundColor: 'rgba(255,255,255,0.1)'
                  },
                  '&.Mui-disabled': {
                    color: 'rgba(255, 255, 255, 0.57)',
                    borderColor: 'rgba(255,255,255,0.3)',
                    bgcolor: 'rgba(255, 255, 255, 0.25)',
                  }
                }}
              >
                APPROVE
              </Button>
              <Button
                variant="outlined"
                disabled={!selected.length}
                onClick={() => {
                  // 🔁 use myRows here so you never pick rows the viewer shouldn't act on
                  const picked = myRows.filter(r => selected.includes(rowKey(r)))
                  if (!picked.length) return
                  setRowsForReject(picked)
                  setOpenReject(true)
                }}
                sx={{
                  color: 'white',
                  borderColor: 'rgba(255,255,255,0.5)',
                  '&:not(.Mui-disabled):hover': {
                    borderColor: 'red',
                    backgroundColor: 'rgba(255,255,255,0.08)'
                  },
                  '&.Mui-disabled': {
                    color: 'rgba(255, 255, 255, 0.57)',
                    borderColor: 'rgba(255,255,255,0.3)',
                    bgcolor: 'rgba(255, 255, 255, 0.25)',
                  }
                }}
              >
                REJECT
              </Button>
            </Stack>
          </Box>

          {/* table */}
          <TableContainer component={Paper} sx={{
            maxHeight: 380,
            overflowY: 'auto',
            flex:1,
            mb:2,
            backgroundColor: 'rgba(0,0,0,0.26)',
            border: '1px solid rgba(255,255,255,0.9)',
            borderRadius: 1,
          }}>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: 'rgba(0,0,0,0.12)' }}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={allSelected}
                      indeterminate={someSelected}
                      onChange={e =>
                        e.target.checked
                          ? setSelected(filteredRows.map(rowKey))
                          : setSelected([])
                      }
                    sx={{  color: 'white',
                '& .MuiSvgIcon-root': {
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  borderRadius: 1,
                },
            '&:hover .MuiSvgIcon-root': {
              backgroundColor: 'rgba(255, 255, 255, 0.4)',}
             }}
                  />
                </TableCell>
                {['Employee ID','Employee Name','Reason','Date','Status'].map(h => (
                  <TableCell key={h} sx={{ color: 'white', fontWeight: 'bold', backgroundColor: 'rgba(0,0,0,0.3)', py:1.5, px:2 }}>
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
    const key = rowKey(row);
    const isChecked = selected.includes(key);
    return (
                  <TableRow
                    key={key}
                    hover
                    selected={isChecked}
                    sx={{
                         cursor: 'default',
                      backgroundColor: 'rgba(255,255,255,0.11)',
                      
                    }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
            checked={isChecked}
            onChange={() => handleSelect(key)}
                        sx={{  
                        color: 'white',
                '& .MuiSvgIcon-root': {
                  backgroundColor: 'rgba(255, 255, 255, 0.22)',
                  borderRadius: 1,}
                 }}
                      />
                    </TableCell>
                    <TableCell sx={{ color: 'white', py:1.3, px:2 }}>{row.empID}</TableCell>
                    <TableCell sx={{ color: 'white', py:1.3, px:2 }}>{row.name}</TableCell>
                    <TableCell sx={{ color: 'white', py:1.3, px:2 }}>{row.reason}</TableCell>
                    <TableCell sx={{ color: 'white', py:1.3, px:2 }}>{row.date}</TableCell>
                    <TableCell sx={{ color: 'white', py:1.3, px:2 }}>{row.status}</TableCell>
                  </TableRow>
                );
              })}
              
            </TableBody>
          </Table>
        </TableContainer>

        {/* pagination fixed at bottom */}
        <TablePagination
          component="div"
          count={filteredRows.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={(e,newPage) => setPage(newPage)}
          onRowsPerPageChange={e => { setRowsPerPage(+e.target.value); setPage(0) }}
          rowsPerPageOptions={[5,10,25]}
          sx={{
            color: 'black',
            backgroundColor: 'rgba(255,249,249,0.74)',
            '& .MuiTablePagination-selectIcon': { color: 'black' },
            '& .MuiTablePagination-select': { color: 'black' },
            '& .MuiIconButton-root': { color: 'black' }
          }}
        />
        </Box>
      </Box>
      <RejectButtonReconcilation
  openReject={openReject}
  onCloseReject={() => setOpenReject(false)}
  leaveRows={rowsForReject}
  onRejected={handleRejected}
/>
<Snackbar
  open={toast.open}
  autoHideDuration={2500}
  onClose={() => setToast((t) => ({ ...t, open: false }))}
  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
>
  <Alert
    onClose={() => setToast((t) => ({ ...t, open: false }))}
    severity={toast.severity}
    variant="filled"
    sx={{ width: '100%' }}
  >
    {toast.msg}
  </Alert>
</Snackbar>

    </div>
  )
}