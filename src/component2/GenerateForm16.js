import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Select,
  MenuItem,
  TextareaAutosize,
  Button,
  Divider,
  Paper,
  Stack,
  useMediaQuery,
  Breadcrumbs,
} from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';
import { Download, Eye, User, Building, Calculator } from "lucide-react";
import Header from "./Header";
import MuiLink from '@mui/material/Link';

const fieldSx = {
  "& .MuiInputBase-root": {
  //  bgcolor: "rgba(255,255,255,0.04)",
    borderRadius: 2,
    color: "#E6F1FF",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(230,241,255,0.2)",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(130,200,255,0.5)",
  },
  "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#56CCF2",
    boxShadow: "0 0 0 3px rgba(86, 204, 242, 0.25)",
  },
  "& .MuiInputBase-input, & .MuiSelect-select": {
    p: 1.5,
  },
  label: { color: "rgba(230,241,255,0.8)" },
  "& .MuiFormLabel-root": { color: "rgba(230,241,255,0.7)" },
  "& .MuiFormLabel-root.Mui-focused": { color: "#8CD3FF" },
};

const badge = (on) => ({
  width: 34,
  height: 34,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 700,
  fontSize: 14,
  color: on ? "#0B1424" : "rgba(230,241,255,0.7)",
  bgcolor: on ? "#56CCF2" : "rgba(255,255,255,0.12)",
  boxShadow: on ? "0 0 24px rgba(86,204,242,.45)" : "none",
  transition: "all .25s ease",
});

const frostedCard = {
  bgcolor: "rgba(10,16,30,0.55)",
  border: "1px solid rgba(255,255,255,0.12)",
  boxShadow: "0 8px 40px rgba(0,0,0,.45), inset 0 0 40px rgba(69,142,255,.06)",
  backdropFilter: "blur(10px)",
  borderRadius: 3,
};

const sectionTitle = {
  display: "flex",
  alignItems: "center",
  gap: 1,
  color: "#CBE7FF",
  mb: 2,
  fontWeight: 700,
};

const cardInset = {
  p: 2,
  borderRadius: 2,
  border: "1px solid rgba(255,255,255,0.08)",
  bgcolor: "rgba(86,204,242,0.06)",
};

const btn = {
  px: 3,
  py: 1.25,
  borderRadius: 2,
  textTransform: "none",
  fontWeight: 700,
};

const docCell = {
  border: "1px solid #1C2A43",
  px: 1.25,
  py: 1,
};

