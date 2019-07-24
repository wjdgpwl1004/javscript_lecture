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
