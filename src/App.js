import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup.js";
import Dashboard from "./components/Dashboard.js";
import HolidayCalendar from "./components/HolidayCalendar.js";
import ForgotPass from "./components/ForgotPass.js";
import Reset from "./components/Reset.js";
import TimesheetTable from "./components/TimesheetTable.js";
import LeavePage from "./components/LeavePage.js";
import HistoryPage from './components/HistoryPage.js';
import Approvals from './components/Approvals.js';
import ClosedApprovals from './components/ClosedApprovals.js';
import ReconcilationApproval from './components/ReconcilationApproval.js';
import LeaveReconcilation from './components/LeaveReconcilation.js';
import Welcome from "./component2/Welcome.js";
import UpdatePayrollData from "./component2/UpdatePayrollData.js";

function App() {
    return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/forgotpass" element={<ForgotPass />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/welcome" element={<Welcome/>}/>
        <Route path="/updatepayroll" element={<UpdatePayrollData/>}/>
        <Route path="/timesheettable" element={<TimesheetTable />} />
        <Route path="/holidaycalendar" element={<HolidayCalendar />} />
        <Route path="/leavepage" element={<LeavePage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path='/approvals' element={<Approvals />}/>
        <Route path="/approvals/closed" element={<ClosedApprovals />} />
        <Route path='/approvals/reconcilation' element={<ReconcilationApproval/>} />
        <Route path='/leaveReconcilation' element={<LeaveReconcilation/>} />
      </Routes>
    </Router>
  );

}
 
export default App;
