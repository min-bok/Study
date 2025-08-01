import { canvas } from "../index.js";
import { deleteControlStyle } from "./move.js";

// 텍스트 굵기 변경 (200, 400, 700)
document
  .querySelector("#font-weight-select")
  .addEventListener("change", (e) => {
    const text = canvas.getActiveObject();

    if (!text) return;

    if (text.type === "i-text") {
      text.set("fontWeight", e.target.value);
      canvas.requestRenderAll();
    }
  });

// 텍스트 정렬 변경 (left, center, right)
document.querySelector("#font-align").addEventListener("change", (e) => {
  const text = canvas.getActiveObject();

  if (!text) return;
  if (text.type === "i-text") {
    text.set("textAlign", e.target.value);
    canvas.requestRenderAll();
  }
});

export const createTypography = (canvas) => {
  console.log("createTypography 함수 실행됨");
  document.fonts.ready.then(() => {
    canvas.isDrawingMode = false;

    const text = new fabric.IText("Fabric.JS", {
      left: Math.random() * 500,
      top: Math.random() * 500,
      fontFamily: "Pretendard",
      fontSize: 30,
      fill: "#222222", // 텍스트 색
      strokeWidth: 2,
      cornerStyle: "circle",
      fontWeight: 400,
      transparentCorners: false,
      borderColor: "blue",
      borderDashArray: [3, 1, 3],
      textAlign: "left",
      includeDefaultValues: false, // 텍스트 객체 직렬화시 기본값 포함여부, true: 모든 속성 포함
      // stroke: "blue", // 텍스트 테두리
      // padding: 10,
      // skewX: -15, // 이탤릭체
      // lineHeight: 1.2, // 행간
      // underline: false, // underline
      // charSpacing: 100, // 자간
      // opacity: 1, // 투명도
      // backgroundColor: "pink",
      // shadow: {
      //   color: "red",
      //   blur: 20, // 번짐 정도 (빛 퍼짐 효과)
      //   offsetX: 0, // 좌우로 안 밀리게
      //   offsetY: 0,
      //   affectStroke: true, // stroke에도 그림자 적용 (fabric 5 이상 권장)
      // },
    });

    text.controls.deleteControl = new fabric.Control(deleteControlStyle); // 객체 삭제 버튼 추가

    canvas.add(text);
    // canvas.centerObject(text); // 가운데 정렬
    canvas.setActiveObject(text);

    // 텍스트 서체 변경
    document.getElementById("font-selector").addEventListener("change", (e) => {
      const font = e.target.value;
      const active = canvas.getActiveObject();
      if (active && active.type === "i-text") {
        active.set("fontFamily", font);
        canvas.fire("object:modified", { target: active });
        canvas.requestRenderAll();
      }
    });

    // 텍스트 색 변경
    document.getElementById("text-color").addEventListener("input", (e) => {
      const color = e.target.value;
      const active = canvas.getActiveObject();
      if (active && active.type === "i-text") {
        active.set("fill", color);
        canvas.fire("object:modified", { target: active });
        canvas.requestRenderAll();
      }
    });
  });
};
