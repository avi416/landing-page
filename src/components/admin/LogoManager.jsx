import { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { convertToWebp } from "../../utils/convertToWebp";
import "../../styles/admin.css";

export default function LogoManager() {
  const [logo, setLogo] = useState(null);

  useEffect(() => {
    loadLogo();
  }, []);

  const loadLogo = async () => {
    const ref = doc(db, "settings", "global");
    const snap = await getDoc(ref);

    setLogo(snap.data()?.logoBase64 || null);
  };

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const base64 = await convertToWebp(file);

    await updateDoc(doc(db, "settings", "global"), {
      logoBase64: base64,
    });

    setLogo(base64);
    alert("הלוגו הוחלף בהצלחה!");
  };

  const deleteLogo = async () => {
    await updateDoc(doc(db, "settings", "global"), {
      logoBase64: "",
    });

    setLogo(null);
    alert("הלוגו נמחק.");
  };

  return (
    <div className="admin-box">

      <h2>החלפת לוגו אתר</h2>

      {logo ? (
        <div className="favicon-wrapper">
          <img src={logo} alt="logo" className="favicon-preview" />

          <button className="delete-btn" onClick={deleteLogo}>
            מחיקת לוגו
          </button>
        </div>
      ) : (
        <p>אין לוגו מוגדר כרגע</p>
      )}

      <label className="upload-btn">
        העלאת לוגו חדש
        <input type="file" accept="image/*" hidden onChange={handleUpload} />
      </label>

    </div>
  );
}
