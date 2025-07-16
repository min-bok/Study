import { deleteControlStyle } from "./move.js";

/** 객체 그룹화 */
export const grouping = (canvas) => {
  if (!canvas.getActiveObject()) {
    return;
  }
  if (
    canvas.getActiveObject().type !== "activeSelection" &&
    canvas.getActiveObject().type !== "activeselection"
  ) {
    return;
  }
  const group = new fabric.Group(canvas.getActiveObject().removeAll());
  group.controls.deleteControl = new fabric.Control(deleteControlStyle); // 객체 삭제 버튼 추가

  canvas.add(group);
  canvas.setActiveObject(group);
  canvas.requestRenderAll();
};

/** 객체 그룹화 해제 */
export const ungrounping = (canvas) => {
  const group = canvas.getActiveObject();
  if (!group || group.type !== "group") {
    return;
  }
  canvas.remove(group);
  var sel = new fabric.ActiveSelection(group.removeAll(), {
    canvas: canvas,
  });
  canvas.setActiveObject(sel);
  canvas.requestRenderAll();
};
