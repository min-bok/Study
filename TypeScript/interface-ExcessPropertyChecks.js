// interface User {
//     name?: string;
//     age?: number;
// }
function createUser(info) {
    var newUser = { name: "Minbok", afterTenYear: 24 };
    if (info.name) {
        newUser.name = info.name;
    }
    if (info.age) {
        newUser.afterTenYear = info.age + 10;
    }
    return newUser;
}
// useInfo가 User이 갖고 있지 않은 프로퍼티(mbti)를 가지고 있으므로 에러가 발생
// 'mbti' does not exist in type 'User'
var userInfo = createUser({ name: "Hodu", age: 8, mbti: "INTP" });
console.log(userInfo);
