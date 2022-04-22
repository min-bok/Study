// this와 화살표 함수 (this and arrow functions)

// let deck = {
//     suits: ["hearts", "spades", "clubs", "diamonds"],
//     cards: Array(52),
//     createCardPicker: function() {
//         // NOTE: 아랫줄은 화살표 함수로써, 'this'를 이곳에서 캡처할 수 있도록 합니다
//         return () => {
//             let pickedCard = Math.floor(Math.random() * 52);
//             let pickedSuit = Math.floor(pickedCard / 13);

//             return {suit: this.suits[pickedSuit], card: pickedCard % 13};
//         }
//     }
// }

// let cardPicker = deck.createCardPicker();
// let pickedCard = cardPicker();

// alert("card: " + pickedCard.card + " of " + pickedCard.suit);

// -------------------------------------------------------------

// 오버로드 (Overloads)

let suits = ["hearts", "spades", "clubs", "diamonds"];

function pickCard(x: {suit: string; card: number; }[]): number;
function pickCard(x: number): {suit: string; card: number; };

function pickCard(x): any {
    if (typeof x == "object") {
        let pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    }
    else if (typeof x == "number") {
        let pickedSuit = Math.floor(x / 13);
        return { 
            suit: suits[pickedSuit], 
            card: x % 13 
        };
    }
}

let myDeck = [{suit: "Hodu", card: 800}, {suit: "Minbok", card: 250}, {suit: "Yeong", card: 400}];

let pickedCard1 = myDeck[pickCard(myDeck)];
alert("card: " + pickedCard1.card + " of " + pickedCard1.suit); // 400 of yeong

let pickedCard2 = pickCard(15); // card: 2 of spades
alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);

// 위 예제에서 function pickCard(x): any는 오버로드 목록에 해당되지 않음
// 그래서 두 가지 오버로드만을 가짐: 객체를 받는것 하나와 숫자를 받는 것 하나.

// function pickCard(x: {suit: string; card: number; }[]): number;
// function pickCard(x: number): {suit: string; card: number; };
// 위 두 문장이 없으면 pickCard();의 매개변수가 객체나 숫자가 아니더라도 오류가 발생하지 않음