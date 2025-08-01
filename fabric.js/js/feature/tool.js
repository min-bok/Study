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

// 도구 객체 fill 색상 변경
document.querySelector("#tool-fill-color").addEventListener("input", (e) => {
  const target = canvas.getActiveObject();
  if (!target) return;

  if (target && target.type === "strokeable") {
    target.set("fill", e.target.value);
    canvas.requestRenderAll();
  } else if (target && target.type === "i-text") {
    target.set("backgroundColor", e.target.value);
    canvas.requestRenderAll();
  }
});

// 도구 객체 opacity 변경
document.querySelector("#tool-fill-opacity").addEventListener("change", (e) => {
  const target = canvas.getActiveObject();
  if (!target) return;
  if (target && target.type === "strokeable") {
    target.set("opacity", e.target.value / 100);
    canvas.requestRenderAll();
  }
});

// 도구 객체 stroke 색상 변경
document.querySelector("#tool-stroke-color").addEventListener("input", (e) => {
  const target = canvas.getActiveObject();
  if (!target) return;
  if (target && target.type === "strokeable") {
    target.set("stroke", e.target.value);
    canvas.requestRenderAll();
  } else if (target && target.type === "i-text") {
    target.set("fill", e.target.value);
    canvas.requestRenderAll();
  }
});

// 도구 객체 stroke width 변경
document
  .querySelector("#tool-stroke-weight")
  .addEventListener("change", (e) => {
    const target = canvas.getActiveObject();
    if (!target) return;
    if (target && target.type === "strokeable") {
      target.set("strokeWidth", e.target.value);
      canvas.requestRenderAll();
    }
  });

// 도구 객체 stroke style 설정
document.querySelector("#tool-stroke-style").addEventListener("change", (e) => {
  const target = canvas.getActiveObject();

  if (!target) return;

  if ((target && target.type === "strokeable") || target.type === "pencil") {
    if (e.target.value === "dashed") {
      // dashed
      target.set("strokeDashArray", [10, 12]);
      canvas.requestRenderAll();
    } else {
      // solid
      target.set("strokeDashArray", []);
      canvas.requestRenderAll();
    }
  }
});

// document.querySelector(".tool-wrap .curve").addEventListener("click", () => {
//   console.log("곡선 버튼 클릭됨");
//   drawCurve(canvas);
// });

/** 베지어 곡선으로 변환 */
// function catmullRom2bezier(points) {
//   console.log("points", points.length);
//   if (points.length === 0) {
//     console.log("아직 그리기 시작하지않음");
//     return;
//   }
//   const d = [`M ${points[0].x} ${points[0].y}`];

//   for (let i = 0; i < points.length - 1; i++) {
//     const p0 = points[i - 1] || points[i];
//     const p1 = points[i];
//     const p2 = points[i + 1];
//     const p3 = points[i + 2] || p2;

//     const cp1x = p1.x + (p2.x - p0.x) / 6;
//     const cp1y = p1.y + (p2.y - p0.y) / 6;
//     const cp2x = p2.x - (p3.x - p1.x) / 6;
//     const cp2y = p2.y - (p3.y - p1.y) / 6;

//     d.push(`C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`);
//   }

//   return d.join(" ");
// }

/** 곡선 그리기 */
// function drawCurve(canvas) {
//   canvas.off("mouse:down");
//   canvas.off("mouse:dblclick");

//   let points = [];
//   let curve = null;

//   canvas.on("mouse:down", function (opt) {
//     const currentTarget = canvas.getActiveObject();
//     if (currentTarget) return;

//     canvas.selection = false;

//     const pointer = canvas.getPointer(opt.e);
//     const point = { x: pointer.x, y: pointer.y };
//     points.push(point);

//     if (points.length >= 2) {
//       const pathData = catmullRom2bezier(points);

//       // 이전 curve 제거 후 새로 그리기
//       if (curve) {
//         canvas.remove(curve);
//       }

//       curve = new fabric.Path(pathData, {
//         stroke: "blue",
//         strokeWidth: 2,
//         fill: "",
//         selectable: false,
//         objectCaching: false,
//         evented: false,
//       });

//       canvas.add(curve);
//       canvas.requestRenderAll();
//     }
//   });

//   canvas.on("mouse:dblclick", function () {
//     if (curve) {
//       curve.set({
//         selectable: true,
//         evented: true,
//       });

//       curve.controls.deleteControl = new fabric.Control(deleteControlStyle);

//       curve.setCoords(); // 핸들 정확히 갱신
//       canvas.setActiveObject(curve);
//       canvas.requestRenderAll();
//     }

//     // 상태 초기화
//     points = [];
//     curve = null;
//     canvas.selection = true;
//   });
// }

/** 텍스트 박스 만들기 */
function createTextbox(canvas) {
  const textbox = new fabric.IText("Fabric.JS", {
    fontFamily: "Pretendard",
    fontSize: 30,
    fill: "blue",
    fontWeight: 400,
    lineHeight: 1.2,
    textAlign: "left",
    charSpacing: 100,
    backgroundColor: "white",
    opacity: 1,
  });

  textbox.controls.deleteControl = new fabric.Control(deleteControlStyle); // 객체 삭제 버튼 추가
  // textbox.type = "strokeable-textbox";

  canvas.add(textbox);
  canvas.setActiveObject(textbox);
}

/** 직선 그리기 */
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

    canvas.selection = false;
    canvas.add(path);
    // path.controls.deleteControl = new fabric.Control(deleteControlStyle);
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
    path.type = "strokeable";
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
          stroke: "#222222",
          fill: "#d9d9d9",
          opacity: 1,
          strokeWidth: 3,
          strokeUniform: true,
          strokeDashArray: [], // stroke style
          selectable: false,
          evented: false,
        });
        break;
      case "circle":
        object = new fabric.Circle({
          left: startX,
          top: startY,
          radius: 1,
          stroke: "#222222",
          fill: "#d9d9d9",
          opacity: 1,
          strokeWidth: 3,
          strokeDashArray: [], // stroke style
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

    object.type = "strokeable";
    canvas.setActiveObject(object);
  });

  canvas.on("mouse:up", function () {
    isDrawing = false;
    object.set({ selectable: true, evented: true });
  });
}

/** 화살표 만들기 */
function createArrowWithPath(canvas) {
  console.log("createArrowWithPath 함수 실행됨");

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

    canvas.selection = false;
    canvas.add(path);
    // path.controls.deleteControl = new fabric.Control(deleteControlStyle);
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

    const x1 = path.x1;
    const y1 = path.y1;
    const x2 = path.x2;
    const y2 = path.y2;

    const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

    const arrowHead = new fabric.Triangle({
      left: x2,
      top: y2,
      originX: "center",
      originY: "center",
      angle: angle + 90,
      width: 10,
      height: 12,
      fill: "black",
      selectable: false,
      evented: false,
    });

    const group = new fabric.Group([path, arrowHead], {
      selectable: true,
      evented: true,
    });

    group.type = "strokeable";

    canvas.remove(path);
    canvas.add(group);
    canvas.setActiveObject(group);
    canvas.selection = true;
    canvas.requestRenderAll();
  });
}
