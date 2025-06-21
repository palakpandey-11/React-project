import React, { Component } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { Box,InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
FormControl } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export class Reset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertMessage: "",
      alertSeverity: "",       // 'success' | 'error'
      openSnackbar: false,
      showCurrentPassword: false,
      showNewPassword: false,
      email: ""
    };
  }

  // Toggle handlers for each field
  handleClickShowCurrent = () =>
    this.setState((s) => ({ showCurrentPassword: !s.showCurrentPassword }));
  handleClickShowNew = () =>
    this.setState((s) => ({ showNewPassword: !s.showNewPassword }));
  handleMouseDownPassword = (e) => e.preventDefault();

  handleSubmit = async (e) => {
    e.preventDefault();
    const email = this.state.email;
    const next = this.newPassword;
    if (!email || !next) {
      this.showAlert("Please fill in all fields", "error");
    } else if (next.length < 6) {
      this.showAlert("Password must be at least 6 characters", "error");
    } else {
      try {
        await axios.post('http://localhost:8080/api/auth/reset-password', {
          email,
          password: next
        });
        this.showAlert("Password reset successful!", "success");
        setTimeout(() => {
          this.props.navigate("/");
        }, 1500);
      } catch (error) {
        this.showAlert("Password reset failed", "error");
      }
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

          {/* Email Field */}
          <Box sx={{ width: 600, maxWidth: "100%", mb: 2 }}>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="email">Email</InputLabel>
              <OutlinedInput
                id="email"
                type="email"
                autoComplete="email"
                value={this.state.email}
                onChange={(e) => this.setState({ email: e.target.value })}
                label="Email"
              />
            </FormControl>
          </Box>

          {/* New Password Field */}
          <Box sx={{ width: 600, maxWidth: "100%", mb: 2 }}>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="new-password">New Password</InputLabel>
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
function ResetWithNavigate(props) {
  const navigate = useNavigate();
  return <Reset {...props} navigate={navigate} />;
}

export default ResetWithNavigate;