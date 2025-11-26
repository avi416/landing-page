import { useEffect } from "react";
import { db } from "../firebase/config";
import { doc, onSnapshot } from "firebase/firestore";

export default function FaviconUpdater() {
  useEffect(() => {
    const ref = doc(db, "settings", "global");

    const unsub = onSnapshot(ref, (snap) => {
      const base64 = snap.data()?.faviconBase64;
      if (!base64) return;

      // מחיקת כל האייקונים הישנים
      document
        .querySelectorAll("link[rel='icon'], link[rel='shortcut icon']")
        .forEach((el) => el.remove());

      // יצירת תגית אייקון חדשה
      const favicon = document.createElement("link");
      favicon.rel = "icon";
      favicon.href = base64; // מכיל כבר data:image/webp;base64...

      // קביעת סוג אוטומטית מתוך ה־base64
      if (base64.startsWith("data:image/png")) {
        favicon.type = "image/png";
      } else if (base64.startsWith("data:image/jpeg")) {
        favicon.type = "image/jpeg";
      } else if (base64.startsWith("data:image/webp")) {
        favicon.type = "image/webp";
      } else {
        favicon.type = "image/*";
      }

      document.head.appendChild(favicon);
    });

    return () => unsub();
  }, []);

  return null;
}
