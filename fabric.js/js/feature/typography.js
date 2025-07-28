import { deleteControlStyle } from "./move.js";

export const createTypography = (canvas) => {
  console.log("createTypography 함수 실행됨");
  document.fonts.ready.then(() => {
    let _fontSize = 30;
    let _fontFamily = "Pretendard"; // Nanum Myeongjo, Pretendard, Poor Story
    let _color = "red";
    let _fontWeight = 700;
    let _lineHeight = 1.2;
    let _skewX = 0; // -15
    let _align = "left";
    const _shadow = {
      color: "red",
      blur: 20, // 번짐 정도 (빛 퍼짐 효과)
      offsetX: 0, // 좌우로 안 밀리게
      offsetY: 0,
      affectStroke: true, // stroke에도 그림자 적용 (fabric 5 이상 권장)
    };

    canvas.isDrawingMode = false;

    const text = new fabric.IText("Fabric.JS", {
      left: Math.random() * 500,
      top: Math.random() * 500,
      fontFamily: _fontFamily,
      fontSize: _fontSize,
      fill: _color, // 텍스트 색
      // stroke: "blue", // 텍스트 테두리
      strokeWidth: 2,
      cornerStyle: "circle",
      padding: 10,
      fontWeight: _fontWeight, // 필요한가
      transparentCorners: false,
      borderColor: "orange",
      borderDashArray: [3, 1, 3],
      skewX: _skewX, // 이탤릭체
      lineHeight: _lineHeight, // 행간
      textAlign: _align,
      underline: false, // underline
      charSpacing: 100, // 자간
      // opacity: 1, // 투명도
      // backgroundColor: "pink",
      // shadow: _shadow,
      includeDefaultValues: false, // 텍스트 객체 직렬화시 기본값 포함여부, true: 모든 속성 포함
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
