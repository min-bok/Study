export const uploadImage = (canvas, file) => {
  const reader = new FileReader();

  reader.onload = function (evt) {
    const content = evt.target.result;

    const img = new Image();
    img.onload = () => {
      const fabricImg = new fabric.Image(img);
      fabricImg.set({
        left: Math.random() * 100,
        top: Math.random() * 100,
        scaleX: 0.5,
        scaleY: 0.5,
      });
      canvas.add(fabricImg);
      canvas.requestRenderAll();
    };
    img.onerror = () => {
      console.error("HTMLImage load failed");
    };

    img.src = content;
  };

  reader.readAsDataURL(file);
};
