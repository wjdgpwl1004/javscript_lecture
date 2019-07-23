var 바디 = document.body;
var 테이블 = document.createElement('table');
var 줄들 = [];
var 칸들 = [];
var 턴 = 'X';
var 결과 = document.createElement('div');
function 결과체크(몇줄, 몇칸){
    //세칸 다 채워졌나?
    var 다참 = false;
    //가로 줄 검사
    if(칸들[몇줄][0].textContent===턴 && 칸들[몇줄][1].textContent===턴 && 칸들[몇줄][2].textContent===턴){
        다참 = true;
    }
    //세로줄 검사
    if(칸들[0][몇칸].textContent===턴 && 칸들[1][몇칸].textContent===턴 && 칸들[2][몇칸].textContent===턴){
        다참 = true;
    }
    //대각선검사
    if(몇줄-몇칸===0 || Math.abs(몇줄 - 몇칸)===2){//대각선 검사 필요한 경우
        if(칸들[0][0].textContent===턴 && 칸들[1][1].textContent===턴 && 칸들[2][2].textContent===턴){
            다참 = true;
        }else if(칸들[0][2].textContent===턴 && 칸들[1][1].textContent===턴 && 칸들[2][0].textContent===턴){
            다참 = true;
        }
    }
    return 다참;
}

function 초기화(무승부){
    if(무승부){
        결과.textContent = '무승부';
    }else{
        결과.textContent=턴 + '님이 승리!';
    }

    setTimeout(function(){
        결과.textContent = '';
        칸들.forEach(function(줄){
            줄.forEach(function(칸){
                칸.textContent='';
            });
        });
        턴='X';
    }, 1000);

}

var 비동기콜백 = function(이벤트){//칸을 클릭했을때
    if(턴==='O'){//컴퓨터의 턴일 때 내가 클릭하지 않도록
        return;
    }

    console.log(이벤트.target);//칸
    console.log(이벤트.target.parentNode);//줄

    var 몇줄 = 줄들.indexOf(이벤트.target.parentNode);
    console.log('몇줄', 몇줄);
    var 몇칸 = 칸들[몇줄].indexOf(이벤트.target);
    console.log('몇칸', 몇칸);

    if(칸들[몇줄][몇칸].textContent!==''){//칸이 이미 채워져 있는가.
        console.log('빈칸아니다.');
       
    }else{
        console.log('빈칸.');
        칸들[몇줄][몇칸].textContent=턴;
        var 다참 = 결과체크(몇줄, 몇칸);

        //모든 칸이 다 찼는지 검사
        var 후보칸 = [];
        칸들.forEach(function(줄){
            줄.forEach(function(칸){
                후보칸.push(칸);
            }) ;
        });
        후보칸 = 후보칸.filter(function(칸){return !칸.textContent});

        console.log('다참 = ', 다참);
        //다 찼으면
        if(다참){
           초기화(false);//false는 안넣어도 됨
        }else if(후보칸.length ===0){//칸을 더이상 선택할 수 없음
            초기화(true);

        }else{//다 안찼으면
            if(턴==='X'){
                턴='O';
            }else{
                턴='X';
            }
            setTimeout(function(){
               console.log('컴퓨터의 턴');
               //빈칸중하나를 고른다.


                var 선택칸 = 후보칸[Math.floor(Math.random()*후보칸.length)];
                선택칸.textContent = 턴;
                //컴퓨터가 승리했는지 체크
                var 몇줄 = 줄들.indexOf(선택칸.parentNode);
                var 몇칸 = 칸들[몇줄].indexOf(선택칸);
                var 다참 = 결과체크(몇줄, 몇칸);
                //다 찼으면
                if(다참){
                    초기화();
                }
                // 턴을 나에게 넘긴다.
                턴 = 'X';
            }, 1000);
        }
    }
    
}

for(var i=1; i<=3; i+=1){
    var 줄 = document.createElement('tr');
    줄들.push(줄);
    칸들.push([]);
    for(var j=1; j<=3; j+=1){
        var 칸 = document.createElement('td');
        칸.addEventListener('click', 비동기콜백);
        칸들[i-1].push(칸);
        줄.appendChild(칸);
    }
    테이블.appendChild(줄);
}
바디.appendChild(테이블);
바디.appendChild(결과);
console.log(줄들, 칸들);

//정리
//0. 다참-> 승리여부
// 1. input 의 값이 value, 태그 안 글자는 textContent
// 2. 배열이나 객체는 데이터를 표현하는데 많이 쓰인다. 표를 데이터로 시뮬레이트 해야 한다. 
// 3. 이벤트 발생 시, 선택된 타겟 가져오는 것, e.target / 부모 노드 가져오는것 e.target.parentNode / 자식 가져오는 것 e.target.children

