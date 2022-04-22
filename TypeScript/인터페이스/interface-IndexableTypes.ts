// interface StringArray {
//     [index: number]: string;
// }

// let myArr: StringArray;

// myArr = ["Hodu", "Minbok"];

// let myStr: string = myArr[0];

// ---------------------------------------------

// class Animal {
//     name: string;
// }

// class Dog extends Animal {
//     breed: string;
// }

// interface NotOkay {
//     [x: number]: Animal;
//     [x: number]: Dog;
// }

//  Duplicate index signature for type 'number'

// ---------------------------------------------

// interface NumberOrStringDictionary {
//     [index: string]: number | string;
//     length: number;
//     name: string;
// }

// ---------------------------------------------

interface ReadonlyStringArray {
    readonly [index: number]: string;
}

let myArray: ReadonlyStringArray = ["Alice", "Bob"];

console.log(myArray[1]); // Bob

// myArray[2] = "Mallory"; // 오류! 읽기 전용이므로 할당 불가