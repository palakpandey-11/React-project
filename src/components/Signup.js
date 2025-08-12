import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../style/Signup.css";
import { FiEye, FiEyeOff } from "react-icons/fi";
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

function Signin() {
  const [empId, setEmpId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [toastState, setToastState] = useState({ show: false, message: "", type: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const employees = [
    { empId: "hr000", password: "pass000", name: "HR", role: "hr", gender: "male" },
    { empId: "man001", password: "pass001", name: "Pankaj Sir", role: "manager", gender: "male" },
    { empId: "emp002", password: "pass002", name: "Pranali Bagul", role: "employee", gender: "female" },
    { empId: "emp003", password: "pass003", name: "Palak Pandey", role: "employee", gender: "female" },
  ];

  const handleSignup = (e) => {
    e.preventDefault();
    const user = employees.find(emp => emp.empId === empId);

    if (!user) {
      triggerToast("Employee ID not found", "error");
    } else if (user.password !== password) {
      triggerToast("Incorrect password", "error");
    } else {
      localStorage.setItem("user", JSON.stringify(user));
      triggerToast("Signed in successfully!", "success");
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        navigate("/dashboard");
      }, 2500);
    }
  };

  const triggerToast = (message, type) => {
    setToastState({ show: true, message, type });
    setTimeout(() => {
      setToastState({ show: false, message: "", type: "" });
    }, 2500);
  };

  return (
    <>
      <div className="signup-container" style={{ position: "relative" }}>
        {isLoading && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(255,255,255,0.4)",
              backdropFilter: "blur(8px)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 10,
            }}
          >
            <CircularProgress size={60} thickness={4.5} />
            <p style={{ marginTop: "12px", fontWeight: "500", color: "#333" }}>Redirecting to Dashboard...</p>
          </div>
        )}

        <div className="form-box">
          <div className="logo">Stibium</div>
          <h2>Sign In</h2>
          <form onSubmit={handleSignup}>
            <Box mb={3}>
              <TextField
                fullWidth
                required
                label="Employee ID"
                variant="outlined"
                value={empId}
                onChange={(e) => setEmpId(e.target.value)}
              />
            </Box>
            <Box mb={3}>
              <TextField
                fullWidth
                required
                label="Password"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <div className="button-group">
              <button type="button" className="cancel" onClick={() => navigate("/")}>
                Cancel
              </button>
              <button type="submit" className="submit">Submit</button>
            </div>

            <p className="reset-link"> <Link to="/forgotpass">Reset Password?</Link></p>
          </form>
        </div>
      </div>

      <Snackbar
        open={toastState.show}
        autoHideDuration={3000}
        onClose={() => setToastState({ show: false, message: "", type: "" })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setToastState({ show: false, message: "", type: "" })}
          severity={toastState.type}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {toastState.message}
        </Alert>
      </Snackbar>
    </>
  );
}
export default Signin;
