// MutationObserver
let old = target.innerText;

const callback = (mutationsList) => {
  mutationsList.forEach((mutation) => {
    if (mutation.type === "characterData") {
      // contenteditable 속성을 통해 직접 DOM을 조작한 경우
      console.log("변경 전: " + mutation.oldValue);
      console.log("변경 후: " + mutation.target.data);
    } else {
      // js로 text를 변경한 경우
      console.log(old, mutation.target.innerText);
      old = mutation.target.innerText;
      console.log(mutation.type); // childList
      console.log(mutation.oldValue); // null
    }
  });
};

const observer = new MutationObserver(callback);
const config = {
  childList: true,
  subtree: true,
  characterData: true,
  characterDataOldValue: true,
};

const start_connent = () => {
  observer.observe(target, config);
  observer_status.innerText = "감시중...";
};

const end_connect = () => {
  observer.disconnect();
  observer_status.innerText = "감시종료";
};
