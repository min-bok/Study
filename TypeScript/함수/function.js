// 기명 함수
// function add(x: number, y: number): number {
//     return x + y;
// }
// // 익명 함수
// let myAdd = function(x: number, y: number): number {
//     return x + y;
// }
// -------------------------------------------------------
// 함수 타입 작성하기
// let myAdd: (x: number, y: number) => number = 
//     function(x: number, y: number): number {
//         return x + y;
//     };
// 위와 동일
// let myAdd: (baseValue: number, increment: number) => number = 
//     function(x: number, y:number): number {
//         return x + y;
// }
// -------------------------------------------------------
// 타입의 추론: 한쪽에만 타입이 있어도 타입을 알아낼 수 있음
var myAdd = function (x, y) {
    return x + y;
};
