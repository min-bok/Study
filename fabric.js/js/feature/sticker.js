import { sticker } from "../stickerList.js";
import { canvas } from "../index.js";
import { deleteControlStyle } from "./move.js";

/** canvas에 svg를 불러오는 함수 */
const uploadSVG = (sticker) => {
  fabric.loadSVGFromString(sticker, (objects, options) => {
    const obj = fabric.util.groupSVGElements(objects, options);
    obj.set({ left: Math.random() * 100, top: Math.random() * 100 });
    obj.controls.deleteControl = new fabric.Control(deleteControlStyle); // 객체 삭제 버튼 추가
    canvas.add(obj);
    canvas.requestRenderAll();
  });
};

// sticker svg를 불러옴
document.querySelector(".sticker-wrap").addEventListener("click", (e) => {
  uploadSVG(sticker[e.target.value]);
});

// sticker 색상 변경
document.querySelector("#sticker-color").addEventListener("input", (e) => {
  const activeObject = canvas.getActiveObject();
  let color = e.target.value;

  if (!activeObject) {
    console.log("현재 타겟팅된 요소없음");
    return;
  }

  if (activeObject.type === "activeSelection") {
    // 여러개의 요소 선택했을때
    activeObject._objects.forEach((obj) => {
      if (obj.type === "path" || obj.type === "rect" || obj.type === "circle") {
        obj.set({ fill: color });
      }
    });
  } else if (["path", "rect", "circle"].includes(activeObject.type)) {
    // 하나의 요소만 선택했을때
    activeObject.set({ fill: color });
  }

  canvas.requestRenderAll();
});
