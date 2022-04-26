// CommonJS 사용법

// const axios = require('axious').default;

// GET 요청 수행하기

const axios = require('axios');

// 지정된 ID를 가진 유저에 대한 요청
axios.get('/user?ID=12345')
    .then(function(response) {
        // 성공 핸들링
        console.log(response);
    })
    .catch(function (error) {
        // 에러 핸들링
        console.log(error);
    })
    .then(function () {
        // 항상 실행되는 영역
    });

// 선택적으로 위의 요청은 다음과 같이 수행될 수 있음
axios.get('/user', {
    params: {
        ID: 12345
    }
})
.then(function (response) {
    console.log(response);
})
.catch(function (error) {
    console.log(error);
})
.then(function () {
    // 항상 실행되는 영역
});

// async/await 사용을 원한다면, 함수 외부에 `async` 키워드를 추가하기

async function getUser() {
    try {
        const response = await axios.get('/user?ID=12345');
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}