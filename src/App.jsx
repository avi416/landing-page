import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";

import AdminLogin from "./components/admin/AdminLogin";
import Admin from "./pages/Admin";
import IconManager from "./components/admin/IconManager";

import AdminDashboard from "./components/admin/AdminDashboard";
import ImageManager from "./components/admin/ImageManager";
import TextManager from "./components/admin/TextManager";
import AdminMessages from "./components/admin/AdminMessages";

import FaviconUpdater from "./components/FaviconUpdater";
import LogoUpdater from "./components/LogoUpdater";   // ← הוספה חשובה

import { AuthProvider } from "./context/AuthContext";
import LogoManager from "./components/admin/LogoManager";

import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import React from "react";




function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <AuthProvider>

      {/* עדכון לוגו + פביקון */}
      <LogoUpdater />       {/* ← יוצר אייקון Navbar דינמי */}
      <FaviconUpdater />    {/* ← רק אייקון הטאב */}

      {!isAdminRoute && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route path="/admin" element={<Admin />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="manage-images" element={<ImageManager />} />
          <Route path="manage-text" element={<TextManager />} />
          <Route path="messages" element={<AdminMessages />} />
          <Route path="change-icon" element={<IconManager />} />
          <Route path="manage-logo" element={<LogoManager />} />
         


        </Route>
      </Routes>

    </AuthProvider>
  );
}

export default App;
