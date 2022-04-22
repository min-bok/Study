interface User {
    name?: string;
    age?: number;
}

function createUser(info: User): {name: string; afterTenYear: number} {
    let newUser = {name: "Minbok", afterTenYear: 24};
    if(info.name) {
        newUser.name = info.name;
    }
    if(info.age) {
        newUser.afterTenYear = info.age * info.age;
    }
    return newUser;
}

let userInfo = createUser({name : "Hodu"});