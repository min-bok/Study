// interface Point {
//     readonly x: number;
//     readonly y: number;
// }

// let p1: Point = {
//     x: 10,
//     y: 20
// };

// p1.x = 5; // Cannot assign to 'x' because it is a read-only property.

// 생성 후 변경되지 않는 배열 만들기

let arr:number[] = [1, 2, 3, 4];

let addReadonly: ReadonlyArray<number> = arr;

arr = addReadonly as number[]; // 타입 단언은 가능

// console.log(arr); // [1, 2, 3, 4]

// console.log(`ro: ${addReadonly}`); // ro: 1,2,3,4

// arr.push(5);

// console.log(arr); // [1, 2, 3, 4, 5]

// console.log(`ro: ${addReadonly}`); // ro: 1,2,3,4,5

// addReadonly.push(5); // Property 'push' does not exist on type 'readonly number[]