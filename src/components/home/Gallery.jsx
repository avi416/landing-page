import { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import "../../styles/gallery.css";

export default function Gallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const snap = await getDocs(collection(db, "gallery"));
        let list = snap.docs.map((d) => d.data());

        list.sort(
          (a, b) =>
            (a.order ?? 999999) - (b.order ?? 999999)
        );

        setImages(list);
      } catch (err) {
        console.error("Gallery Load Error:", err);
      }
    }
    load();
  }, []);

  return (
    <section id="gallery" className="gallery-section">
      <h2 className="section-title">גלריה</h2>

      <div className="masonry-grid">
        {images.map((img, i) => (
          <div key={i} className="masonry-item">
            <img src={img.imageBase64} alt="" loading="lazy" />
          </div>
        ))}
      </div>
    </section>
  );
}
