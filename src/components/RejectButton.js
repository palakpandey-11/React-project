// RejectButton.js
import React, { useEffect, useState } from 'react'
import {
  AppBar,
  IconButton,
  Typography,
  TextField,
  Button,
  Box,
  Modal,
  Snackbar,
  Alert,
  CircularProgress
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import axios from 'axios'

export default function RejectButton({
  openReject,
  onCloseReject,
  leaveRows = [],
  onRejected,      // callback: receives array of items just rejected
}) {
  const [rowsToReject, setRowsToReject] = useState(leaveRows)
  const [remarks, setRemarks]           = useState('')
  const [loading, setLoading]           = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMsg, setSnackbarMsg]   = useState('')

  // keep rowsToReject in sync with props
  useEffect(() => {
    setRowsToReject(leaveRows)
  }, [leaveRows])

  const handleModalReject = async () => {
    if (!remarks.trim()) return
    setLoading(true)

    // 1) Future‐proof API call
    try {
      await axios.post(
        '/ahWorkwave/reject',
        rowsToReject.map(r => r.id),
        { headers: { 'Content-Type': 'application/json' } }
      )
    } catch (e) {
      console.error('API reject failed', e)
      // you may choose to bail out here
    }

    // 2) Build our rejected items
    const rejectedItems = rowsToReject.map(r => ({
      ...r,
      status: 'Rejected',
      reason: remarks
    }))

    // 3) Persist into localStorage.closedRows
    const existing = JSON.parse(localStorage.getItem('closedRows') || '[]')
    localStorage.setItem(
      'closedRows',
      JSON.stringify([...existing, ...rejectedItems])
    )

    // 4) Notify parent so it can remove them from activeRows
    onRejected(rejectedItems)

    // 5) Show success toast & cleanup
    setSnackbarMsg('Rejected successfully')
    setSnackbarOpen(true)
    onCloseReject()
    setRemarks('')
    setLoading(false)
  }

  return (
    <>
      <Modal
        open={openReject}
        onClose={onCloseReject}
        BackdropProps={{
          sx: {
            backdropFilter: 'blur(3px)',
            backgroundColor: 'rgba(0,0,0,0.4)',
          }
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            width: 420,
            bgcolor: 'rgba(255,255,255,0.85)',
            boxShadow: 24,
            borderRadius: 2,
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            gap: 2
          }}
        >
          <AppBar sx={{ height: 50, mb: 2, position: 'relative' }}>
            <Typography variant="h6" sx={{ p: 1 }}>
              Reject Request
            </Typography>
            <IconButton
              color="inherit"
              onClick={onCloseReject}
              sx={{ position: 'absolute', right: 8, top: 8 }}
            >
              <CloseIcon />
            </IconButton>
          </AppBar>

          <Typography >
            Are you sure you want to reject these {rowsToReject.length} application
            {rowsToReject.length > 1 ? 's' : ''}?
          </Typography>

          <TextField
            fullWidth
            multiline
            rows={2}
            placeholder="Enter reason here"
            value={remarks}
            onChange={e => setRemarks(e.target.value)}
          />

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <Button
              variant="outlined"
              onClick={onCloseReject}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleModalReject}
              disabled={!remarks.trim() || loading}
            >
              {loading ? <CircularProgress size={20} /> : 'Reject'}
            </Button>
          </Box>
        </Box>
      </Modal>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarMsg}
        </Alert>
      </Snackbar>
    </>
  )
}
