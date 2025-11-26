
import "../../styles/hero.css";
import React from "react";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg-orbit" />
      <div className="hero-bg-glow" />

      <div className="container hero-inner surface-card">
        <div className="hero-text">
          <p className="hero-badge">שולחנות מעוצבים • מגשי אירוח • קינוחים</p>

          <h1 className="hero-title">ברוכים הבאים לאושרת שוק</h1>

          <p className="hero-subtitle">
            שולחנות שוק מעוצבים, צבעוניים ומלאים בטעמים – לכל סוגי האירועים:
            ימי הולדת, שבתות חתן, בר/בת מצווה, אירועי חברה ועוד. אנחנו דואגים
            שגם האורחים יצטלמו וגם ילקקו את האצבעות.
          </p>

          <div className="hero-actions">
            <a href="#contact" className="btn-primary">
              קבלו הצעת מחיר מהירה
            </a>
            <a href="#gallery" className="btn-secondary hero-secondary">
              צפייה בגלריית האירועים
            </a>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-number">+500</span>
              <span className="hero-stat-label">אירועים מרוצים</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-number">+10</span>
              <span className="hero-stat-label">שנות ניסיון</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-number">100%</span>
              <span className="hero-stat-label">התאמה אישית</span>
            </div>
          </div>
        </div>

        <div className="hero-preview">
          <div className="hero-preview-main">
            <div className="hero-preview-gradient" />
            <span className="hero-preview-label">אירועי קצה</span>
            <p className="hero-preview-text">
              עיצוב שולחנות עשיר, מאוזן וצבעוני, שמתאים גם לעין וגם לבטן.
            </p>
          </div>

          <div className="hero-preview-pills">
            <div className="hero-pill">
              <span className="hero-pill-dot" />
              <span>התאמה לתקציב</span>
            </div>
            <div className="hero-pill">
              <span className="hero-pill-dot" />
              <span>כשרות מלאה</span>
            </div>
            <div className="hero-pill">
              <span className="hero-pill-dot" />
              <span>הגעה לכל הארץ</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
