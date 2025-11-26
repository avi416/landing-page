import { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import React from "react";


export default function TextManager() {
  const [content, setContent] = useState({
    heroTitle: "",
    heroSubtitle: "",
  });

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    const ref = doc(db, "content", "site");
    const snap = await getDoc(ref);
    if (snap.exists()) setContent(snap.data());
  };

  const updateContent = async () => {
    const ref = doc(db, "content", "site");
    await updateDoc(ref, content);
    alert("הטקסטים עודכנו!");
  };

  return (
    <div>
      <h2>ניהול טקסטים באתר</h2>

      <label>כותרת ראשית:</label>
      <input
        value={content.heroTitle}
        onChange={(e) => setContent({ ...content, heroTitle: e.target.value })}
      />

      <label>כותרת משנה:</label>
      <input
        value={content.heroSubtitle}
        onChange={(e) =>
          setContent({ ...content, heroSubtitle: e.target.value })
        }
      />

      <button onClick={updateContent}>עדכן</button>
    </div>
  );
}
