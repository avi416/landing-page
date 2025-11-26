import { useEffect } from "react";
import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

import Hero from "../components/home/Hero";
import Services from "../components/home/Services";
import Gallery from "../components/home/Gallery";
import ContactForm from "../components/home/ContactForm";

export default function Home() {

  // --- טעינת האייקון הדינאמי מה-Firestore ---
  useEffect(() => {
    async function loadFavicon() {
      try {
        const snap = await getDoc(doc(db, "settings", "global"));
        const favicon = snap.data()?.faviconBase64;

        if (favicon) {
          let link = document.querySelector("link[rel='icon']");
          if (!link) {
            link = document.createElement("link");
            link.rel = "icon";
            document.head.appendChild(link);
          }
          link.href = favicon;
        }
      } catch (err) {
        console.error("Favicon load error:", err);
      }
    }

    loadFavicon();
  }, []);

  return (
    <>
      <Hero />
      <Services />
      <Gallery />
      <ContactForm />
    </>
  );
}
