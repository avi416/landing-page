import { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { convertToWebp } from "../../utils/convertToWebp";
import "../../styles/admin.css";

export default function IconManager() {
  const [favicon, setFavicon] = useState(null);

  useEffect(() => {
    loadFavicon();
  }, []);

  const loadFavicon = async () => {
    const ref = doc(db, "settings", "global");
    const snap = await getDoc(ref);

    setFavicon(snap.data()?.faviconBase64 || null);
  };

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const base64 = await convertToWebp(file);

    await updateDoc(doc(db, "settings", "global"), {
      faviconBase64: base64,
    });

    setFavicon(base64);
    alert("האייקון הוחלף בהצלחה!");
  };

  const deleteIcon = async () => {
    await updateDoc(doc(db, "settings", "global"), {
      faviconBase64: "",
    });

    setFavicon(null);
    alert("האייקון נמחק.");
  };

  return (
    <div className="admin-box">

      <h2>החלפת אייקון (Favicon)</h2>

      {favicon ? (
        <div className="favicon-wrapper">
          <img src={favicon} alt="favicon" className="favicon-preview" />

          <button className="delete-btn" onClick={deleteIcon}>
            מחיקת אייקון
          </button>
        </div>
      ) : (
        <p>אין אייקון מוגדר כרגע</p>
      )}

      <label className="upload-btn">
        העלאת אייקון חדש
        <input type="file" accept="image/*" hidden onChange={handleUpload} />
      </label>

    </div>
  );
}
