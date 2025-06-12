import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup.js";
import Dashboard from "./components/Dashboard.js";
import HolidayCalendar from "./components/HolidayCalendar.js";
import ForgotPass from "./components/ForgotPass.js";
import Reset from "./components/Reset.js";
import TimesheetTable from "./components/TimesheetTable.js";

function App() {
    return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/forgotpass" element={<ForgotPass />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/timesheettable" element={<TimesheetTable />} />
        <Route path="/holidaycalendar" element={<HolidayCalendar />} />
      </Routes>
    </Router>
  );

}
 
export default App;
