import { deleteControlStyle } from "./move.js";
import { canvas } from "../index.js";

document.querySelector(".tool-wrap .text-box").addEventListener("click", () => {
  console.log("텍스트 박스 버튼 클릭됨");
  createTextbox(canvas);
});

document.querySelector(".tool-wrap .rect").addEventListener("click", () => {
  console.log("사각형 버튼 클릭됨");
  createRect(canvas);
});

document.querySelector(".tool-wrap .circle").addEventListener("click", () => {
  console.log("원형 버튼 클릭됨");
  createCircle(canvas);
});

document.querySelector(".tool-wrap .line").addEventListener("click", () => {
  console.log("선 버튼 클릭됨");
  createLineWithPath(canvas);
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

/** 사각형 만들기 */
function createRect(canvas) {
  console.log("createRect 실행됨");
  const rect = new fabric.Rect({
    left: Math.random() * 500,
    top: Math.random() * 500,
    width: 100,
    height: 100,
    stroke: "blue",
    fill: "powderblue",
    opacity: 1,
  });

  canvas.add(rect);
  canvas.setActiveObject(rect);
}

/** 원형 만들기 */
function createCircle(canvas) {
  console.log("createCircle 실행됨");
  const circle = new fabric.Circle({
    left: Math.random() * 500,
    top: Math.random() * 500,
    radius: 50,
    stroke: "red",
    fill: "pink",
    opacity: 1,
  });

  canvas.add(circle);
  canvas.setActiveObject(circle);
}

/** 선 만들기 */
function createLineWithPath(canvas) {
  const linePath = new fabric.Path(
    `
  M 50 50 
  L 200 50
`,
    {
      stroke: "red",
      strokeWidth: 3,
      fill: "", // 채우지 않음
      selectable: true,
    }
  );

  canvas.add(linePath);
  canvas.setActiveObject(linePath);
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
