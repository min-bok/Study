let canvasRef;
let undoStack = [];
let redoStack = [];
let isRestoring = false; // 복원 중인지 체크하는 변수

const MAX_HISTORY = 20; // undo, redo가 가능한 최대 횟수

const undoBtn = document.querySelector(".history-undo");
const redoBtn = document.querySelector(".history-redo");

/** 초기 상태 저장 */
export function initHistory(canvas) {
  canvasRef = canvas;

  saveState();

  canvas.on("object:added", saveState);
  canvas.on("object:modified", saveState);
  canvas.on("object:removed", saveState);
  canvas.on("path:created", () => {
    if (canvas.freeDrawingBrush?.type === "eraser") {
      saveState();
    }
  });
}

/** undo, redo 버튼 활성화 및 비활성화 */
function updateButtons() {
  undoBtn.disabled = undoStack.length < 2;
  redoBtn.disabled = redoStack.length === 0;
}

/** 작업 상태 저장 */
export function saveState() {
  console.log("saveState 실행됨");

  if (!canvasRef || isRestoring) {
    console.log("예외처리에 걸려버렸다");
    return;
  }

  const json = canvasRef.toJSON([
    "clipPath",
    "erasable",
    "selectable",
    "evented",
  ]);

  undoStack.push(json);
  if (undoStack.length > MAX_HISTORY) undoStack.shift();

  redoStack = [];

  updateButtons();
}

/** undo 함수 */
export function historyUndo() {
  console.log("undo 실행됨");
  if (!canvasRef || undoStack.length < 2) {
    console.log("undo 불가");
    return;
  }

  const currentState = undoStack.pop();
  redoStack.push(currentState);
  if (redoStack.length > MAX_HISTORY) redoStack.shift();

  const prevState = undoStack[undoStack.length - 1];

  isRestoring = true;
  canvasRef.clear();
  canvasRef.loadFromJSON(prevState, () => {
    canvasRef.renderAll();
    isRestoring = false;
    updateButtons();
  });
}

/** redo 함수 */
export function historyRedo() {
  console.log("redo 실행됨");
  if (!canvasRef || redoStack.length === 0) {
    console.log("redo 불가");
    return;
  }

  const nextState = redoStack.pop();
  undoStack.push(nextState);
  if (undoStack.length > MAX_HISTORY) undoStack.shift();

  isRestoring = true;
  canvasRef.clear();
  canvasRef.loadFromJSON(nextState, () => {
    canvasRef.renderAll();
    isRestoring = false;
    updateButtons();
  });
}

// undo 실행
undoBtn.addEventListener("click", () => {
  historyUndo();
});

// redo 실행
redoBtn.addEventListener("click", () => {
  historyRedo();
});
