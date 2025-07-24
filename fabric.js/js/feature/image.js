import { deleteControlStyle } from "./move.js";
import { canvas } from "../index.js";

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

export const uploadImage = (canvas, file) => {
  const reader = new FileReader();

  reader.onload = function (evt) {
    const content = evt.target.result;

    const img = new Image();
    img.onload = () => {
      const fabricImg = new fabric.Image(img);
      fabricImg.set({
        left: Math.random() * 100,
        top: Math.random() * 100,
        scaleX: 1, // 기본 크기
        scaleY: 1, // 기본 크기
        hasControls: true, // 크기 조절 및 회전 핸들 활성화
        lockRotation: false, // 회전 허용
      });

      fabricImg.controls.deleteControl = new fabric.Control(deleteControlStyle); // 객체 삭제 버튼 추가

      canvas.add(fabricImg);
      canvas.requestRenderAll();
    };
    img.onerror = () => {
      console.error("HTMLImage load failed");
    };

    img.src = content;
  };

  reader.readAsDataURL(file);
};

// 이미지 crop 기능 실행
const cropIcon = new Image();
cropIcon.src = "../../asset/crop_icon.svg"; // 또는 CDN 경로 등

function renderIconControl(ctx, left, top, styleOverride, fabricObject) {
  const control = fabricObject.controls.cropBR; // 핸들 이름 고정
  const size = control.cornerSize || 24;
  const icon = control.icon;

  if (!icon || !icon.complete) return;

  ctx.save();
  ctx.translate(left, top);
  ctx.drawImage(icon, -size / 2, -size / 2, size, size);
  ctx.restore();
}

cropIcon.onload = () => {
  document.querySelector(".image-crop").addEventListener("click", () => {
    clipImage(canvas);
  });
};

/** 이미지 크롭 기능 수행하는 함수 */
export function clipImage(canvas) {
  const target = canvas.getActiveObject();

  if (!target || target.type !== "image") {
    alert("먼저 이미지를 선택해주세요.");
    return;
  }

  // crop 기본값 설정 (이미 있을 수도 있으니 한번 확인해보자)
  if (!target.cropX) target.cropX = 0;
  if (!target.cropY) target.cropY = 0;

  // 커스텀 crop 컨트롤 추가
  target.controls.cropBR = new fabric.Control({
    x: 0.5,
    y: 0.5,
    offsetX: 10,
    offsetY: 10,
    cursorStyle: "nwse-resize",
    actionHandler: (eventData, transform, x, y) => {
      const img = transform.target;
      const pointer = img.canvas.getPointer(eventData.e);

      const newWidth = pointer.x - img.left;
      const newHeight = pointer.y - img.top;

      if (newWidth > 10 && newHeight > 10) {
        img.set({
          width: newWidth,
          height: newHeight,
        });
        img.setCoords();
        img.canvas.requestRenderAll();
      }

      return true;
    },
    render: renderIconControl,
    icon: cropIcon,
    cornerSize: 18,
  });

  // 기본 컨트롤 숨기고 커스텀 핸들만 보이게
  target.setControlsVisibility({
    tl: false,
    tr: false,
    bl: false,
    br: false,
    ml: false,
    mt: false,
    mr: false,
    mb: false,
    mtr: false,
    cropBR: true,
  });

  // 좌표 계산과 렌더링 반영
  target.setCoords();
  canvas.requestRenderAll();
}
