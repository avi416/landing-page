import { useState } from "react";
import { db } from "../../firebase/config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Link } from "react-router-dom";
import "../../styles/contact.css";

export default function ContactForm() {
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) return alert("נא למלא שם וטלפון");

    setSending(true);

    try {
      await addDoc(collection(db, "messages"), {
        name: form.name,
        phone: form.phone,
        message: form.message,
        createdAt: serverTimestamp(),
      });

      alert("ההודעה נשלחה בהצלחה!");
      setForm({ name: "", phone: "", message: "" });
    } catch (err) {
      console.error(err);
      alert("שגיאה בשליחה");
    }

    setSending(false);
  };

  const WHATSAPP_NUMBER = "972532712759"; // ← מספר וואטסאפ שלך

  return (
    <section id="contact" className="contact-section">
      <h2 className="section-title">צור קשר</h2>

      <form className="contact-form" onSubmit={sendMessage}>
        <input
          name="name"
          type="text"
          placeholder="שם מלא"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="phone"
          type="tel"
          placeholder="טלפון"
          value={form.phone}
          onChange={handleChange}
          required
        />

        <textarea
          name="message"
          placeholder="הודעה"
          rows="4"
          value={form.message}
          onChange={handleChange}
        />

        <button type="submit" disabled={sending}>
          {sending ? "שולח..." : "שלח"}
        </button>

        <a
          className="whatsapp-btn"
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          שליחת הודעה ב־WhatsApp
        </a>
      </form>

      {/* קישור לתנאי שימוש */}
      <div className="legal-links">
        <Link to="/terms">תנאי שימוש</Link>
      </div>
    </section>
  );
}
