import React, { useState, useEffect } from "react";
import axios from "axios";
import "./../style/Dashboard.css";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import time from "../image/time.png";
import reports from "../image/reports.png";
import careers from "../image/careers.png";
import learn from "../image/learn.png";
import Empdash from "../image/Empdash.png";
import more from "../image/more.png";
import doc from "../image/doc.png";
import testimonials from "../image/testimonials.png";
import feed from "../image/feed.png";
import workflow from "../image/workflow.jpg";
import People from "../image/People.jpg";
import about from "../image/about.jpg";

function safeParseUser() {
  try {
    const userStr = localStorage.getItem("user");
    if (!userStr) return null;
    return JSON.parse(userStr);
  } catch {
    return null;
  }
}

function Dashboard() {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const user = safeParseUser();

  useEffect(() => {
    if (user?.employeeId) {
      axios
        .get(`http://localhost:8080/api/auth/dashboard/${user.employeeId}`)
        .then((res) => {
          setDashboardData(res.data);
        })
        .catch((err) => console.error(err));
    }
  }, [user?.employeeId]);

  const handleImageClick = () => {
    setIsImageOpen(true);
  };

  const closeImage = () => {
    setIsImageOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const cards = [
    {
      key: "WORK_TRACKER",
      title: "Work Tracker",
      image: time,
      route: "/timesheettable",
    },
    { key: "REPORTS", title: "Reports", image: reports, route: "/reports" },
    { key: "CAREERS", title: "Careers", image: careers },
    { key: "LEARNING", title: "Learning", image: learn },
    {
      key: "EMPLOYEE_DASHBOARD",
      title: "Employee Dashboard",
      image: Empdash,
      route: "/welcome",
    },
    { key: "MORE_APPS", title: "More Apps", image: more },
    { key: "DOCUMENT_CENTER", title: "Document Center", image: doc },
    { key: "TESTIMONIALS", title: "Testimonials", image: testimonials },
    { key: "FEEDS", title: "Feeds", image: feed },
    { key: "WORKFLOW_DELEGATES", title: "Workflow Delegates", image: workflow },
    { key: "PEOPLE", title: "People", image: People },
    { key: "ABOUT", title: "About", image: about },
  ];

  const allowedModules = dashboardData?.allowedModules || [];
  const visibleCards = cards.filter((card) =>
    allowedModules.includes(card.key),
  );


  return (
    <>
      {/* ================= HEADER ================= */}
      <header className="dashboard-header">
        <div className="logo-name">FlowSync</div>

        <div className="user-info">
          <div className="role">
            <div className="name">{dashboardData?.name || "Employee"}</div>
            <div className="empId">
              {dashboardData?.employeeId || ""}
              {dashboardData?.designation
                ? ` | ${dashboardData.designation}`
                : ""}
            </div>
          </div>

          {/* ===== PROFILE IMAGE (FIXED) ===== */}
          <img
            className="img"
            src={
              dashboardData?.employeeImage
                ? `${process.env.PUBLIC_URL}/images/${dashboardData.employeeImage}`
                : `${process.env.PUBLIC_URL}/images/default.png`
            }
            alt="Profile"
            onClick={handleImageClick}
          />

          <FiLogOut className="logout-icon" onClick={handleLogout} />
        </div>
      </header>

      {/* ================= DASHBOARD CARDS ================= */}
      <div className="dashboard-container">
        {visibleCards.map((card, idx) => (
          <div
            className="card"
            key={idx}
            onClick={() => card.route && navigate(card.route)}
            style={{ cursor: card.route ? "pointer" : "default" }}
          >
            <img src={card.image} alt={card.title} />
            <div className="title">{card.title}</div>
          </div>
        ))}
      </div>

      {/* ================= IMAGE MODAL ================= */}
      {isImageOpen && (
        <div className="image-modal">
          <div className="modal-content">
            <span className="close-button" onClick={closeImage}>
              &times;
            </span>
            <img
              src={
                dashboardData?.employeeImage
                  ? `${process.env.PUBLIC_URL}/images/${dashboardData.employeeImage}`
                  : `${process.env.PUBLIC_URL}/images/default.png`
              }
              alt="Profile"
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Dashboard;
