import { deleteControlStyle } from "./move.js";
import { canvas } from "../index.js";

const area = document.querySelector("body");
const brushSizeSlide = document.querySelector("#brush-size");
const brushSizeLabel = document.querySelector(".brush-size-label");
const brushColorInput = document.querySelector("#brush-color");

// 일반펜 관련 이벤트 트리거
document.querySelector(".drawBrush").addEventListener("click", () => {
  const width = window.WhiteboardConfig.BRUSH_WIDTH;
  const color = window.WhiteboardConfig.BRUSH_COLOR;
  drawBrush(canvas, width, color);
  area.className = "pen";
  brushSizeSlide.value = width;
  brushSizeLabel.textContent = width;
  brushColorInput.value = color;
});

// 형광펜 관련 이벤트 트리거
document.querySelector(".highlightBrush").addEventListener("click", () => {
  const width = window.WhiteboardConfig.HIGHLIGHTER_WIDTH;
  const color = window.WhiteboardConfig.HIGHLIGHTER_COLOR;
  drawBrush(canvas, width, color, 0.3);
  area.className = "highlighter";
  brushSizeSlide.value = width;
  brushSizeLabel.textContent = width;
  brushColorInput.value = color;
});

// 지우개 관련 이벤트 트리거
document.querySelector(".eraserBrush").addEventListener("click", () => {
  const width = window.WhiteboardConfig.ERASER_WIDTH;
  drawEraser(canvas, width);
  area.className = "eraser";
  brushSizeSlide.value = width;
  brushSizeSlide.value = width;
  brushSizeLabel.textContent = width;
});

// 지우개 외에 다른 도구 선택시 커스텀 커서 삭제
document.querySelectorAll("#wrap .tool-btn").forEach((button) => {
  button.addEventListener("click", (e) => {
    console.log("data-id", e.target.dataset.id);
    if (e.target.dataset.id === "eraser") {
    } else {
      removeEraserCursor();
    }
  });
});

// 펜, 형광펜, 지우개 크기 조절
brushSizeSlide.addEventListener("change", (e) => {
  const currentBrush = area.classList.value;
  brushSizeLabel.textContent = e.target.value;

  switch (currentBrush) {
    // 펜
    case "pen":
      console.log("펜 도구 선택됨");
      window.WhiteboardConfig.BRUSH_WIDTH = e.target.value;
      drawBrush(canvas, window.WhiteboardConfig.BRUSH_WIDTH);
      break;
    // 형광펜
    case "highlighter":
      console.log("형광펜 도구 선택됨");
      window.WhiteboardConfig.HIGHLIGHTER_WIDTH = e.target.value;
      drawBrush(
        canvas,
        window.WhiteboardConfig.HIGHLIGHTER_WIDTH,
        "0,0,0",
        0.3
      );
      break;
    // 지우개
    case "eraser":
      console.log("지우개 도구 선택됨");
      window.WhiteboardConfig.ERASER_WIDTH = e.target.value;
      drawEraser(canvas, window.WhiteboardConfig.ERASER_WIDTH);
      break;
    default:
      console.log("현재 아무런 도구도 선택되지않음");
  }
});

// 펜, 형광펜 색상 조절
document.querySelector("#brush-color").addEventListener("input", (e) => {
  console.log("current color", e.target.value);

  const getRGB = (HEX) => {
    return HEX.match(/.{2}/g)?.map((replacer) => parseInt(replacer, 16) || 0);
  };

  const rgb = getRGB(e.target.value.replace("#", ""));
  const color = rgb.join(",");

  const currentBrush = area.classList.value;
  brushColorInput.value = e.target.value;

  if (currentBrush === "pen") {
    console.log("일반펜 색 변경 실행");
    window.WhiteboardConfig.BRUSH_COLOR = color;
    drawBrush(canvas, window.WhiteboardConfig.BRUSH_WIDTH, color, 1);
  } else if (currentBrush === "highlighter") {
    console.log("형광펜 색 변경 실행");
    window.WhiteboardConfig.HIGHLIGHTER_COLOR = color;
    drawBrush(canvas, window.WhiteboardConfig.HIGHLIGHTER_WIDTH, color, 0.3);
  } else {
    console.log("색을 변경할 도구가 선택되지않음");
  }
});

/** PencilBrush 활성화 */
export const drawBrush = (canvas, width, color, opacity = 1) => {
  // const _glowShadow = {
  //   color: "red",
  //   blur: 20,
  //   offsetX: 0,
  //   offsetY: 0,
  //   affectStroke: true,
  // };

  // console.log("draw", width, color, opacity);
  // console.log(`rgba(${color}, ${opacity})`);

  const brush = new fabric.PencilBrush(canvas);
  Object.assign(brush, {
    color: `rgba(${color}, ${opacity})`,
    width: width, // 선 두께
    // shadow: _glowShadow,
    decimate: 0.2,
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
export const drawEraser = (canvas, width) => {
  console.log("지우개 width:", width);
  canvas.erasable = true;
  const eraser = new fabric.EraserBrush(canvas);
  eraser.width = Number(width);
  canvas.freeDrawingBrush = eraser;
  canvas.isDrawingMode = true;

  // 커스텀 커서 관련 기능
  const realCanvasWrapper = document.querySelector("#canvas-wrapper");
  const customCursor = createEraserCursor(width);
  const existingCursor = realCanvasWrapper.querySelector(".eraser-cursor");

  if (existingCursor) {
    realCanvasWrapper.removeChild(existingCursor);
  }
  realCanvasWrapper.appendChild(customCursor);

  // 이벤트 중복 방지용으로 먼저 제거
  realCanvasWrapper.removeEventListener("pointermove", eraserCursorPosition);
  realCanvasWrapper.addEventListener("pointermove", (e) => {
    eraserCursorPosition(e, realCanvasWrapper);
  });
};

/** 지우개 도구 커스텀 커서 생성 */
function createEraserCursor(width) {
  const currentWidth = parseInt(width);
  const cursor = document.createElement("div");
  cursor.classList.add("eraser-cursor");
  cursor.style.width = `${currentWidth}px`; // 커스텀 커서 default 크기
  cursor.style.height = `${currentWidth}px`; // 커스텀 커서 default 크기
  cursor.style.position = "absolute";
  cursor.style.pointerEvents = "none";
  cursor.style.zIndex = 10;
  return cursor;
}

/** 지우개 도구 커스텀 커서 삭제 */
function removeEraserCursor() {
  const eraser = document.querySelector(".eraser-cursor");
  if (!eraser) return;
  eraser.remove();
  console.log("지우개 커스텀 커서 삭제 함수 실행", eraser);
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
