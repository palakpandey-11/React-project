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

function Signup () {
  const [empId, setEmpId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [toastState, setToastState] = useState({ show: false, message: "", type: "" });
  const navigate = useNavigate();

  const employees = [
    { empId: "emp000", password: "pass000", name: "HR", role: "hr" },
    { empId: "emp001", password: "pass001", name: "Pankaj Sir", role: "manager" },
    { empId: "emp002", password: "pass002", name: "Pranali Bagul", role: "employee" },
    { empId: "emp003", password: "pass003", name: "Palak Pandey", role: "employee" },
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
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
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
      <div className="signup-container">
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

export default Signup;