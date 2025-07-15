let _clipboard;

export function copy(canvas) {
  if (!canvas.getActiveObject()) return;
  canvas
    .getActiveObject()
    .clone()
    .then((cloned) => {
      _clipboard = cloned;
    });
}

export async function paste(canvas) {
  const clonedObj = await _clipboard.clone();
  canvas.discardActiveObject();
  clonedObj.set({
    left: clonedObj.left + 10,
    top: clonedObj.top + 10,
    evented: true,
  });
  if (clonedObj instanceof fabric.ActiveSelection) {
    clonedObj.canvas = canvas;
    clonedObj.forEachObject((obj) => {
      canvas.add(obj);
    });
    clonedObj.setCoords();
  } else {
    canvas.add(clonedObj);
  }
  _clipboard.top += 10;
  _clipboard.left += 10;
  canvas.setActiveObject(clonedObj);
  canvas.requestRenderAll();
}
