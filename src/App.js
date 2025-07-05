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
import Reports from './components/Reports.js';
import Timesheet from './components/Timesheet.js';
import ClientReport from './components/ClientReport.js';
import Welcomepage from './components2/Welcomepage.js';
import UpdateEmp from './components2/UpdateEmp.js';

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
        <Route path="/leavepage" element={<LeavePage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path='/approvals' element={<Approvals />}/>
        <Route path="/approvals/closed" element={<ClosedApprovals />} />
        <Route path='/approvals/reconcilation' element={<ReconcilationApproval/>} />
        <Route path='/reports' element={<Reports/>} />
        <Route path='/timesheet' element={<Timesheet />} />
        <Route path='/clientreport' element={<ClientReport />} />
        <Route path='/welcomepage' element={<Welcomepage />} />
        <Route path='/updateemp' element={<UpdateEmp />} />
      </Routes>
    </Router>
  );

}
 
export default App;