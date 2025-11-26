import { FiImage, FiUploadCloud } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "../../styles/dashboard.css";
import React from "react";


export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-wrapper">
      <h1 className="dash-title">אזור ניהול</h1>
      <p className="dash-subtitle">ברוך הבא אדמין, בחר פעולה:</p>

      <div className="dashboard-cards">
        
        {/* כרטיס – העלאת אייקון */}
        <div
          className="dash-card"
          onClick={() => navigate("/admin/change-icon")}
        >
          <FiUploadCloud className="dash-icon" />
          <h2>החלפת אייקון אתר</h2>
          <p>העלאת לוגו/אייקון חדש שיוצג באתר</p>
        </div>

        {/* כרטיס – ניהול גלריה */}
        <div
          className="dash-card"
          onClick={() => navigate("/admin/manage-images")}
        >
          <FiImage className="dash-icon" />
          <h2>ניהול גלריה</h2>
          <p>הוספת תמונות ומחיקת קיימות</p>
        </div>

      </div>
    </div>
  );
}
