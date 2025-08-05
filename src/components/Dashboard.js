import React, { useState } from 'react';
import './../style/Dashboard.css';
import { useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi'; // Logout icon
import time from '../image/time.png';
import reports from '../image/reports.png';
import careers from '../image/careers.png';
import learn from '../image/learn.png';
import Empdash from '../image/Empdash.png';
import more from '../image/more.png';
import doc from '../image/doc.png';
import testimonials from '../image/testimonials.png';
import feed from '../image/feed.png';
import workflow from '../image/workflow.jpg';
import People from '../image/People.jpg';
import about from '../image/about.jpg';

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
  const [isImageOpen, setIsImageOpen] = useState(false);
  const user = safeParseUser();

const handleImageClick = () => {
  setIsImageOpen(true);
};

const closeImage = () => {
  setIsImageOpen(false);
};

const cards = [
  { title: 'OptiTime', image: time, route: '/timesheettable' },
  { title: 'Reports', image: reports, route: '/reports', restrictedTo:  ['employee', 'manager'] },
  { title: 'Careers', image: careers },
  { title: 'Learning', image: learn},
  { title: 'Employee Dashboard', image: Empdash, route:'/welcome' },
  { title: 'More Apps', image: more },
  { title: 'Document Center', image: doc },
  { title: 'Testimonials', image: testimonials },
  { title: 'Feeds', image: feed },
  { title: 'Workflow Delegates', image: workflow },
  { title: 'People', image: People },
  { title: 'About', image: about }
];

const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <>
     <header className="dashboard-header">
  <div className="logo-name">WorkNexus</div>
        <div className="user-info">
          <div className="role">
     <div className="name">{user?.name || "Employee"}</div>
     <div className="empId">{user?.empId || ""}</div>
</div>
          <span className="img"onClick={handleImageClick}  style={{
        backgroundImage: `url(${user?.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        cursor: 'pointer',
      }}></span>
          <FiLogOut className="logout-icon" onClick={handleLogout} />
        </div>
        </header>
    <div className="dashboard-container">
        {cards.map((card, idx) => {
          const isHidden = Array.isArray(card.restrictedTo) && card.restrictedTo.includes(user?.role);
if (isHidden) return null;
          return (
          <div className="card" 
          key={idx}  
           onClick={() => card.route && navigate(card.route)}
          style={{ cursor: card.route ? 'pointer' : 'default' }}
        >
          <img src={card.image} alt={card.title} />
          <div className="title">{card.title}</div>
          </div>
      );
      })}
    </div>
    {isImageOpen && (
  <div className="image-modal">
    <div className="modal-content">
      <span className="close-button" onClick={closeImage}>&times;</span>
      <img
       src={user?.image}
        alt="Profile"
      />
    </div>
  </div>
)}
    </>
  );
}

export default Dashboard;