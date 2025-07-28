import { deleteControlStyle } from "./move.js";
import { canvas } from "../index.js";

document.querySelector(".tool-wrap .text-box").addEventListener("click", () => {
  console.log("텍스트 박스 버튼 클릭됨");
  createTextbox(canvas);
});

document.querySelector(".tool-wrap .rect").addEventListener("click", () => {
  console.log("사각형 버튼 클릭됨");
  const currentDrawMode = "rect";
  drawObject(canvas, currentDrawMode);
});

document.querySelector(".tool-wrap .circle").addEventListener("click", () => {
  console.log("원형 버튼 클릭됨");
  const currentDrawMode = "circle";
  drawObject(canvas, currentDrawMode);
});

document.querySelector(".tool-wrap .line").addEventListener("click", () => {
  console.log("선 버튼 클릭됨");
  // createLineWithPath(canvas);
  drawPath(canvas);
});

document.querySelector(".tool-wrap .arrow").addEventListener("click", () => {
  console.log("화살표 버튼 클릭됨");
  createArrowWithPath(canvas);
});

/** 텍스트 박스 만들기 */
function createTextbox(canvas) {
  const textbox = new fabric.IText("Fabric.JS", {
    fontFamily: "Pretendard",
    fontSize: 30,
    fill: "blue",
    fontWeight: 700,
    lineHeight: 1.2,
    textAlign: "left",
    charSpacing: 100,
    backgroundColor: "white",
    opacity: 1,
  });

  textbox.controls.deleteControl = new fabric.Control(deleteControlStyle); // 객체 삭제 버튼 추가

  canvas.add(textbox);
  canvas.setActiveObject(textbox);
}

/** 선 그리기 */
function drawPath(canvas) {
  console.log("선 그리기 함수 실행됨");

  canvas.off("mouse:down");
  canvas.off("mouse:move");
  canvas.off("mouse:up");

  let isDrawing = false;
  let startX, startY;
  let path;

  canvas.on("mouse:down", function (opt) {
    const currentTarget = canvas.getActiveObject();
    if (currentTarget) return;

    const pointer = canvas.getPointer(opt.e);

    startX = pointer.x;
    startY = pointer.y;
    isDrawing = true;

    path = new fabric.Line([startX, startY, startX, startY], {
      stroke: "black",
      strokeWidth: 2,
      selectable: false,
      evented: false,
    });

    // path.controls.deleteControl = new fabric.Control(deleteControlStyle);
    canvas.selection = false;

    canvas.add(path);
  });

  canvas.on("mouse:move", function (opt) {
    if (!isDrawing) {
      console.log("선그리는중이야...!!");
      return;
    }

    const pointer = canvas.getPointer(opt.e);
    const endX = pointer.x;
    const endY = pointer.y;

    path.set({ x2: endX, y2: endY });
    canvas.requestRenderAll();
  });

  canvas.on("mouse:up", function () {
    isDrawing = false;
    path.set({ selectable: true, evented: true });
    canvas.selection = true;
    canvas.requestRenderAll();
    canvas.setActiveObject(path);
  });
}

/** 드래그로 사각형, 원형 그리기 */
function drawObject(canvas, type) {
  canvas.off("mouse:down");
  canvas.off("mouse:move");
  canvas.off("mouse:up");

  let isDrawing = false;
  let startX, startY;
  let object;

  canvas.on("mouse:down", function (opt) {
    const currentTarget = canvas.getActiveObject();
    if (currentTarget) return;

    const pointer = canvas.getPointer(opt.e);
    isDrawing = true;

    startX = pointer.x;
    startY = pointer.y;

    switch (type) {
      case "rect":
        object = new fabric.Rect({
          left: startX,
          top: startY,
          width: 0,
          height: 0,
          stroke: "rgba(0, 0, 0, 1)",
          fill: "transparent",
          opacity: 0.5,
          strokeWidth: 2,
          selectable: false,
          evented: false,
        });
        break;
      case "circle":
        object = new fabric.Circle({
          left: startX,
          top: startY,
          radius: 1,
          stroke: "rgba(0, 0, 0, 1)",
          fill: "transparent",
          opacity: 0.5,
          strokeWidth: 2,
          selectable: false,
          evented: false,
        });
        break;
    }

    object.controls.deleteControl = new fabric.Control(deleteControlStyle);

    canvas.add(object);
  });

  canvas.on("mouse:move", function (opt) {
    if (!isDrawing) return;

    const pointer = canvas.getPointer(opt.e);

    const width = pointer.x - startX;
    const height = pointer.y - startY;
    const radius = Math.sqrt(width * width + height * height) / 2;

    switch (type) {
      case "rect":
        object.set({
          width: Math.abs(width),
          height: Math.abs(height),
          left: width < 0 ? pointer.x : startX,
          top: height < 0 ? pointer.y : startY,
        });
        break;
      case "circle":
        object.set({
          left: width < 0 ? pointer.x : startX,
          top: height < 0 ? pointer.y : startY,
          radius: radius,
        });
        break;
    }

    canvas.setActiveObject(object);
  });

  canvas.on("mouse:up", function () {
    isDrawing = false;
    object.set({ selectable: true, evented: true });
  });
}

/** 화살표 만들기 */
function createArrowWithPath(canvas) {
  const pathData = `
  M 0 0 
  L 100 0     <!-- 직선 화살대 -->
  M 100 0 
  L 90 -10    <!-- 화살촉 왼쪽 -->
  M 100 0 
  L 90 10     <!-- 화살촉 오른쪽 -->
`;

  const arrow = new fabric.Path(pathData, {
    left: 100,
    top: 100,
    stroke: "black",
    strokeWidth: 3,
    fill: "", // 채우지 않음
    selectable: true,
  });

  canvas.add(arrow);
  canvas.setActiveObject(arrow);
}