const GenerateForm16 = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState({
    // Employer
    employerName: "",
    employerAddress: "",
    employerPAN: "",
    employerTAN: "",
    // Employee
    employeeName: "",
    employeePAN: "",
    employeeAddress: "",
    employeeDesignation: "",
    // Period
    financialYear: "2023-24",
    assessmentYear: "2024-25",
    periodFrom: "2023-04-01",
    periodTo: "2024-03-31",
    // Salary
    basicSalary: "",
    hra: "",
    specialAllowance: "",
    perquisites: "",
    profitsInLieu: "",
    // Deductions
    standardDeduction: "50000",
    entertainmentAllowance: "",
    professionalTax: "",
    // TDS
    q1Tds: "",
    q2Tds: "",
    q3Tds: "",
    q4Tds: "",
    q1Receipt: "",
    q2Receipt: "",
    q3Receipt: "",
    q4Receipt: "",
    // Verification
    place: "",
    date: "",
    signatoryName: "",
    signatoryDesignation: "",
  });

  const handleInputChange = (field, value) =>
    setFormData((p) => ({ ...p, [field]: value }));

  const calculateTotals = () => {
    const n = (v) => parseFloat(String(v)) || 0;
    const grossSalary =
      n(formData.basicSalary) +
      n(formData.hra) +
      n(formData.specialAllowance) +
      n(formData.perquisites) +
      n(formData.profitsInLieu);
    const totalDeductions =
      n(formData.standardDeduction) +
      n(formData.entertainmentAllowance) +
      n(formData.professionalTax);
    const taxableIncome = grossSalary - totalDeductions;
    const totalTds =
      n(formData.q1Tds) + n(formData.q2Tds) + n(formData.q3Tds) + n(formData.q4Tds);
    return { grossSalary, totalDeductions, taxableIncome, totalTds };
  };

  const isSm = useMediaQuery("(max-width:900px)");

  const EmployerDetails = (
    <Box>
      <Typography sx={sectionTitle}>
        <Building size={18} />
        Employer Details
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Company Name *"
            value={formData.employerName}
            onChange={(e) => handleInputChange("employerName", e.target.value)}
            sx={fieldSx}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            label="Company PAN *"
            value={formData.employerPAN}
            inputProps={{ maxLength: 10, style: { textTransform: "uppercase" } }}
            onChange={(e) => handleInputChange("employerPAN", e.target.value.toUpperCase())}
            sx={fieldSx}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            label="Company TAN *"
            value={formData.employerTAN}
            inputProps={{ maxLength: 10, style: { textTransform: "uppercase" } }}
            onChange={(e) => handleInputChange("employerTAN", e.target.value.toUpperCase())}
            sx={fieldSx}
          />
        </Grid>

        <Grid item xs={12}>
          <Box sx={cardInset}>
            <Typography sx={{ mb: 1, color: "rgba(230,241,255,0.9)" }}>
              Company Address *
            </Typography>
            <TextareaAutosize
              minRows={3}
              placeholder="Enter complete company address"
              value={formData.employerAddress}
              onChange={(e) => handleInputChange("employerAddress", e.target.value)}
              style={{
                width: "90%",
                background: "transparent",
                color: "#E6F1FF",
                borderRadius: 8,
                border: "1px solid rgba(255,255,255,0.2)",
                padding: 12,
                outline: "none",
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );

  const EmployeeDetails = (
    <Box>
      <Typography sx={sectionTitle}>
        <User size={18} />
        Employee Details
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Full Name *"
            value={formData.employeeName}
            onChange={(e) => handleInputChange("employeeName", e.target.value.toUpperCase())}
            sx={fieldSx}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            label="Employee PAN *"
            value={formData.employeePAN}
            inputProps={{ maxLength: 10, style: { textTransform: "uppercase" } }}
            onChange={(e) => handleInputChange("employeePAN", e.target.value.toUpperCase())}
            sx={fieldSx}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            label="Designation *"
            value={formData.employeeDesignation}
            onChange={(e) => handleInputChange("employeeDesignation", e.target.value)}
            sx={fieldSx}
          />
        </Grid>

        <Grid item xs={12}>
          <Box sx={cardInset}>
            <Typography sx={{ mb: 1, color: "rgba(230,241,255,0.9)" }}>
              Employee Address *
            </Typography>
            <TextareaAutosize
              minRows={3}
              placeholder="Enter complete address"
              value={formData.employeeAddress}
              onChange={(e) => handleInputChange("employeeAddress", e.target.value)}
              style={{
                width: "100%",
                background: "transparent",
                color: "#E6F1FF",
                borderRadius: 8,
                border: "1px solid rgba(255,255,255,0.2)",
                padding: 12,
                outline: "none",
              }}
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box>
            <Typography sx={{ mb: 0.5, color: "rgba(230,241,255,0.9)" }}>
              Financial Year
            </Typography>
            <Select
              fullWidth
              value={formData.financialYear}
              onChange={(e) => handleInputChange("financialYear", String(e.target.value))}
              sx={fieldSx}
            >
              <MenuItem value="2023-24">2025-26</MenuItem>
              <MenuItem value="2022-23">2024-25</MenuItem>
              <MenuItem value="2021-22">2023-24</MenuItem>
            </Select>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box>
            <Typography sx={{ mb: 0.5, color: "rgba(230,241,255,0.9)" }}>
              Assessment Year
            </Typography>
            <Select
              fullWidth
              value={formData.assessmentYear}
              onChange={(e) => handleInputChange("assessmentYear", String(e.target.value))}
              sx={fieldSx}
            >
              <MenuItem value="2024-25">2025-26</MenuItem>
              <MenuItem value="2023-24">2024-25</MenuItem>
              <MenuItem value="2022-23">2023-24</MenuItem>
            </Select>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );

  const SalaryDetails = (
    <Box>
      <Typography sx={sectionTitle}>
        <Calculator size={18} />
        Salary & Income Details
      </Typography>

      <Box sx={{ ...cardInset, bgcolor: "rgba(76,139,245,0.08)", mb: 2 }}>
        <Typography sx={{ fontWeight: 700, mb: 2, color: "#CBE7FF" }}>
          Gross Salary Components
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="number"
              label="Basic Salary (₹) *"
              value={formData.basicSalary}
              onChange={(e) => handleInputChange("basicSalary", e.target.value)}
              sx={fieldSx}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="number"
              label="HRA (₹)"
              value={formData.hra}
              onChange={(e) => handleInputChange("hra", e.target.value)}
              sx={fieldSx}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="number"
              label="Special Allowance (₹)"
              value={formData.specialAllowance}
              onChange={(e) => handleInputChange("specialAllowance", e.target.value)}
              sx={fieldSx}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="number"
              label="Perquisites (₹)"
              value={formData.perquisites}
              onChange={(e) => handleInputChange("perquisites", e.target.value)}
              sx={fieldSx}
            />
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ ...cardInset, bgcolor: "rgba(56,193,114,0.08)", mb: 2 }}>
        <Typography sx={{ fontWeight: 700, mb: 2, color: "#CBE7FF" }}>
          Deductions
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="number"
              label="Standard Deduction (₹)"
              value={formData.standardDeduction}
              onChange={(e) => handleInputChange("standardDeduction", e.target.value)}
              sx={fieldSx}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="number"
              label="Professional Tax (₹)"
              value={formData.professionalTax}
              onChange={(e) => handleInputChange("professionalTax", e.target.value)}
              sx={fieldSx}
            />
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ ...cardInset, bgcolor: "rgba(255,91,91,0.08)" }}>
        <Typography sx={{ fontWeight: 700, mb: 2, color: "#CBE7FF" }}>
          Quarterly TDS Details
        </Typography>
        <Grid container spacing={2}>
          {[1, 2, 3, 4].map((q) => (
            <Grid key={q} item xs={12} md={6}>
              <Box sx={{ p: 2, borderRadius: 2, border: "1px dashed rgba(255,255,255,0.12)" }}>
                <Typography sx={{ mb: 1, color: "rgba(230,241,255,0.9)", fontWeight: 700 }}>
                  Quarter {q}
                </Typography>
                <Stack spacing={1.5}>
                  <TextField
                    fullWidth
                    type="number"
                    label="TDS Amount (₹)"
                    value={formData[`q${q}Tds`]}
                    onChange={(e) => handleInputChange(`q${q}Tds`, e.target.value)}
                    sx={fieldSx}
                  />
                  <TextField
                    fullWidth
                    label="Receipt Number"
                    value={formData[`q${q}Receipt`]}
                    onChange={(e) => handleInputChange(`q${q}Receipt`, e.target.value)}
                    sx={fieldSx}
                  />
                </Stack>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ ...cardInset, bgcolor: "rgba(255,255,255,0.06)" }}>
        <Typography sx={{ fontWeight: 700, mb: 2, color: "#CBE7FF" }}>
          Verification Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Place"
              value={formData.place}
              onChange={(e) => handleInputChange("place", e.target.value)}
              sx={fieldSx}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              type="date"
              label="Date"
              InputLabelProps={{ shrink: true }}
              value={formData.date}
              onChange={(e) => handleInputChange("date", e.target.value)}
              sx={fieldSx}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Signatory Name"
              value={formData.signatoryName}
              onChange={(e) => handleInputChange("signatoryName", e.target.value)}
              sx={fieldSx}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Signatory Designation"
              value={formData.signatoryDesignation}
              onChange={(e) => handleInputChange("signatoryDesignation", e.target.value)}
              sx={fieldSx}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );

  const Form16Preview = () => {
    const { grossSalary, totalDeductions, taxableIncome, totalTds } = calculateTotals();

    const cellRight = { ...docCell, textAlign: "right" };
    const cellLeft = { ...docCell, textAlign: "left" };

    return (
      <>
     

      <Paper
        elevation={0}
        sx={{
          mx: "auto",
          p: isSm ? 2 : 3,
          maxWidth: 980,
          bgcolor: "#ffffff",
          color: "#0F172A",
          borderRadius: 2,
          border: "1px solid #E2E8F0",
          fontFamily:
            "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New'",
          fontSize: 14,
        }}
      >
        <Box sx={{ textAlign: "center", borderBottom: "2px solid #0F172A", pb: 1.5, mb: 3 }}>
          <Typography sx={{ fontWeight: 900, fontSize: 20 }}>FORM No. 16</Typography>
          <Typography sx={{ fontWeight: 700, mt: 0.5 }}>[See rule 31(1)(a)]</Typography>
          <Typography sx={{ fontWeight: 800, mt: 1.5 }}>
            Certificate under section 203 of the Income-tax Act, 1961
          </Typography>
          <Typography>for tax deducted at source from salary</Typography>
        </Box>

<Box sx={{ mb: 4 }}>
  <Typography
    sx={{
      fontWeight: 800,
      bgcolor: "#F1F5F9",
      p: 1,
      mb: 2,
      textAlign: "center",
    }}
  >
    PART A
  </Typography>

  <Grid container spacing={2} justifyContent="center">
    <Grid item xs={12} md={5}>
      <Box className="doc-box">
        <Typography className="doc-title">Details of the Employer</Typography>
        <Box className="doc-content">
          <Typography><b>Name and address of the Employer:</b></Typography>
          <Typography>{formData.employerName || "[Employer Name]"}</Typography>
          <Typography>{formData.employerAddress || "[Employer Address]"}</Typography>
          <Typography><b>PAN:</b> {formData.employerPAN || "[PAN]"}</Typography>
          <Typography><b>TAN:</b> {formData.employerTAN || "[TAN]"}</Typography>
        </Box>
      </Box>
    </Grid>

    <Grid item xs={12} md={5}>
      <Box className="doc-box">
        <Typography className="doc-title">Details of the Employee</Typography>
        <Box className="doc-content">
          <Typography><b>Name and address of the Employee:</b></Typography>
          <Typography>{formData.employeeName || "[Employee Name]"}</Typography>
          <Typography>{formData.employeeAddress || "[Employee Address]"}</Typography>
          <Typography><b>PAN:</b> {formData.employeePAN || "[PAN]"}</Typography>
          <Typography><b>Designation:</b> {formData.employeeDesignation || "[Designation]"}</Typography>
        </Box>
      </Box>
    </Grid>
  </Grid>

  <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
    <Grid item xs={12} md={5}>
      <Box className="doc-box small">
        <Typography><b>Period:</b> {formData.periodFrom} to {formData.periodTo}</Typography>
      </Box>
    </Grid>
    <Grid item xs={12} md={5}>
      <Box className="doc-box small">
        <Typography><b>Assessment Year:</b> {formData.assessmentYear}</Typography>
      </Box>
    </Grid>
  </Grid>
</Box>

          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: 800, mb: 1.25 }}>
              Summary of tax deducted at source
            </Typography>
            <Box component="table" sx={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ ...docCell, textAlign: "left", background: "#F8FAFC" }}>Quarter</th>
                  <th style={{ ...docCell, textAlign: "right", background: "#F8FAFC" }}>
                    Receipt Numbers
                  </th>
                  <th style={{ ...docCell, textAlign: "right", background: "#F8FAFC" }}>
                    Amount (Rs.)
                  </th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4].map((q) => (
                  <tr key={q}>
                    <td style={cellLeft}>Quarter {q}</td>
                    <td style={cellRight}>{formData[`q${q}Receipt`] || "-"}</td>
                    <td style={cellRight}>
                      {(parseFloat(String(formData[`q${q}Tds`])) || 0).toLocaleString("en-IN")}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td style={{ ...docCell, background: "#F1F5F9", fontWeight: 800 }} colSpan={2}>
                    Total tax deducted at source
                  </td>
                  <td style={{ ...cellRight, background: "#F1F5F9", fontWeight: 800 }}>
                    {totalTds.toLocaleString("en-IN")}
                  </td>
                </tr>
              </tbody>
            </Box>
          </Box>

        <Box sx={{ mb: 4 }}>
           <Typography sx={{ fontWeight: 800, bgcolor: "#F1F5F9", p: 1, mb: 2, textAlign: "center" }}>
    PART B
  </Typography>

          <Box sx={{ mb: 2 }}>
            <Typography sx={{ fontWeight: 800, mb: 1.25 }}>1. GROSS SALARY</Typography>
            <Box component="table" sx={{ width: "100%", borderCollapse: "collapse" }}>
              <tbody>
                <tr>
                  <td style={cellLeft}>Basic Salary</td>
                  <td style={cellRight}>
                    {(parseFloat(formData.basicSalary || "0") || 0).toLocaleString("en-IN")}
                  </td>
                </tr>
                <tr>
                  <td style={cellLeft}>HRA</td>
                  <td style={cellRight}>
                    {(parseFloat(formData.hra || "0") || 0).toLocaleString("en-IN")}
                  </td>
                </tr>
                <tr>
                  <td style={cellLeft}>Special Allowance</td>
                  <td style={cellRight}>
                    {(parseFloat(formData.specialAllowance || "0") || 0).toLocaleString("en-IN")}
                  </td>
                </tr>
                <tr>
                  <td style={cellLeft}>Value of perquisites u/s 17(2)</td>
                  <td style={cellRight}>
                    {(parseFloat(formData.perquisites || "0") || 0).toLocaleString("en-IN")}
                  </td>
                </tr>
                <tr>
                  <td style={{ ...docCell, background: "#F1F5F9", fontWeight: 800 }}>
                    Total Gross Salary
                  </td>
                  <td style={{ ...cellRight, background: "#F1F5F9", fontWeight: 800 }}>
                    {grossSalary.toLocaleString("en-IN")}
                  </td>
                </tr>
              </tbody>
            </Box>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography sx={{ fontWeight: 800, mb: 1.25 }}>
              2. LESS: ALLOWANCES/DEDUCTIONS
            </Typography>
            <Box component="table" sx={{ width: "100%", borderCollapse: "collapse" }}>
              <tbody>
                <tr>
                  <td style={cellLeft}>Standard Deduction u/s 16(ia)</td>
                  <td style={cellRight}>
                    {(parseFloat(formData.standardDeduction || "0") || 0).toLocaleString("en-IN")}
                  </td>
                </tr>
                <tr>
                  <td style={cellLeft}>Professional tax u/s 16(iii)</td>
                  <td style={cellRight}>
                    {(parseFloat(formData.professionalTax || "0") || 0).toLocaleString("en-IN")}
                  </td>
                </tr>
                <tr>
                  <td style={{ ...docCell, background: "#F1F5F9", fontWeight: 800 }}>
                    Total Deductions
                  </td>
                  <td style={{ ...cellRight, background: "#F1F5F9", fontWeight: 800 }}>
                    {totalDeductions.toLocaleString("en-IN")}
                  </td>
                </tr>
              </tbody>
            </Box>
          </Box>

          <Box sx={{ border: "1px solid #0F172A", p: 2, bgcolor: "#F8FAFC", mb: 2 }}>
            <Typography sx={{ fontWeight: 900 }}>
              3. INCOME CHARGEABLE UNDER THE HEAD 'SALARIES': Rs.{" "}
              {taxableIncome.toLocaleString("en-IN")}
            </Typography>
          </Box>

          <Box>
            <Box component="table" sx={{ width: "100%", borderCollapse: "collapse" }}>
              <tbody>
                <tr>
                  <td style={{ ...docCell, background: "#F1F5F9", fontWeight: 800 }}>
                    TAX DEDUCTED AT SOURCE
                  </td>
                  <td style={{ ...cellRight, background: "#F1F5F9", fontWeight: 800 }}>
                    {totalTds.toLocaleString("en-IN")}
                  </td>
                </tr>
              </tbody>
            </Box>
          </Box>
        </Box>

        <Divider />

        <Box sx={{ mt: 2 }}>
          <Typography sx={{ fontWeight: 800, mb: 1.25 }}>VERIFICATION</Typography>
          <Typography sx={{ mb: 2 }}>
            I, {formData.employerName || "[Employer Name]"}, do hereby certify that a sum of Rs.{" "}
            {totalTds.toLocaleString("en-IN")}/- has been deducted at source and paid to the credit
            of the Central Government.
          </Typography>

          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <Typography sx={{ mb: 0.5 }}>
                Place: {formData.place || "[Place]"}
              </Typography>
              <Typography>Date: {formData.date || "[Date]"}</Typography>
            </Grid>
            <Grid item xs={12} md={6} sx={{ textAlign: "right" }}>
              <Box sx={{ borderTop: "1px solid #0F172A", width: 190, ml: "auto", mb: 1 }} />
              <Typography>{formData.signatoryName || "[Signatory Name]"}</Typography>
              <Typography>{formData.signatoryDesignation || "[Designation]"}</Typography>
              <Typography>(Authorised Signatory)</Typography>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      </>
    );
  };

  return (
    <Box
  sx={{
    minHeight: "100vh",
    bgcolor: "transparent",
    backgroundImage: "none",
    color: "#E6F1FF",
   // p: { xs: 2, md: 4 },
  }}
>
 <Header/>

      {/* Breadcrumbs */}
      <Box sx={{ p: 2, bgcolor: 'rgba(10,20,40,0.7)', overflow:'hidden'}}>
        <Breadcrumbs separator=">" sx={{ '& .MuiBreadcrumbs-separator': { color: 'rgba(255,255,255,0.5)' } }}>
          <MuiLink component={RouterLink} to="/welcome" sx={{ color:'rgba(255,255,255,0.7)' }}>Home</MuiLink>
          <MuiLink component={RouterLink} to="/updatepayroll" sx={{ color:'rgba(255,255,255,0.7)' }}>Payroll</MuiLink>
          <MuiLink component={RouterLink} to="/form16/procced" sx={{ color:'rgba(255,255,255,0.7)' }}>From 16</MuiLink>
          <Typography sx={{ color:'rgba(255,255,255,0.5)' }}>GenerateForm16</Typography>
        </Breadcrumbs>
      </Box>

      {!showPreview ? (
        <Box sx={{ maxWidth: 1100, mx: "auto" }}>
          {/* Header */}
          

          <Card sx={{ ...frostedCard, mb: 3 }}>
            <CardContent>
              <Typography sx={{ fontWeight: 900, fontSize: 30, color: "#DFF3FF" }}>
                Form 16 Generator
              </Typography>
              <Typography sx={{ color: "rgba(230,241,255,0.7)" }}>
                Generate your TDS certificate by filling in the details below
              </Typography>
            </CardContent>
          </Card>

          {/* Progress */}
          <Card sx={{ ...frostedCard, mb: 3 }}>
            <CardContent>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ gap: 2 }}
              >
                <Stack direction="row" alignItems="center" spacing={1.25}>
                  <Box sx={badge(currentStep >= 1)}>1</Box>
                  <Typography sx={{ color: currentStep >= 1 ? "#CBE7FF" : "rgba(230,241,255,.6)" }}>
                    Company Details
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1.25}>
                  <Box sx={badge(currentStep >= 2)}>2</Box>
                  <Typography sx={{ color: currentStep >= 2 ? "#CBE7FF" : "rgba(230,241,255,.6)" }}>
                    Personal Details
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1.25}>
                  <Box sx={badge(currentStep >= 3)}>3</Box>
                  <Typography sx={{ color: currentStep >= 3 ? "#CBE7FF" : "rgba(230,241,255,.6)" }}>
                    Salary &amp; TDS
                  </Typography>
                </Stack>
              </Stack>
            </CardContent>
          </Card>

          {/* Content */}
          <Card sx={{ ...frostedCard, mb: 2 }}>
            <CardContent>
              {currentStep === 1 && EmployerDetails}
              {currentStep === 2 && EmployeeDetails}
              {currentStep === 3 && SalaryDetails}
            </CardContent>
          </Card>

          {/* Nav */}
          <Stack direction="row" justifyContent="space-between" 
           sx={{ mb: { xs: 3, md: 4 } }}>
            <Button
              onClick={() => setCurrentStep((s) => Math.max(1, s - 1))}
              disabled={currentStep === 1}
              sx={{
                ...btn,
                mb: { xs: 1, md: 0 },  
                bgcolor: "rgba(255,255,255,0.08)",
                color: "#E6F1FF",
                border: "1px solid rgba(255,255,255,0.16)",
                "&:hover": { bgcolor: "rgba(255,255,255,0.16)" },
                opacity: currentStep === 1 ? 0.5 : 1,
              }}
            >
              Previous
            </Button>

            <Stack direction="row" spacing={1.5}>
              {currentStep === 3 && (
                <Button
                  onClick={() => setShowPreview(true)}
                  startIcon={<Eye size={16} />}
                  variant="contained" color="primary"
                  sx={{
                  //   ...btn,
                  mb: { xs: 1, md: 0 },  
                  //   bgcolor: "#00C48C",
                  //   color: "#04111F",
                  //   "&:hover": { bgcolor: "#00b07f" },
                  //   boxShadow: "0 0 24px rgba(0,196,140,.35)",
                  mt:1
                   }}
                >
                  Preview Form 16
                </Button>
              )}
              <Button
                onClick={() => setCurrentStep((s) => Math.min(3, s + 1))}
                disabled={currentStep === 3}
                variant="contained" color="primary"
                sx={{
                  // ...btn,
                  mb: { xs: 1, md: 0 },  
                
                  // bgcolor: "#3182CE",
                  // color: "#EAF6FF",
                  // "&:hover": { bgcolor: "#2B6CB0" },
                  opacity: currentStep === 3 ? 0.5 : 1,
                }}
              >
                Next
              </Button>
            </Stack>
          </Stack>
        </Box>
      ) : (
        <Box sx={{ maxWidth: 1240, mx: "auto" }}>
          {/* Preview Header */}
          <Card sx={{ ...frostedCard, mb: 3 }}>
            <CardContent
              sx={{
                display: "flex",
                alignItems: { xs: "stretch", md: "center" },
                justifyContent: "space-between",
                gap: 2,
              }}
            >
              <Box>
                <Typography sx={{ fontWeight: 900, fontSize: 24, color: "#DFF3FF" }}>
                  Form 16 Preview
                </Typography>
                <Typography sx={{ color: "rgba(230,241,255,0.7)" }}>
                  Review your TDS certificate before downloading
                </Typography>
              </Box>
              <Stack direction="row" spacing={1.25}>
                <Button
                  onClick={() => setShowPreview(false)}
                  sx={{
                    ...btn,
                    bgcolor: "rgba(255,255,255,0.08)",
                    color: "#E6F1FF",
                    border: "1px solid rgba(255,255,255,0.16)",
                    "&:hover": { bgcolor: "rgba(255,255,255,0.16)" },
                  }}
                >
                  Back to Edit
                </Button>
                <Button
                  onClick={() => window.print()}
                  startIcon={<Download size={16} />}
                  sx={{
                    ...btn,
                    bgcolor: "#5AA2FF",
                    color: "#04111F",
                    "&:hover": { bgcolor: "#4A93F7" },
                    boxShadow: "0 0 22px rgba(90,162,255,.35)",
                  }}
                >
                  Print/Download
                </Button>
              </Stack>
            </CardContent>
          </Card>
{/* Document */}
<div id="form16-print">
  <Form16Preview />
</div>
        </Box>
      )}

      {/* Print-only tweaks */}
            {/* Print-only tweaks */}
      <style>{`
        @media print {
          /* Hide everything */
          body * { visibility: hidden !important; }

          /* Show only Form16 content */
          #form16-print, #form16-print * { visibility: visible !important; }

          /* Position correctly */
          #form16-print {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }

          /* Page settings */
          @page { size: A4 portrait; margin: 12mm; }
        }
          .doc-box {
  border: 1px solid #0F172A;
  border-radius: 6px;
  padding: 14px;
  background: #fff;
}

.doc-title {
  font-weight: 800;
  text-decoration: underline;
  margin-bottom: 10px;
  text-align: center;
}

.doc-content {
  line-height: 1.6;
  font-size: 14px;
}

.doc-box.small {
  text-align: center;
}

      `}</style>
    </Box>
  );
};

export default GenerateForm16;
