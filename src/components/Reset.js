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
    step: "OTP", // OTP | PASSWORD
    otp: "",
    alertMessage: "",
    alertSeverity: "",
    openSnackbar: false,
    showPassword: false,
    loading: false,
  };
componentDidMount() {
  const successMessage = this.props.location?.state?.successMessage;

  if (successMessage) {
    this.showAlert(successMessage, "success");
  }
}

showAlert = (message, severity) => {
    this.setState({
      alertMessage: message,
      alertSeverity: severity,
      openSnackbar: true,
    });
  };

  handleOtpVerify = async (e) => {
    e.preventDefault();
    const { otp } = this.state;
    const email = this.props.location?.state?.email;

    if (otp.length !== 6) {
      this.showAlert("Enter valid 6 digit OTP", "error");
      return;
    }

    try {
      const res = await fetch(
        "http://localhost:8080/api/auth/verify-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp }),
        }
      );

      if (!res.ok) throw new Error();

      this.showAlert("OTP verified successfully", "success");
      this.setState({ step: "PASSWORD" });

    } catch {
      this.showAlert("Invalid OTP", "error");
    }
  };

  handlePasswordSubmit = async (e) => {
    e.preventDefault();
    const email = this.props.location?.state?.email;
    const { newPassword, confirmPassword } = this;

    if (!newPassword || !confirmPassword) {
      this.showAlert("All fields required", "error");
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
          body: JSON.stringify({ email, newPassword }),
        }
      );

      if (!res.ok) throw new Error();

      this.showAlert("Password reset successful", "success");
      setTimeout(() => this.props.navigate("/"), 1500);

    } catch {
      this.showAlert("Server error", "error");
    }
  };

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
  const { step, showPassword, openSnackbar, alertMessage, alertSeverity } = this.state;

  return (
    <div className="forgot-pass-wrapper">
      
      {step === "OTP" && (
        <form className="forgot-pass-form" onSubmit={this.handleOtpVerify}>
          <h3>Enter OTP</h3>

          <Box sx={{ mb: 2 }}>
            <OutlinedInput
              placeholder="Enter 6 digit OTP"
              inputProps={{ maxLength: 6 }}
              onChange={(e) => this.setState({ otp: e.target.value })}
            />
          </Box>

          <button className="submit-btn">Verify OTP</button>
        </form>
      )}

      {step === "PASSWORD" && (
        <form className="forgot-pass-form" onSubmit={this.handlePasswordSubmit}>
          <h3>Reset Password</h3>

          <Box sx={{ mb: 2 }}>
            <OutlinedInput
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              onChange={(e) => (this.newPassword = e.target.value)}
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <OutlinedInput
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              onChange={(e) => (this.confirmPassword = e.target.value)}
            />
          </Box>

          <button className="submit-btn">Submit</button>
        </form>
      )}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity={alertSeverity} variant="filled">
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
