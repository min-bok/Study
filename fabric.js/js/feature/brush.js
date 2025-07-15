export const drawBrush = (canvas) => {
  const _glowShadow = {
    color: "red",
    blur: 20,
    offsetX: 0,
    offsetY: 0,
    affectStroke: true,
  };

  const brush = new fabric.PencilBrush(canvas);
  Object.assign(brush, {
    color: "rgba(255, 0, 0, 0.3)",
    width: 10, // 선 두께
    shadow: _glowShadow,
    strokeLineCap: "round", // 선 끝부분 모양("butt", "round", "square")
    strokeLineJoin: "round", // 선 모서리 처리("miter", "round", "bevel")
  });

  canvas.isDrawingMode = true;
  canvas.freeDrawingBrush = brush;
};
