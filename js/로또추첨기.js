var 후보군 = Array(45).fill().map(function(요소, 인덱스){
    return 인덱스+1;
});

// console.log(후보군);

var 셔플 = [];
while(후보군.length>0){
    var 이동값 = 후보군.splice(Math.floor(Math.random()*후보군.length),1)[0];
    셔플.push(이동값);
}

var 보너스 = 셔플[셔플.length-1];
var 당첨숫자들 = 셔플.slice(0,6);

console.log('당첨숫자들', 당첨숫자들.sort(function(p,c) {return p-c;}), '보너스', 보너스);


var 결과창 = document.getElementById('result');
function 공색칠하기(숫자, 결과창){
    var 공 = document.createElement('div');
    공.textContent = 숫자;
    공.style.display = 'inline-block';
    공.style.border='1px solid black';
    공.style.borderRadius='50%';
    공.style.width='30px';
    공.style.height='30px';
    공.style.textAlign='center';
    공.style.marginRight='5px';
    공.id='공아이디'+숫자;
    공.className='공아이디';
    var 배경색;
    if(숫자<=10){
        배경색 = 'red';
    }else if(숫자<=20){
        배경색 = 'orange';
    }else if(숫자<=30){
        배경색 = 'yellow';
    }else if(숫자<=40){
        배경색 = 'blue';
    }else{
        배경색 = 'green';
    }

    공.style.background=배경색;
    공.style.lineHeight='30px';
    결과창.appendChild(공);
}

for (let i = 0; i < 당첨숫자들.length; i++) {
    (function (index) {
        setTimeout(() => {
            공색칠하기(당첨숫자들[index], 결과창);
        }, 1000 * (index + 1));
    }(i));
}
//반복문이 setTimeout이 실행되기전에 끝나버린다. 클로저 문제때문. 그래서 새로운 스코프를 추가하여 반복마다 값을 저장하는 방식을 사용하면
//메모리에 그 공간이 할당 되어서, 잘 실행하게 된다.(각각 다른 환경에 노출되어 그 환경속에서 각각 작업이 처리된다.)

/*
setTimeout(function 비동기콜백함수(){
    공색칠하기(당첨숫자들[0], 결과창);
}, 1000);//밀리초
setTimeout(function 비동기콜백함수(){
    공색칠하기(당첨숫자들[1], 결과창);
}, 2000);//밀리초
setTimeout(function 비동기콜백함수(){
    공색칠하기(당첨숫자들[2], 결과창);
}, 3000);//밀리초
setTimeout(function 비동기콜백함수(){
    공색칠하기(당첨숫자들[3], 결과창);
}, 4000);//밀리초
setTimeout(function 비동기콜백함수(){
    공색칠하기(당첨숫자들[4], 결과창);
}, 5000);//밀리초
setTimeout(function 비동기콜백함수(){
    공색칠하기(당첨숫자들[5], 결과창);
}, 6000);//밀리초
*/
setTimeout(function 비동기콜백함수(){
    var 칸 = document.getElementsByClassName('bonus')[0];
    공색칠하기(보너스, 칸);
}, 7000);



//while 은 정해진 값이 없을 때 또는 기준값이 바뀔 때, for은 정해진 값 있을 경우..
//sort(function(p,c) {return p-c;}) 오름차순 0보다 큰 경우 순서 바꿈
//sort(function(p,c) {return c-p;}) 내림차순
// 아이디 값 가져오기   document.getElementById('result');
// 클래스 이름에 맞는 것 불러오기 document.getElementsByClassName('bonus')[0]; 여러개 가져올 수 있으므로.. [0]으로 표시
// getElementByTagName->태그이름으로 찾기
//다른부분은 매개변수로, 겹치는 부분은 함수로 
//공.id='공아이디'+숫자; 
//공.className='공아이디';
//querySelector(#아이디), querySelector(.클래스)->클래스와 아이디 태그를 가져오는 또 다른 방법
//querySelectorAll 여러 태그 동시 선택