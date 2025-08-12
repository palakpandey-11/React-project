import React, { Component } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useNavigate } from 'react-router-dom';
import { Box, TextField,InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
FormControl } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";


export class Reset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertMessage: "",
      alertSeverity: "",       // 'success' | 'error'
      openSnackbar: false,
      showCurrentPassword: false,
      showNewPassword: false,
    };
  }

  // Toggle handlers for each field
  handleClickShowCurrent = () =>
    this.setState((s) => ({ showCurrentPassword: !s.showCurrentPassword }));
  handleClickShowNew = () =>
    this.setState((s) => ({ showNewPassword: !s.showNewPassword }));
  handleMouseDownPassword = (e) => e.preventDefault();

  handleSubmit = (e) => {
    e.preventDefault();
    const current = this.currentPassword;
    const next = this.newPassword;

    if (!current || !next) {
      this.showAlert("Please fill in all fields", "error");
    } else if (next.length < 6) {
      this.showAlert("Password must be at least 6 characters", "error");
    } else if (current !== next) {
      this.showAlert("Passwords do not match", "error");
    } else {
      this.showAlert("Password reset successful!", "success"); setTimeout(() => { this.props.navigate("/"); }, 1500);
    }
  };

  showAlert = (message, severity) => {
    this.setState({
      alertMessage: message,
      alertSeverity: severity,
      openSnackbar: true,
    });
  };

  handleClose = () => {
    this.setState({ openSnackbar: false });
  };

  render() {
    const {
      alertMessage,
      alertSeverity,
      openSnackbar,
      showCurrentPassword,
      showNewPassword,
    } = this.state;

    return (
      <div className="forgot-pass-wrapper">
        <form className="forgot-pass-form" onSubmit={this.handleSubmit}>
          <h3>Reset Password</h3>

          {/* Current Password Field */}
          <Box sx={{ width: 600, maxWidth: "100%", mb: 2 }}>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="current-password">
                Current Password
              </InputLabel>
              <OutlinedInput
                id="current-password"
                type={showCurrentPassword ? "text" : "password"}
                autoComplete="current-password"
                onChange={(e) => (this.currentPassword = e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showCurrentPassword
                          ? "Hide current password"
                          : "Show current password"
                      }
                      onClick={this.handleClickShowCurrent}
                      onMouseDown={this.handleMouseDownPassword}
                      edge="end"
                    >
                      {showCurrentPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                label="Current Password"
              />
            </FormControl>
          </Box>

          {/* New Password Field */}
          <Box sx={{ width: 600, maxWidth: "100%", mb: 2 }}>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="new-password">Confirm Password</InputLabel>
              <OutlinedInput
                id="new-password"
                type={showNewPassword ? "text" : "password"}
                autoComplete="new-password"
                onChange={(e) => (this.newPassword = e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showNewPassword
                          ? "Hide new password"
                          : "Show new password"
                      }
                      onClick={this.handleClickShowNew}
                      onMouseDown={this.handleMouseDownPassword}
                      edge="end"
                    >
                      {showNewPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                label="New Password"
              />
            </FormControl>
          </Box>

          <button className="submit-btn">Submit</button>
        </form>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={this.handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={this.handleClose}
            severity={alertSeverity}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {alertMessage}
          </Alert>
        </Snackbar>
      </div>
    );
  }
}
function ResetWrapper() {
  const navigate = useNavigate();
  return <Reset navigate={navigate} />;
}


export default ResetWrapper;