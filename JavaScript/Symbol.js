/**
Symbol은 ES6에서 새롭게 추가된 7번째 타입으로 변경이 불가능한 원시 타입의 값,
주로 이름의 충돌 위험이 없는 객체의 유일한 프로퍼티 키를 만들기 위해 사용됨
 */

const obj = {};

const myName = Symbol("minbok"); // 여기서 minbok은 심볼에 대한 단순한 설명으로 심볼의 고유성에 영향을 주지않음. 디버깅 시 어떤 용도로 심볼을 만들었는지 알 수있게 하는 용도
// Symbol 함수에 인자로 전달되는 문자열 ex) minbok은 sysm

obj.myName = "lee";

console.log(obj, obj.myName); // { myName: 'lee' } lee


