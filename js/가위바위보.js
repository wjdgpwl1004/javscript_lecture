var 이미지좌표=0;
var dictionary = {
    바위: '0',
    가위: '-142px',
    보: '-284px',
};

console.log(Object.entries(dictionary));
function 컴퓨터의선택(이미지좌표){
    return Object.entries(dictionary).find(function(v){//반복하면서 값을 찾음. 이차원배열에선 find, findIndex씀. 
        return v[1]=== 이미지좌표;
    })[0];
}

var 인터벌;
function 인터벌메이커(){
    인터벌 = setInterval(()=>{
        if(이미지좌표===dictionary.바위){
            이미지좌표=dictionary.가위;
        }else if(이미지좌표===dictionary.가위){
            이미지좌표=dictionary.보;
        }else{
            이미지좌표=dictionary.바위;
        }
        document.querySelector('#computer').style.backgroundPosition=이미지좌표+' 0';
    },100);
}
인터벌메이커();

var 점수표 = {//여러개의 딕셔너리 자료구조가 서로 비슷한 경우, 하나로 합쳐주면 좋다.
    가위:1,
    바위:0,
    보:-1,
}

document.querySelectorAll('.btn').forEach(function(btn){
    btn.addEventListener('click', function(){
        clearInterval(인터벌);
        setTimeout(function(){
            인터벌메이커();
        }, 1000);
        
        var 나의선택= this.textContent;
        var 나의점수 = 점수표[나의선택];//변수를 사용해서 중복되는것 제거
        var 컴퓨터점수 = 점수표[컴퓨터의선택(이미지좌표)];
        var 점수차 = 나의점수 - 컴퓨터점수;
        console.log(나의선택, 컴퓨터의선택(이미지좌표));
        var result = document.querySelector('#result');
        if(점수차 === 0){
            result.textContent = '비겼습니다.';
        }else if([-1,2].includes(점수차)){
            result.textContent = '이겼습니다.';
        }else{
            result.textContent = '졌습니다.';
        }
    });
});
//가위 :1, 바위:0, 보:-1
// 나\컴퓨터 가위 바위 보
// 가위     1 1   1 0 1-1
// 바위     0 1    0 0 0 -1
// 보       -1 1 -1 0 -1 -1




//자바스크립트 객체는 딕셔너리 자료구조 역할을 할 수 있다. 1:1 매칭 표현
//Object.entries(객체); 객체를 이차원 배열로 바꿈.
//배열.includes()로 || 관계를 줄일 수 있다.