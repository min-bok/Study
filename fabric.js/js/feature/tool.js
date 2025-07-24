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

function createTextbox(canvas) {
  const text = new fabric.IText("Fabric.JS", {
    fontFamily: "Pretendard",
    fontSize: 30,
    fill: "blue",
    fontWeight: 700,
    lineHeight: 1.2,
    textAlign: "left",
    charSpacing: 100,
    opacity: 1,
  });

  const rect = new fabric.Rect({
    left: text.left - 10,
    top: text.top - 10,
    width: text.width + 20,
    height: text.height + 20,
    fill: "white",
    selectable: false,
  });

  const group = new fabric.Group([rect, text], {
    left: Math.random() * 500,
    top: Math.random() * 500,
  });

  group.controls.deleteControl = new fabric.Control(deleteControlStyle); // 객체 삭제 버튼 추가

  canvas.add(group);
  canvas.setActiveObject(group);
}

/** 사각형 만들기 */
function createRect(canvas) {
  console.log("createRect 실행됨");
  const rect = new fabric.Rect({
    left: Math.random() * 500,
    top: Math.random() * 500,
    width: 100,
    height: 100,
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
    fill: "pink",
    opacity: 1,
  });

  canvas.add(circle);
  canvas.setActiveObject(circle);
}
