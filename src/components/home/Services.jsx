import React from "react";
import "../../styles/services.css";

export default function Services() {
  const services = [
    {
      title: "שולחנות שוק לאירועים פרטיים",
      desc: "ימי הולדת, שבתות חתן, בר/בת מצווה, מסיבות הפתעה ועוד – שולחנות מלאים, צבעוניים ומעוצבים עד לפרט האחרון.",
      tag: "אירועים בבית / אולם",
    },
    {
      title: "מגשי אירוח לעסקים",
      desc: "אירועי חברה, ישיבות צוות, השקות ולקוחות VIP – שילוב של טעמים, רמות ואסתטיקה גבוהה שמתאימה למותג שלך.",
      tag: "חברות וארגונים",
    },
    {
      title: "התאמה אישית וקונספט",
      desc: "עיצוב לפי צבעוניות, סוג אירוע, אופי הקהל ותקציב – כולל קינוחים, מאפים, פלטות גבינות, ירקות ועוד.",
      tag: "קונספט אישי",
    },
  ];

  return (
    <section id="services" className="services">
      <div className="container">
        <div className="section-heading services-heading">
          <h2 className="section-title">השירותים שלנו</h2>
          <p className="section-subtitle">
            בוחרים יחד את הסגנון, התקציב והטעמים – ואנחנו הופכים את האירוע שלכם
            לחוויה שתזכרו בתמונות ובטעמים.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <article key={service.title} className="service-card">
              <div className="service-accent" />
              <p className="service-tag">{service.tag}</p>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
