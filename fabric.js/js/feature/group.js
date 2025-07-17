import { deleteControlStyle } from "./move.js";
import { saveState } from "./historyManager.js";

/** 객체 그룹화 */
export const grouping = (canvas) => {
  const group = canvas.getActiveObject();
  if (!group) {
    return;
  }

  saveState();

  if (group.type !== "activeSelection") {
    return;
  }
  const newGroup = group.toGroup();
  newGroup.controls.deleteControl = new fabric.Control(deleteControlStyle);
  canvas.requestRenderAll();

  saveState();
};

/** 객체 그룹화 해제 */
export const ungrounping = (canvas) => {
  const group = canvas.getActiveObject();
  if (!group) {
    return;
  }
  if (group.type !== "group") {
    return;
  }
  group.toActiveSelection();
  canvas.requestRenderAll();
  saveState();
};
