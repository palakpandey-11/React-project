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
import OrganizationChart from './components2/OrganizationChart.js';
import Bank from './components2/Bank.js';
import FamilyDetails from './components2/FamilyDetails.js';
import PositionHistory from './components2/PositionHistory.js';
import PreviousEmp from './components2/PreviousEmp.js';
import Separation from './components2/Separation.js';
import CardDetails from './components2/CardDetails.js';
import EmpDoc from './components2/EmpDoc.js';
import Company from './components2/Company.js';
import PolicyForm from './components2/PolicyForm.js';
import Form from './components2/Form.js';
import Letter from './components2/Letter.js';
import PrepLetter from './components2/PrepLetter.js';
import Edit from './components2/Edit.js';
import ExcelImport from './components2/ExcelImport.js';
import ImportExcel from './components2/ImportExcel.js';
import Bulletin from './components2/Bulletin.js';
import AddBulletin from './components2/AddBulletin.js';
import MassCom from './components2/MassCom.js';
import Compose from './components2/Compose.js';
import AddEmp from './components2/AddEmp.js';
import Info from './components2/Info.js';
=========
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
>>>>>>>>> Temporary merge branch 2

function App() {
  return (
    <Router>
      <Routes>
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
        <Route path='/organizationchart' element={<OrganizationChart />} />
        <Route path='/bank' element={<Bank />} />
        <Route path='/familydetails' element={<FamilyDetails />} />
        <Route path='/positionhistory' element={<PositionHistory />} />
        <Route path='/previousemp' element={<PreviousEmp />} />
        <Route path='/separation' element={<Separation />} />
        <Route path='/carddetails' element={<CardDetails />} />
        <Route path='/empdoc' element={<EmpDoc />} />
        <Route path='/company' element={<Company />} />
        <Route path='/policyform' element={<PolicyForm />} />
        <Route path='/form' element={<Form />} />
        <Route path='/letter' element={<Letter />} />
        <Route path='/prepletter' element={<PrepLetter />} />
        <Route path='/edit' element={<Edit />} />
        <Route path='/excelimport' element={<ExcelImport />} />
        <Route path='/importexcel' element={<ImportExcel />} />
        <Route path='/bulletin' element={<Bulletin />} />
        <Route path='/addbulletin' element={<AddBulletin />} />
        <Route path='/masscom' element={<MassCom />} />
        <Route path='/compose' element={<Compose />} />
        <Route path='/addemp' element={<AddEmp />} />
        <Route path='/info' element={<Info />} />
        <Route path="/payrollprocess" element={<PayrollProcess/>} />
      </Routes>
    </Router>
  );
}

export default App;
