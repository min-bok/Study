// 새로고침시 마지막 value를 불러와서 input을 채우고싶으면, 브라우저 저장기능(스토리지)를 활용하자
const input = document.querySelectorAll(".input");
const [first, second, third] = document.querySelectorAll(".input");
const total = document.querySelector(".total");

const value_1 = ref(first.value);
const value_2 = ref(second.value);
const value_3 = ref(third.value);

const values = [value_1, value_2, value_3];

/**
 * total input의 value 값을 변경하는 함수
 * @param {Array<{ value: string }>} values - 값이 저장된 ref 객체 배열
 * @param {HTMLInputElement} total - 값을 업데이트할 input 요소
 */
function setTotalValue(values, total) {
  const filteredValues = values
    .filter((v) => v.value !== "")
    .map((v) => v.value); // 빈 값 필터링
  total.value = filteredValues.join(",");
}

first.addEventListener("input", function (e) {
  value_1.value = e.target.value;
});

second.addEventListener("input", function (e) {
  value_2.value = e.target.value;
});

third.addEventListener("input", function (e) {
  value_3.value = e.target.value;
});

function ref(value) {
  const obj = {
    get value() {
      return value;
    },
    set value(newValue) {
      value = newValue;
      setTotalValue(values, total);
    },
  };
  return obj;
}
