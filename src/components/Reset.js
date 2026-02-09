import React, { Component } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormControl,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export class Reset extends Component {
  state = {
    alertMessage: "",
    alertSeverity: "",
    openSnackbar: false,
    showPassword: false,
  };
componentDidMount() {
  const successMessage = this.props.location?.state?.successMessage;

  if (successMessage) {
    this.showAlert(successMessage, "success");
  }
}

  handleSubmit = async (e) => {
    e.preventDefault();

    const email = this.props.location?.state?.email;
    const newPassword = this.newPassword;
    const confirmPassword = this.confirmPassword;


    if (!newPassword || !confirmPassword) {
      this.showAlert("All fields are required", "error");
      return;
    }

    if (newPassword !== confirmPassword) {
      this.showAlert("Passwords do not match", "error");
      return;
    }

    try {
      const res = await fetch(
        "http://localhost:8080/api/auth/reset-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, newPassword, confirmPassword }),
        }
      );

      const msg = await res.text();

      if (!res.ok) {
        this.showAlert(msg, "error");
        return;
      }

      this.showAlert("Password reset successful!", "success");
      setTimeout(() => this.props.navigate("/"), 1500);
    } catch {
      this.showAlert("Server error", "error");
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

  togglePassword = () => {
    this.setState((prev) => ({ showPassword: !prev.showPassword }));
  };

  render() {
    const { openSnackbar, alertMessage, alertSeverity, showPassword } =
      this.state;

    return (
      <div className="forgot-pass-wrapper">
        <form className="forgot-pass-form" onSubmit={this.handleSubmit}>
          <h3>Reset Password</h3>

          <Box sx={{ mb: 2 }}>
            <FormControl fullWidth>
              <InputLabel>New Password</InputLabel>
              <OutlinedInput
                type={showPassword ? "text" : "password"}
                onChange={(e) => (this.newPassword = e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={this.togglePassword}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="New Password"
              />
            </FormControl>
          </Box>

          <Box sx={{ mb: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Confirm Password</InputLabel>
              <OutlinedInput
                type={showPassword ? "text" : "password"}
                onChange={(e) => (this.confirmPassword = e.target.value)}
                label="Confirm Password"
              />
            </FormControl>
          </Box>

          <button className="submit-btn">Submit</button>
        </form>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={1500}
          onClose={this.handleClose}
          anchorOrigin={{vertical:"top", horizontal:"right"}}
        >
          <Alert severity={alertSeverity} variant="filled"  onClose={this.handleClose}>
            {alertMessage}
          </Alert>
        </Snackbar>
      </div>
    );
  }
}

function ResetWrapper() {
  const navigate = useNavigate();
  const location = useLocation();
  return <Reset navigate={navigate} location={location} />;
}

export default ResetWrapper;
