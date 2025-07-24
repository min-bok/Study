import { deleteControlStyle } from "./move.js";
import { canvas } from "../index.js";

document.querySelector(".tool-wrap .text-box").addEventListener("click", () => {
  console.log("텍스트 박스 버튼 클릭됨");
  createTextbox(canvas);
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
    // rx: 5,
    // ry: 5,
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
