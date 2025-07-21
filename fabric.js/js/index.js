import { createTypography } from "./feature/typography.js";
import { drawBrush, drawEraser } from "./feature/brush.js";
import { uploadImage } from "./feature/image.js";
import { copy, paste } from "./feature/copy.js";
import { grouping, ungrounping } from "./feature/group.js";
import "./feature/historyManager.js";
import "./feature/sticker.js";
import { initHistory } from "./feature/historyManager.js";
import { mouseWheel, handleHandTool } from "./feature/move.js";

export let canvas = new fabric.Canvas("canvas");

document.addEventListener("DOMContentLoaded", () => {
  if (!canvas) return;

  initHistory(canvas); // history 관련: redo, undo
  mouseWheel(canvas); // 줌인/줌아웃

  // brush 관련 이벤트 트리거
  document.querySelector(".drawBrush").addEventListener("click", () => {
    drawBrush(canvas);
  });

  // eraser 관련 이벤트 트리거
  document.querySelector(".eraserBrush").addEventListener("click", () => {
    drawEraser(canvas);
  });

  // typography 관련 이벤트 트리거
  document.querySelector(".loadTypography").addEventListener("click", () => {
    createTypography(canvas);
  });

  // move: brash 이벤트를 종료하고, move 이벤트 실행
  document.querySelector(".move").addEventListener("click", () => {
    canvas.isDrawingMode = false;
  });

  // Hand Tool 관련 이벤트 트리거
  document.querySelector(".hand-tool").addEventListener("click", () => {
    handleHandTool(canvas);
  });

  // 전체 삭제 기능 활성화
  document.querySelector(".canvas-clear").addEventListener("click", () => {
    canvas.clear();
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

      e.target.value = "";
    });

  // 객체 그룹화 및 그룹화 해제
  document
    .querySelector(".grouping")
    .addEventListener("click", () => grouping(canvas));
  document
    .querySelector(".ungrouping")
    .addEventListener("click", () => ungrounping(canvas));

  // 현재 캔버스 저장
  document.querySelector(".saveCanvas").addEventListener("click", () => {
    console.log("현재 캔버스 저장");
    const savedState = canvas.toJSON();
    sessionStorage.setItem("canvasState", JSON.stringify(savedState));
  });

  // 저장된 캔버스 불러오기
  document.querySelector(".getSaveedState").addEventListener("click", () => {
    console.log("저장된 캔버스 불러오기");
    const savedState = sessionStorage.getItem("canvasState");

    if (!savedState) return;

    canvas.loadFromJSON(JSON.parse(savedState), () => {
      canvas.renderAll();
    });
  });
});
