let canvasRef;
let undoStack = [];
let redoStack = [];

export function initHistory(canvas) {
  canvasRef = canvas;

  canvas.on("object:added", saveState);
  canvas.on("object:modified", saveState);
  canvas.on("object:removed", saveState);

  saveState(); // 초기 상태 저장
}

function saveState() {
  console.log("saveState 실행됨");
  if (!canvasRef) return;
  const json = canvasRef.toJSON();
  undoStack.push(json);
  redoStack = [];
}

const historyUndo = () => {
  console.log("undo 실행됨");
  if (!canvasRef || undoStack.length < 2) return;
  const currentState = undoStack.pop();
  redoStack.push(currentState);
  const prev = undoStack[undoStack.length - 1];
  canvasRef.loadFromJSON(prev, () => canvasRef.renderAll());
};

const historyRedo = () => {
  console.log("redo 실행됨");
  if (!canvasRef || redoStack.length === 0) return;
  const next = redoStack.pop();
  undoStack.push(next);
  canvasRef.loadFromJSON(next, () => canvasRef.renderAll());
};

// History Undo
document.querySelector(".history-undo").addEventListener("click", () => {
  historyUndo();
});

// History Redo
document.querySelector(".history-redo").addEventListener("click", () => {
  historyRedo();
});
