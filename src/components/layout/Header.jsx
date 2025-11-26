import "/src/styles/header.css";
import React from "react";


export default function Header() {
  return (
    <header className="hero">
      <div className="hero-overlay"></div>

      <div className="hero-content">
        <h1>שולחנות שוק מעוצבים לכל אירוע</h1>
        <p>טרי • עשיר • מגוון • מותאם אישית</p>
        <a href="#contact" className="btn">קבלו הצעת מחיר</a>
      </div>
    </header>
  );
}
