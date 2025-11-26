export function convertToWebp(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img, 0, 0);

        const webpBase64 = canvas.toDataURL("image/webp", 0.7); // איכות 70%
        resolve(webpBase64);
      };

      img.onerror = reject;
    };

    reader.readAsDataURL(file);
  });
}
