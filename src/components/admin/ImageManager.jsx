import { useEffect, useState } from "react";
import React from "react";

import { db } from "../../firebase/config";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { convertToWebp } from "../../utils/convertToWebp";
import "../../styles/admin.css";

export default function ImageManager() {
  const [images, setImages] = useState([]);
  const [dragIndex, setDragIndex] = useState(null);

  useEffect(() => {
    async function load() {
      await loadImages();
    }
    load();
  }, []);

  const loadImages = async () => {
    try {
      const snap = await getDocs(collection(db, "gallery"));
      let list = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      // סידור לפי order, ואם אין – דוחפים לסוף
      list.sort(
        (a, b) =>
          (a.order ?? 999999) - (b.order ?? 999999)
      );

      setImages(list);
    } catch (err) {
      console.error("Load Images Error:", err);
      alert("שגיאה בטעינת התמונות (בדוק חוקים של Firestore).");
    }
  };

  const uploadImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const base64 = await convertToWebp(file);

      await addDoc(collection(db, "gallery"), {
        imageBase64: base64,
        createdAt: serverTimestamp(),
        order: images.length, // סדר אחרון
      });

      await loadImages();
    } catch (err) {
      console.error("Upload Error:", err);
      alert("שגיאה בהעלאת התמונה");
    }
  };

  const deleteImage = async (id) => {
    try {
      await deleteDoc(doc(db, "gallery", id));
      await loadImages();
    } catch (err) {
      console.error("Delete Error:", err);
      alert("שגיאה במחיקת התמונה");
    }
  };

  // ===== Drag & Drop – Desktop =====
  const dragStart = (index) => {
    setDragIndex(index);
  };

  const dragOver = (index) => {
    if (dragIndex === null || dragIndex === index) return;

    const arr = [...images];
    const draggedItem = arr[dragIndex];
    arr.splice(dragIndex, 1);
    arr.splice(index, 0, draggedItem);

    setDragIndex(index);
    setImages(arr);
  };

  // ===== Drag & Drop – Mobile (Touch) =====
  const touchStart = (index) => {
    setDragIndex(index);
  };

  const touchMove = (index) => {
    if (dragIndex === null || dragIndex === index) return;

    const arr = [...images];
    const draggedItem = arr[dragIndex];
    arr.splice(dragIndex, 1);
    arr.splice(index, 0, draggedItem);

    setDragIndex(index);
    setImages(arr);
  };

  const saveOrder = async () => {
    try {
      const reordered = images.map((img, i) => ({
        ...img,
        order: i,
      }));

      // עדכון כל המסמכים
      for (const img of reordered) {
        await updateDoc(doc(db, "gallery", img.id), {
          order: img.order,
        });
      }

      alert("הסדר נשמר בהצלחה!");
    } catch (err) {
      console.error("Save Order Error:", err);
      alert("שגיאה בשמירת הסדר");
    }
  };

  return (
    <div className="admin-box">
      <h2>ניהול גלריה</h2>

      <label className="upload-btn">
        העלאת תמונה חדשה
        <input type="file" accept="image/*" hidden onChange={uploadImage} />
      </label>

      <div className="gallery-grid">
        {images.map((img, i) => (
          <div
            key={img.id}
            className="gallery-item draggable-item"
            draggable
            onDragStart={() => dragStart(i)}
            onDragOver={(e) => {
              e.preventDefault();
              dragOver(i);
            }}
            onTouchStart={() => touchStart(i)}
            onTouchMove={() => touchMove(i)}
          >
            <img src={img.imageBase64} alt="" className="gallery-img" />
            <button
              className="delete-btn"
              onClick={() => deleteImage(img.id)}
            >
              מחיקה
            </button>
          </div>
        ))}
      </div>

      <button
        className="upload-btn"
        style={{ marginTop: "1.5rem" }}
        onClick={saveOrder}
      >
        שמירת סדר חדש
      </button>
    </div>
  );
}
