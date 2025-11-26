import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import { doc, onSnapshot } from "firebase/firestore";
import "../../styles/navbar.css";
import React from "react";


export default function Navbar() {
  const [logo, setLogo] = useState(null);

  useEffect(() => {
    const ref = doc(db, "settings", "global");

    const unsub = onSnapshot(ref, (snap) => {
      const data = snap.data();
      setLogo(data?.logoBase64 || null);
    });

    return () => unsub();
  }, []);

  return (
    <header className="navbar">
      <div className="navbar-inner container">

        {/* לוגו האתר (דינמי) */}
        <Link to="/" className="navbar-logo">
          <img
            src={logo || "/logo.png"}
            alt="לוגו האתר"
            className="site-logo"
          />
        </Link>

        {/* תפריט ניווט */}
        <nav className="navbar-links">
            <a href="/">בית</a>
        <a href="#gallery">גלריה</a>
         <a href="#contact">צור קשר</a>
        <a href="/terms">תנאי שימוש</a>
        <a href="/privacy">פרטיות</a>
        
        </nav>


      </div>
    </header>
  );
}
