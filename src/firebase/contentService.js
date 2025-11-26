import { db } from "./config";
import { doc, setDoc } from "firebase/firestore";

/* -----------------------------
   המרה לתמונת WEBP → Base64
--------------------------------*/
export async function convertToWebP(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        canvas.toBlob(
          (blob) => {
            const reader2 = new FileReader();
            reader2.onloadend = () => {
              resolve(reader2.result); // Base64
            };
            reader2.readAsDataURL(blob);
          },
          "image/webp",
          0.85
        );
      };
    };

    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/* -----------------------------
   שמירת תמונת BASE64 ב-Firestore
--------------------------------*/
export async function saveImageBase64(base64, name) {
  await setDoc(doc(db, "gallery", name), {
    data: base64,
    createdAt: Date.now()
  });
}
