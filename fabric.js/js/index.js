import { createTypography } from "./feature/typography.js";
import { drawBrush } from "./feature/brush.js";
import { uploadImage } from "./feature/image.js";
import { copy, paste } from "./feature/copy.js";

// Nanum Myeongjo
// Poor Story
// Pretendard

document.addEventListener("DOMContentLoaded", () => {
  const canvas = new fabric.Canvas("canvas");

  if (!canvas) return;

  // brush 관련 이벤트 트리거
  document.querySelector(".drawBrush").addEventListener("click", () => {
    drawBrush(canvas);
  });

  // typography 관련 이벤트 트리거
  document.querySelector(".loadTypography").addEventListener("click", () => {
    createTypography(canvas);
  });

  // move: brash 이벤트를 종료하고, move 이벤트 실행
  document.querySelector(".move").addEventListener("click", () => {
    canvas.isDrawingMode = false;
  });

  // 복사/붙여넣기 관련 이벤트 트리거
  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.shiftKey && e.code === "KeyC") {
      console.log("Ctrl + Shift + C 눌림");
      copy(canvas);
    } else if (e.ctrlKey && e.shiftKey && e.code === "KeyV") {
      console.log("Ctrl + Shift + v 눌림");
      paste(canvas);
    }
  });

  // 이미지 업로드: input에서 파일이 변경되면 각 파일을 캔버스에 추가
  document
    .querySelector("input[type='file']#load-image")
    .addEventListener("change", (e) => {
      const files = e.target.files;

      if (!files) return;

      Array.from(files).forEach((file) => {
        uploadImage(canvas, file);
      });
    });
});
