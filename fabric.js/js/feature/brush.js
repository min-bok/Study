import { deleteControlStyle } from "./move.js";

let CURSOR_SIZE = 50; // eraser tool 크기(default)

/** PencilBrush 활성화 */
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

  canvas.on("path:created", (e) => {
    const path = e.path;
    path.controls.deleteControl = new fabric.Control(deleteControlStyle);
    canvas.requestRenderAll();
  });
};

/** EraserBrush 활성화 */
export const drawEraser = (canvas) => {
  canvas.erasable = true;
  const eraser = new fabric.EraserBrush(canvas);
  eraser.width = CURSOR_SIZE;
  canvas.freeDrawingBrush = eraser;
  canvas.isDrawingMode = true;

  // 커스텀 커서 관련 기능
  const realCanvasWrapper = document.querySelector("#canvas-wrapper");
  const customCursor = createEraserCursor();
  realCanvasWrapper.appendChild(customCursor);
  realCanvasWrapper.addEventListener("pointermove", (e) => {
    eraserCursorPosition(e, realCanvasWrapper);
  });

  document.querySelector("#eraser-size").addEventListener("change", (e) => {
    CURSOR_SIZE = e.target.value;
    const cursor = document.querySelector(".eraser-cursor");
    canvas.freeDrawingBrush.width = CURSOR_SIZE; // EraserBrush 크기 변경
    cursor.style.width = `${CURSOR_SIZE}px`; // 커스텀 커서 크기 변경
    cursor.style.height = `${CURSOR_SIZE}px`; // 커스텀 커서 크기 변경
  });
};

/** 지우개 도구 커스텀 커서 생성 */
function createEraserCursor() {
  const cursor = document.createElement("div");
  cursor.classList.add("eraser-cursor");
  cursor.style.width = `${CURSOR_SIZE}px`; // 커스텀 커서 default 크기
  cursor.style.height = `${CURSOR_SIZE}px`; // 커스텀 커서 default 크기
  cursor.style.position = "absolute";
  cursor.style.pointerEvents = "none";
  cursor.style.zIndex = 10;
  return cursor;
}

/** 지우개 도구 커스텀 커서 위치 조정 */
export function eraserCursorPosition(e) {
  const canvasRect = document.querySelector("#canvas").getBoundingClientRect();
  const cursor = document.querySelector(".eraser-cursor");
  if (cursor) {
    const offsetX = e.clientX - canvasRect.left;
    const offsetY = e.clientY - canvasRect.top;
    cursor.style.left = `${offsetX}px`;
    cursor.style.top = `${offsetY}px`;
  }
}
