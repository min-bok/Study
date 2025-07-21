const deleteIcon =
  "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";
const deleteImg = document.createElement("img");
deleteImg.src = deleteIcon;

/** 객체 삭제 */
export function deleteObject(_eventData, transform) {
  const canvas = transform.target.canvas;
  const target = transform.target;

  // 타겟 객체가 group일때
  if (target.type === "group") {
    target._objects.forEach((obj) => {
      canvas.remove(obj);
    });
  }

  canvas.remove(transform.target);
  canvas.requestRenderAll();
}

/** 삭제 버튼 렌더링 */
export function renderDeleteIcon(ctx, left, top, _styleOverride, fabricObject) {
  const size = this.cornerSize;

  if (!deleteImg.complete) {
    console.log("이미지가 아직 로드되지않음");
    return;
  }

  ctx.save();
  ctx.translate(left, top);
  ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
  ctx.drawImage(deleteImg, -size / 2, -size / 2, size, size);
  ctx.restore();
}

// 삭제 버튼 관련 정보
export const deleteControlStyle = {
  x: 0,
  y: -0.5,
  offsetY: -20,
  cursorStyle: "pointer",
  mouseUpHandler: deleteObject,
  render: renderDeleteIcon,
  cornerSize: 24,
};

/** 마우스 휠로 줌 인, 줌 아웃 */
export const mouseWheel = (canvas) => {
  canvas.on("mouse:wheel", (opt) => {
    const delta = opt.e.deltaY;
    let zoom = canvas.getZoom();
    zoom *= 0.999 ** delta;

    // 줌 범위 제한
    if (zoom > 20) zoom = 20;
    if (zoom < 0.01) zoom = 0.01;

    canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);

    opt.e.preventDefault();
    opt.e.stopPropagation();
  });
};

/** 마우스를 이용한 화면 이동 기능 */
export const handleHandTool = (canvas) => {
  console.log("handleHandTool 함수 실행됨");
  canvas.isDrawingMode = false;
  canvas.selection = false;
  canvas.defaultCursor = "move";

  let panning = false;

  const handleMouseDown = () => {
    panning = true;
  };
  const handleMouseMove = (event) => {
    if (panning) {
      const delta = new fabric.Point(event.e.movementX, event.e.movementY);
      canvas.relativePan(delta);
    }
  };
  const handleMouseUp = () => {
    panning = false;
  };
  canvas.on("mouse:down", handleMouseDown);
  canvas.on("mouse:move", handleMouseMove);
  canvas.on("mouse:up", handleMouseUp);
};
