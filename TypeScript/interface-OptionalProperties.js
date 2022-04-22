function createUser(info) {
    var newUser = { name: "Minbok", afterTenYear: 24 };
    if (info.name) {
        // console.log(newUser.name); // Minbok
        newUser.name = info.name;
        // console.log(newUser.name); // Hodu
    }
    if (info.age) {
        // console.log(newUser.afterTenYear); // 24
        newUser.afterTenYear = info.age + 10;
        // console.log(newUser.afterTenYear); // 18
    }
    return newUser;
}
var userInfo = createUser({ name: "Hodu"});
// var userInfo = createUser({ name: "Hodu" , age: 8});
