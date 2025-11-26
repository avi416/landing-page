import { useEffect } from "react";
import { db } from "../firebase/config";
import { doc, onSnapshot } from "firebase/firestore";

export default function LogoUpdater() {
  useEffect(() => {
    const ref = doc(db, "settings", "global");

    const unsub = onSnapshot(ref, (snap) => {
      const data = snap.data();
      const base64 = data?.logoBase64;

      if (!base64) return;

      const img = document.querySelector(".navbar-logo img");
      if (img) {
        img.src = base64;
      }
    });

    return () => unsub();
  }, []);

  return null;
}
