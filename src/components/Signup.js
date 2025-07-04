import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../style/Signup.css";
import { FiEye, FiEyeOff } from "react-icons/fi";
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import axios from 'axios';


function Signin () {

  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [toastState, setToastState] = useState({ show: false, message: "", type: "" });
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        employeeId,
        password,
      });
      // Assuming backend returns user data and a token
      const { user, token } = response.data;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      triggerToast("Signed in successfully!", "success");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      const message = error.response?.data?.message || "Login failed";
      triggerToast(message, "error");
    }
  };

  const triggerToast = (message, type) => {
    setToastState({ show: true, message, type });
    setTimeout(() => {
      setToastState({ show: false, message: "", type: "" });
    }, 3000);
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
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
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

          <p className="reset-link">
            <span style={{cursor: 'pointer', color: '#1976d2', textDecoration: 'underline'}} onClick={() => navigate('/forgotpass')}>
              Reset Password?
            </span>
          </p>
        </form>
      </div>
    </div>
      {toastState.show && (
        <div className={`custom-toast ${toastState.type}`}>{toastState.message}</div>
      )}
    </>
  );
}


export default Signin;