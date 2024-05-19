const target = document.querySelector(".target");
const startBtn = document.querySelector(".startBtn");
const endBtn = document.querySelector(".endBtn");
const connect = document.querySelector(".connect");
const disconnect = document.querySelector(".disconnect");
const observer_status = document.querySelector(".status");
const elem = document.querySelector("#elem");

let intervalId;

const interval = () => {
  target.innerText = Math.floor(Math.random() * 11);
};

startBtn.addEventListener("click", () => {
  if (!intervalId) {
    intervalId = setInterval(interval, 1000);
  }
});

endBtn.addEventListener("click", () => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
});
