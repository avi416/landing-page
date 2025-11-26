import { useEffect, useState } from "react";
import React from "react";

import { db } from "../../firebase/config";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  orderBy,
  query
} from "firebase/firestore";
import "../../styles/admin.css";

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);

      const list = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      setMessages(list);
    } catch (err) {
      console.error("Messages Error:", err);
      alert("אין הרשאה לקרוא הודעות. עדכן את חוקי Firestore.");
    } finally {
      setLoading(false);
    }
  };

  const deleteMessage = async (id) => {
    if (!window.confirm("אתה בטוח שברצונך למחוק את ההודעה?")) return;

    try {
      await deleteDoc(doc(db, "messages", id));
      setMessages(messages.filter((msg) => msg.id !== id));
    } catch (err) {
      console.error("Delete Error:", err);
      alert("שגיאה במחיקת ההודעה");
    }
  };

  return (
    <div className="admin-box">
      <h2>הודעות צור קשר</h2>

      {loading ? (
        <p>טוען...</p>
      ) : messages.length === 0 ? (
        <p>אין הודעות.</p>
      ) : (
        <div className="messages-list">
          {messages.map((msg) => (
            <div key={msg.id} className="message-card">

              <div className="message-header">
                <h3>{msg.name || "ללא שם"}</h3>
                <button
                    className="msg-delete-btn"
                    onClick={() => deleteMessage(msg.id)}
                    >
                    מחיקה
                 </button>

              </div>

              <p><strong>טלפון:</strong> {msg.phone || "לא סופק"}</p>
              <p className="message-text">{msg.message}</p>

              <p className="message-date">
                {msg.createdAt?.toDate
                  ? msg.createdAt.toDate().toLocaleString()
                  : "תאריך לא זמין"}
              </p>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
