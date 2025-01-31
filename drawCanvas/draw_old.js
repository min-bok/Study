const body = document.querySelector("body");
const canvas = document.querySelector("#grid-canvas");
const ctx = canvas.getContext("2d");
const strokeWidthInput = document.querySelector("#strokeWidth");
const strokeWidthValue = document.querySelector("#strokeValue");

// console.log("strokeWidthInput", strokeWidthInput);
// console.log("strokeWidthValue", strokeWidthValue);

let strokeWidth = 1;
let strokeColor = "#00734f";
let gridSpacing = 1; // 격자 간격
let isDrawing = false;
let lastPosition = null;

// 캔버스 크기 설정
canvas.width = 800;
canvas.height = 800;

// 격자 그리기 함수
function drawGrid(spacing) {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스 초기화
  ctx.strokeStyle = "#ddd";
  ctx.lineWidth = strokeWidth;

  for (let x = 0; x <= canvas.width; x += spacing) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }

  for (let y = 0; y <= canvas.height; y += spacing) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
}

// 선 그리기 함수
function drawLine(from, to) {
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = strokeWidth;
  ctx.beginPath();
  ctx.moveTo(from.x, from.y);
  ctx.lineTo(to.x, to.y);
  ctx.stroke();
}

// 그리기 시작
canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  const rect = canvas.getBoundingClientRect();
  lastPosition = {
    x: Math.round((e.clientX - rect.left) / gridSpacing) * gridSpacing,
    y: Math.round((e.clientY - rect.top) / gridSpacing) * gridSpacing,
  };
});

// 그리는 중
canvas.addEventListener("mousemove", (e) => {
  if (isDrawing) {
    const rect = canvas.getBoundingClientRect();
    const currentPosition = {
      x: Math.round((e.clientX - rect.left) / gridSpacing) * gridSpacing,
      y: Math.round((e.clientY - rect.top) / gridSpacing) * gridSpacing,
    };

    if (lastPosition) {
      drawLine(lastPosition, currentPosition);
      lastPosition = currentPosition;
    }
  }
});

// 그리기 종료
canvas.addEventListener("mouseup", () => {
  isDrawing = false;
  lastPosition = null;
});

// 선 굵기 변경
strokeWidthInput.addEventListener("input", () => {
  //   strokeWidth = parseInt(strokeWidthValue.value, 10);

  console.log("strokeWidthValue.value", strokeWidth);
  //   strokeWidthValue.textContent = strokeWidth;
  //   drawGrid(strokeWidth);
});

// 초기 격자 그리기
// drawGrid(strokeWidth);
