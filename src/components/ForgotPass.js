import React, { Component } from "react";
import { useNavigate } from 'react-router-dom';
import { Box, TextField , Snackbar, Alert} from "@mui/material";
import "./../style/ForgotPass.css";

class ForgotPass extends Component {

 state = {
    showError: false,
  };
  handleSubmit = (e) => {
    e.preventDefault();
 const email = this.emailInput?.value;
    if (!email || !email.includes("@")) {
      this.setState({ showError: true });

     
      setTimeout(() => {
        this.setState({ showError: false });
      }, 1500);

    return;
  }
      this.props.navigate("/reset");
  };
  render() {
    return (
      <div className="forgot-pass-wrapper">

        <Snackbar
          open={this.state.showError}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert severity="error" variant="filled">
            Please enter a valid email address.
          </Alert>
        </Snackbar>

        <form className="forgot-pass-form" onSubmit={this.handleSubmit}>
          <h3>Forgot Password</h3>
            <Box sx={{ width: 500, maxWidth: '100%',  mb: 2 }}>
      <TextField fullWidth 
      label="Email" 
      id="email"
      inputRef={(ref) => this.emailInput = ref}
       />
    </Box>
 
          <button className="submit-btn" >Submit</button>
        </form>
      </div>
    );
  }
}
function ForgotPassWrapper() {
  const navigate = useNavigate();
  return <ForgotPass navigate={navigate} />;
}
export default ForgotPassWrapper;