var 가로 = 4;
var 세로 = 3;
var 색깔후보 = ['red', 'red', 'orange', 'orange', 'green', 'green', 'yellow', 'yellow', 'white', 'white', 'pink', 'pink'];
var 색깔=[];
var 선택한카드=[];
var 성공한카드=[];
for(var i=0; 색깔후보.length>0; i+=1){
    색깔 = 색깔.concat(색깔후보.splice(Math.floor(Math.random()*색깔후보.length),1));
}

function 카드세팅(가로, 세로){
    for(var i=0; i<가로*세로; i+=1){
        var card = document.createElement(('div'));
        card.className = 'card';
        card.dataset.color = 색깔[i];
        var cardInner = document.createElement('div');
        cardInner.className = 'card-inner';
        var cardFront = document.createElement('div');
        cardFront.className='card-front';
        var cardBack = document.createElement('div');
        cardBack.className='card-back';
        cardBack.style.backgroundColor = 색깔[i];
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);
             // card.addEventListener('click', function(){
             //     this.classList.toggle('flipped');
             // });
        card.onclick = toggleClass;

        document.body.appendChild(card);
    }
}

카드세팅(가로, 세로);
window.timeout = null;

function toggleClass () {
    if (선택한카드.length >= 2 || window.timeout !== null) {
        return alert('2장 이상의 카드를 열수 없습니다.');
    }

    선택한카드.push(this);
    this.classList.toggle('flipped');

    if (선택한카드.length === 2) {
        console.log(선택한카드);
        checkCompare();
    }
}

function checkCompare () {
    // length 2
    const firstCard = 선택한카드[0];
    const secondCard = 선택한카드[1];

    if (firstCard.dataset.color === secondCard.dataset.color) { // 색깔이 같으면 맞춘거임
        // 성공하면 성공한카드에 넣고 선택한카드 비우기
        성공한카드 = [...선택한카드];
        선택한카드 = [];
    } else { // 실패
        (function (first, second) {
            window.timeout = setTimeout(() => {
                first.classList.remove('flipped');
                second.classList.remove('flipped');
                선택한카드 = [];
                window.timeout = null;
            },1000);
        })(firstCard, secondCard);
    }
}

//원시값은 복사
//객체, 배열, 함수는 참조관계

//객체를 복사하는 방법 1
// var obj = {a: 1, b: 2}
// var obj2 = {};
//
// obj2.a = obj.a;
// obj2.b = obj.b; //원시값을 하나씩 대입하여 복사

//객체를 복사하는 방법 2
// var obj = {a: 1, b: 2, c: 3}
// Object.keys(obj) //["a","b","c"];
//
// var obj2 ={};
// Object.keys(obj).forEach(function (key) { 1단계만 복사, 나머지는 참조
//    obj2[key] = obj[key];
// });
var obj = {a: 1, b: {c: 1} };//이런경우 위처럼 반복문을 돌려도 a의 값은 원시값이라 복사가되지만, b의 값은 객체라서 참조가 된다.
//앝은복사 ->참조, 깊은복사->복사

function copyObj(obj) { //재귀로 복사..
    var copy = {};
    if (Array.isArray(obj)) {
        copy = obj.slice().map((v) => {
            return copyObj(v);
        });
    } else if (typeof obj === 'object' && obj !== null) {
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) {
                copy[attr] = copyObj(obj[attr]);
            }
        }
    } else {
        copy = obj;
    }
    return copy;
}

// obj2 = JSON.parse(JSON.stringify(obj));

//베열은 slice()이용 하지만 1단계만 복사, 나머지는 참조

