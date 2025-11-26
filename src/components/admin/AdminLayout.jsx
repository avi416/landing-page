import { Link, Outlet, useLocation } from "react-router-dom";
import { auth } from "../../firebase/config";
import { useState } from "react";
import React from "react";


import {
  FiMenu,
  FiLogOut,
  FiImage,
  FiHome,
  FiFileText,
  FiMail
} from "react-icons/fi";

import "../../styles/admin.css";

export default function AdminLayout() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const logout = () => {
    auth.signOut();
    window.location.href = "/admin/login";
  };

 const links = [
  { to: "/admin/dashboard", label: "דשבורד", icon: <FiHome /> },
  { to: "/admin/manage-logo", label: "החלפת לוגו", icon: <FiImage /> },
  { to: "/admin/change-icon", label: "החלפת אייקון (Favicon)", icon: <FiImage /> },
  { to: "/admin/manage-images", label: "ניהול גלריה", icon: <FiImage /> },
  { to: "/admin/manage-text", label: "ניהול טקסטים", icon: <FiFileText /> },
  { to: "/admin/messages", label: "הודעות צור קשר", icon: <FiMail /> }
];




  return (
    <div className="admin-container">

      {/* כפתור תפריט לטלפונים */}
      <button className="mobile-toggle" onClick={() => setOpen(!open)}>
        <FiMenu />
      </button>

      {/* Sidebar */}
      <aside className={`sidebar ${open ? "open" : ""}`}>
        <h2 className="sidebar-logo">אזור ניהול</h2>

        <nav className="sidebar-links">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`sidebar-link ${
                location.pathname === link.to ? "active" : ""
              }`}
              onClick={() => setOpen(false)}
            >
              <span className="icon">{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </nav>

        <button className="logout-btn" onClick={logout}>
          התנתקות <FiLogOut />
        </button>
      </aside>

      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}
