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
import Reports from './components/Reports.js';
import Timesheet from './components/Timesheet.js';
import ClientReport from './components/ClientReport.js';
import UpdateEmp from './components2/UpdateEmp.js';
import Analytics from './components2/Analytics.js';
import SalaryUpdate from "./component2/SalaryUpdate.js";
import LoanInput from "./component2/LoanInput.js";
import IncomeTax from "./component2/IncomeTax.js";
import Arrears from "./component2/Arrears.js";
import PayArrears from "./component2/PayArrears.js";
import FinalSettlement from "./component2/FinalSettlement.js";
import SettleEmployee from "./component2/SettleEmployee.js";
import QuickSalaryStatement from "./component2/QuickSalaryStatement.js";
import ShrinkLossDashboard from "./component2/ShrinkLossDashboard.js";
import BankTransfer from "./component2/BankTransfer.js";
import PayrollStatement from "./component2/PayrollStatement.js";
import ReturnLogistics from "./component2/ReturnLogistics.js";
import InStore from "./component2/InStore.js";
import FormSixteen from "./component2/FormSixteen.js";
import ProceedBtn from "./component2/ProceedBtn.js";
import GenerateForm16 from "./component2/GenerateForm16.js";
import VarifyPartA from "./component2/VarifyPartA.js"
import Form24Q from "./component2/Form24Q.js";
import ChallansPage from "./component2/ChallanPage.js";
import EmployeeITDeclaration from "./component2/EmployeeITDeclaration.js";
import POIOverview from "./component2/POIOverview.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/shrinklossdashboard" element={<ShrinkLossDashboard/>} />
         <Route path="/returns" element={<ReturnLogistics />} />
         <Route path="/instore" element={<InStore/>} />
        <Route path="/" element={<Signup />} />
        <Route path="/forgotpass" element={<ForgotPass />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/updatepayroll" element={<UpdatePayrollData />} />
        <Route path="/salary" element={<SalaryUpdate/>} />
        <Route path='/loan' element={<LoanInput/>} />
        <Route path='/incometax' element={<IncomeTax/>} />
        <Route path='/arrears'element={<Arrears/>} />
        <Route path='/arrears/payarrears' element={< PayArrears/>} />
        <Route path='/finalsettlement' element={<FinalSettlement/>} />
        <Route path='/finalsettlement/settleEmployee' element={<SettleEmployee/>} />
        <Route path="/quickSalary" element={<QuickSalaryStatement/>} />
        <Route path="/payrollstatement" element={<PayrollStatement/>} />
        <Route path="/banktransfer" element={<BankTransfer/>}/>
        <Route path="/form16" element={<FormSixteen />}/>
        <Route path="/form16/procced" element={<ProceedBtn/>} />
        <Route path="/form16/generateForm" element={<GenerateForm16 />} />
        <Route path="/form16/verify-part-a" element={<VarifyPartA/>} />
        <Route path="/form24q" element={< Form24Q />} />
        <Route path="/form24q/challans" element={<ChallansPage/>}/>
        <Route path="/employeeitdeclaration" element={<EmployeeITDeclaration/>}/>
        <Route path="/poioverview" element={<POIOverview/>} />
        <Route path="/timesheettable" element={<TimesheetTable />} />
        <Route path="/holidaycalendar" element={<HolidayCalendar />} />
        <Route path="/leavepage" element={<LeavePage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/approvals" element={<Approvals />} />
        <Route path="/approvals/closed" element={<ClosedApprovals />} />
        <Route path="/approvals/reconcilation" element={<ReconcilationApproval />} />
        <Route path="/leavereconcilation" element={<LeaveReconcilation empID="12345" projectId="P001" />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/timesheet" element={<Timesheet />} />
        <Route path='/clientreport' element={<ClientReport />} />
        <Route path='/updateemp' element={<UpdateEmp />} />
        <Route path='/analytics' element={<Analytics />} />
      </Routes>
    </Router>
  );
}

export default App;
