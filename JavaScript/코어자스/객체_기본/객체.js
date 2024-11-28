// let user1 = new Object(); // 객체 생성자 문법
// let user2 = {}; // 객체 리터럴 문법 (주로 사용)

// console.log("객체 생성자", user1);
// console.log("객체 리터럴", user2);

/**
 * ■ 생성자 함수: new 연산자와 함께 호출하여 객체를 생성하는 함수
 * ■ 인스턴스 (생성자 함수에 의해 생성된 함수)
 *
 * Q. 생성자 함수로 생성한 객체와 객체 리터럴로 생성한 객체의 차이점?
 *    - 여러개의 객체를 동일한 구조로 생성하거나 상속이 필요한 경우 => 생성자 함수
 *    - 간단한 데이터를 표현하거나 한 두개의 객체를 만들때, 상속이 필요없을때 => 객체 리터럴
 *
 *    - 생성자 함수로 생성한 객체는 생성자 함수의 prototype과 연결되며, Object.prototype과도 간접적으로 연결됨
 *    - 객체 리터럴로 만든 객체는 전역 Object.prototype와 직접적으로 연결됨
 */

// --------------------------------------

// ▶ 생성자함수
// function User(name, age) {
//   this.name = name;
//   this.age = age;
// }

// let user1 = new User("사용자 1", 25);

// console.log("user1", user1);

// // ▶ 객체리터럴

// let user2 = {
//   name: "사용자 2", // 프로퍼티 (키:값 쌍으로 구성됨)
//   age: 26,
// };

// user2.isAdmin = true;

// console.log("user2", user2.name);
// console.log("user2", user2["age"]);
// console.log("user2", user2.isAdmin);

// delete user2.age; // 프로퍼티 삭제
// console.log("user2", user2.age); // undefined

/**
 * ■ 프로퍼티 키 => 이름, 식별자
 * ■ 프로퍼티 값이 함수 => 메서드
 */

// --------------------------------------

// ▶ 대괄호 표기법과 점 표기법
// let user = {
//   name: "John Doe",
//   age: 27,
// };

// let key = prompt("user의 어떤 정보를 가져올까요?", "name");

// console.log("대괄호 표기법", user[key]); // John Doe
// console.log("점 표기법", user.key); // undefined

/**
 * ■ Window.prompt() : 사용자가 텍스트를 입력할 수 있도록 안내하는 선택적 메시지를 갖는 대화상자 => prompt(msg, default)
 *   - msg: 사용자에게 보여줄 문자열(optional)
 *   - default: 텍스트 필드에 기본으로 채워넣을 문자열 (optional)
 * ■ 대괄호 표기법: 동적으로 키를 지정할 때 유용함, 문자열 또는 변수의 값을 사용해 키에 접근 가능
 * ■ 점 표기법: 정적으로 미리 알고 있는 키에 접근할 때 사용
 */

// --------------------------------------

// ▶ 계산된 프로퍼티
// let animal = prompt("어떤 동물을 좋아하세요?", "cat");

// let love = {
//   [animal]: "고양이를 좋아하시는군요!!!", // [animal]는 프로퍼티 이름을 변수 animal에서 가져오겠다는 의미
// };

// console.log(`${love.cat}`); // 고양이를 좋아하시는군요!!!
// console.log(`${love.dog}`); // undefined

// --------------------------------------

// ▶ 프로퍼티 존재 여부 확인하기
/**
 * ■ 자바스크립트 객체는 다른 언어와 달리 존재하지 않는 프로퍼티에 접근해도 에러가 발생하지않으며, undefined를 반환함
 * ■ in 연산자를 사용해서 프로퍼티 존재 여부를 확인할 수 있음
 *
 * Q.undefined랑 프로퍼티를 비교해도되는데, 왜 in 연산자를 사용하는가?
 *   - 프로퍼티의 값이 undefined인 경우 프로퍼티 존재 여부를 제대로 판별할 수 없음
 */

// let user = { name: "John Doe", isAdmin: undefined };

// console.log(user.age === undefined); // true : 프로퍼티가 존재하지않음
// console.log("name" in user); // true : name 프로퍼티가 존재함
// console.log("age" in user); // false : age 프로퍼티가 존재하지않음

// console.log(user.isAdmin === undefined); // true : isAdmin 프로퍼티가 존재하지만 존재여부를 제대로 판별하지못함
// console.log("isAdmin" in user); // true : isAdmin 프로퍼티가 존재함

// --------------------------------------

// ▶ for...in 반복문
/**
 * 객체의 모든 key를 순환
 */

// let user = {
//   name: "John",
//   age: 30,
//   isAdmin: true,
// };

// for (const key in user) {
//   console.log("key", key); // name, age, isAdmin
//   console.log("value", user[key]); // John, 30, true
// }

// --------------------------------------

// ▶ 객체의 정렬 방식
/**
 * ■ 프로퍼티 key가 정수인 경우에는 자동으로 정렬됨
 * ■ 프로퍼티 key가 정수가 아닌 경우에는 작성순서대로 나열됨
 */

// let codes = {
//   "+1": "미국",
//   "+33": "프랑스",
//   "+49": "독일",
//   "+82": "대한민국",
// };

// for (const key in codes) {
//   console.log(+key); // + 연산자로 인해 문자 -> 숫자로 변경되면서 +를 무시
// }

// ref) https://ko.javascript.info/object
