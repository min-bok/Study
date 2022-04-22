// 선택적 매기변수와 기본 매개변수
// TS 컴파일러는 함수가 호출될 때 각 매개변수에 대해 사용자가 값을 제공했는지 검사함
// 함수에 주어진 인자의 수는 함수가 기대하는 매개변수의 수와 일치해야함
// function buildName(firstName: string, lastName: string) {
//     return firstName + " " + lastName;
// }
// // let result1 = buildName("Hodu"); // Expected 2 arguments, but got 1 // 'lastName' was not provided
// // let result2 = buildName("Hodu", "Minbok", "Hayeong"); //  Expected 2 arguments, but got 3.
// let result2 = buildName("Hodu", "Minbok");
// console.log(result2); // Hodu Minbok
// --------------------------------------------------------
// TS에서 선택적 매개변수를 원한다면 `?`를 사용하면 됨
// 선택적 매개변수는 반드시 기본 매개변수 뒤에 위치해야함
// function buildName(firstName: string, lastName?: string) {
//     if(lastName) {
//         return `${firstName} ${lastName}`
//     } else {
//         return firstName;
//     }
// }
// // let result1 = buildName("Minbok"); // Minbok
// // let result2 = buildName("Minbok", "Lee", "Hodu"); // Expected 1-2 arguments, but got 3.
// let result3 = buildName("Minbok", "Lee"); // Minbok Lee
// --------------------------------------------------------
// 사용자가 값을 제공하지 않거나, undefined일때 할당될 매개변수의 값을 정해둘 수도 있음
// 이를 기본-초기화 매개변수라고 함
// 기본-초기화 매개변수는 기본 변수 앞에 위치할 수 있음
// 그러나 만약 기본-초기화 매개변수가 필수 매개변수보다 앞에 오게 된다면 사용자가 명시적으로 undefined 를 전달해 주어야 기본-초기화 매개변수를 볼 수 있
function buildName(firstName, lastName) {
    if (lastName === void 0) { lastName = "Lee"; }
    return "".concat(firstName, " ").concat(lastName);
}
// let result1 = buildName("Minbok"); // Minbok Lee
// let result2 = buildName("Minbok" , undefined); // Minbok Lee
// let result3 = buildName("Minbok", "Lee", "Hodu"); // Expected 1-2 arguments, but got 3.
var result4 = buildName("Minbok", "Hodu"); // Minbok Hodu
console.log(result4);
