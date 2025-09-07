// src/component2/ClientReportDocument.jsx
import React, { useMemo } from "react";
import dayjs from "dayjs";

// quick helper
const INR = (n) => (Number(n) || 0).toLocaleString("en-IN");
const pad = (n) => String(n).padStart(2, "0");

export default function ClientReportDocument() {
  const params = useMemo(() => {
    try { return JSON.parse(localStorage.getItem("clientReportParams") || "{}"); }
    catch { return {}; }
  }, []);

  const monthStart = params.monthISO ? dayjs(params.monthISO).startOf("month") : dayjs().startOf("month");
  const daysInMonth = monthStart.daysInMonth();
  const monthLabel = monthStart.format("MMMM YYYY");

  // Dummy, replace if needed
  const company = { name: "FlowSync Pvt. Ltd.", pan: "ABCDE1234F", tan: "MUMB12345B", address: "5th Floor, Tech Park, Pune, MH - 411001" };
  const client =  { name: "Acme Global Corp", id: "CLI-00291" };
  const project = { name: "Atlas Migration", code: "PRJ-ATLAS-014" };
  const employee = params.employee || "Employee - [Select]";
  const ratePerHour = 1200; // dummy billing rate

  // Build dummy day-by-day rows (Mon–Fri 8h, weekends 0)
  const rows = Array.from({ length: daysInMonth }, (_, i) => {
    const d = monthStart.date(i + 1);
    const isWeekend = [0, 6].includes(d.day());
    const hours = isWeekend ? 0 : 8;
    return {
      date: d, dow: d.format("ddd"),
      task: hours ? "Feature work / Sprint tasks" : "-",
      hours,
    };
  });

  const totalHours = rows.reduce((s, r) => s + r.hours, 0);
  const amount = totalHours * ratePerHour;

  return (
    <div className="crp-screen">
      {/* on-screen toolbar (won’t print) */}
      <div className="toolbar no-print">
        <button className="btn" onClick={() => window.history.back()}>← Back</button>
        <button className="btn primary" onClick={() => window.print()}>Print / Download</button>
      </div>

      <div className="a4">
        <div className="doc">
          {/* Header */}
          <div className="doc-head">
            <div className="brand">{company.name}</div>
            <div className="muted">{company.address}</div>
            <div className="muted">PAN: {company.pan} &nbsp;|&nbsp; TAN: {company.tan}</div>
            <div className="title">CLIENT TIMESHEET REPORT</div>
            <div className="muted">{monthLabel}</div>
          </div>

          {/* Summary */}
          <div className="grid2">
            <div className="box">
              <div className="label">Client</div>
              <div className="value">{client.name}</div>
              <div className="muted">Client ID: {client.id}</div>
            </div>
            <div className="box">
              <div className="label">Project</div>
              <div className="value">{project.name}</div>
              <div className="muted">Code: {project.code}</div>
            </div>
          </div>

          <div className="grid2">
            <div className="box">
              <div className="label">Employee</div>
              <div className="value">{employee}</div>
            </div>
            <div className="box">
              <div className="label">Billing Rate</div>
              <div className="value">₹ {INR(ratePerHour)} / hour</div>
            </div>
          </div>

          {/* Table */}
          <div className="subhead">Detailed Timesheet</div>
          <table className="table">
            <thead>
              <tr>
                <th className="cell left">Date</th>
                <th className="cell left">Day</th>
                <th className="cell left">Task / Notes</th>
                <th className="cell right">Hours</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.date.toString()}>
                  <td className="cell left">{`${pad(r.date.date())}-${pad(r.date.month()+1)}-${r.date.year()}`}</td>
                  <td className="cell left">{r.dow}</td>
                  <td className="cell left">{r.task}</td>
                  <td className="cell right">{r.hours}</td>
                </tr>
              ))}
              <tr>
                <td className="cell left total" colSpan={3}>Total Hours</td>
                <td className="cell right total">{totalHours}</td>
              </tr>
              <tr>
                <td className="cell left total" colSpan={3}>Amount (₹)</td>
                <td className="cell right total">{INR(amount)}</td>
              </tr>
            </tbody>
          </table>

          {/* Footer / Auth */}
          <div className="grid2 mt">
            <div>
              <div className="label">Prepared By</div>
              <div className="line" />
              <div className="muted">Authorised Signatory</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div className="label">Approved By (Client)</div>
              <div className="line right" />
              <div className="muted">Name & Stamp</div>
            </div>
          </div>

          <div className="footer">Generated by FlowSync • Client Report</div>
        </div>
      </div>

      {/* Styles (scoped) */}
      <style>{css}</style>
    </div>
  );
}

const css = `
:root{
  --ink:#0f172a; --muted:#475569; --line:#1f2937; --bg:#fff; --shade:#f5f7fb;
}
*{box-sizing:border-box}
.no-print{display:flex; gap:12px; justify-content:flex-end; padding:16px}
.btn{padding:8px 14px;border:1px solid #d0d7e2;border-radius:8px;background:#fff;font-weight:600;cursor:pointer}
.btn.primary{background:#2563eb;color:#fff;border-color:#2563eb}
.btn:hover{filter:brightness(.98)}
.a4{width:210mm;min-height:297mm;margin:24px auto;background:var(--bg);box-shadow:0 10px 30px rgba(0,0,0,.25)}
.doc{padding:16mm 14mm;font: 13.5px/1.55 "Times New Roman", Georgia, serif;color:var(--ink)}
.doc-head{text-align:center;border-bottom:2px solid #111827;padding-bottom:8px;margin-bottom:14px}
.brand{font-weight:800}
.title{font-weight:500;letter-spacing:.2px;margin-top:8px;color:#111827;}
.muted{color:var(--muted);font-size:12px}
.grid2{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:10px 0}
.box{border:1px solid var(--line);border-radius:4px;padding:8px}
.label{font-weight:700;color:#111827}
.value{font-weight:700}
.subhead{font-weight:800;margin:12px 0 6px}
.table{width:100%;border-collapse:collapse;margin-bottom:8px}
.cell{border:1px solid var(--line);padding:6px 8px}
.left{text-align:left}.right{text-align:right}
.total{background:#f1f5f9;font-weight:800}
.mt{margin-top:14px}
.line{margin-top:26px;width:220px;height:1px;background:var(--line)}
.line.right{margin-left:auto}
.footer{margin-top:14mm;color:#666;font-size:11px;text-align:center}
@page{size: A4 portrait; margin: 12mm}
@media print{
  body{background:#fff}
  .no-print{display:none !important}
  .a4{box-shadow:none;margin:0;width:auto;min-height:auto}
  .doc{padding:0}
}
`;
