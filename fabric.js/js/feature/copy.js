let _clipboard;

export function copy(canvas) {
  canvas.getActiveObject().clone(function (cloned) {
    _clipboard = cloned;
  });
}

export async function paste(canvas) {
  _clipboard.clone(function (clonedObj) {
    canvas.discardActiveObject();
    clonedObj.set({
      left: clonedObj.left + 10,
      top: clonedObj.top + 10,
      evented: true,
    });
    if (clonedObj.type === "activeSelection") {
      clonedObj.canvas = canvas;
      clonedObj.forEachObject(function (obj) {
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
  });
}
