import "./saveData.js";
import "./feature/select.js";
import { createTypography } from "./feature/typography.js";
import { copy, paste } from "./feature/copy.js";
import { grouping, ungrounping } from "./feature/group.js";
import { initHistory } from "./feature/historyManager.js";
import { mouseWheel, handleHandTool } from "./feature/move.js";
import "./feature/brush.js";
import "./feature/image.js";
import "./feature/historyManager.js";
import "./feature/sticker.js";
import "./feature/tool.js";

export let canvas = new fabric.Canvas("canvas");

document.addEventListener("DOMContentLoaded", () => {
  if (!canvas) return;

  initHistory(canvas); // history 관련: redo, undo
  mouseWheel(canvas); // 줌인/줌아웃

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

  // 이미지로 다운로드
  document.querySelector(".download-wrap").addEventListener("click", () => {
    console.log("이미지로 다운로드 클릭", canvas);
    // canvas.lowerCanvasEl.toBlob(function (blob) {
    //   console.log("blob", blob);
    //   // const url = URL.createObjectURL(blob);
    //   // const a = document.createElement("a");
    //   // a.href = url;
    //   // a.download = "canvas-image.png";
    //   // a.click();
    //   // URL.revokeObjectURL(url);
    // });

    const target = document.querySelector("body");

    html2canvas(target, {
      useCORS: true, // 이미지가 크로스 도메인일 경우 필요
      backgroundColor: null, // 배경 투명하게
    }).then((canvas) => {
      // canvas -> blob 변환
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "screenshot.png";
        a.click();
        URL.revokeObjectURL(url);
      });
    });
  });
});
