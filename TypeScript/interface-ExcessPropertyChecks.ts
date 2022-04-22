// interface User {
//     name?: string;
//     age?: number;
// }

// function createUser(info: User): {name: string; afterTenYear: number} {
//     let newUser = {name: "Minbok", afterTenYear: 24};
//     if(info.name) {
//         newUser.name = info.name;
//     }
//     if(info.age) {
//         newUser.afterTenYear = info.age * info.age;
//     }
//     return newUser;
// }

// let userInfo = createUser({name : "Hodu", age : 8, mbti : "INTP"});

// useInfo가 User이 갖고 있지 않은 프로퍼티(mbti)를 가지고 있으므로 에러가 발생
// 'mbti' does not exist in type 'Use

// --------------------------------------------------------------------

// 이러한 에러를 발생시키지 않고 추가 프로퍼티를 사용하는 법
// 인덱스 서명 추가하기

interface User {
    name?: string;
    age?: number;
    [propName: string]: any;
}

function createUser(info: User): {name: string; afterTenYear: number} {
    let newUser = {name: "Minbok", afterTenYear: 24};
    if(info.name) {
        newUser.name = info.name;
    }
    if(info.age) {
        newUser.afterTenYear = info.age + 10;
    }
    return newUser;
}

// 에러가 발생하지 않음
let userInfo = createUser({name : "Hodu", age : 8, mbti : "INTP"});



