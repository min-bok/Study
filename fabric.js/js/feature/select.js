import { canvas } from "../index.js";
const wrapper = document.getElementById("canvas-wrapper");
const area = document.querySelector("body");

document.addEventListener("DOMContentLoaded", () => {
  canvas.setWidth(wrapper.clientWidth);
  canvas.setHeight(wrapper.clientHeight);
});

document
  .querySelector("#wrap .select-wrap .select")
  .addEventListener("click", () => {
    if (area.className) {
      wrapper.classList.remove("hidden");
      area.classList.remove("select");
      canvas.setWidth(wrapper.clientWidth);
      canvas.setHeight(wrapper.clientHeight);
    } else {
      wrapper.className = "hidden";
      area.className = "select";
      canvas.setWidth(wrapper.clientWidth);
      canvas.setHeight(wrapper.clientHeight);
    }
  });
