var tbody = document.querySelector('#table tbody');
var dataset = [];
document.querySelector('#exec').addEventListener('click', function(){
    var hor = parseInt(document.querySelector('#hor').value);
    var ver = parseInt(document.querySelector('#ver').value);
    var mine = parseInt(document.querySelector('#mine').value);

    console.log(hor, ver, mine);
    //지뢰위치뽑기
    var 후보군 = Array(hor*ver).fill().map(function(요소, 인덱스){
        return 인덱스;
    });
    
    // console.log(후보군);
    
    var 셔플 = [];
    while(후보군.length>80){//피셔에이츠셔플방법
        var 이동값 = 후보군.splice(Math.floor(Math.random()*후보군.length),1)[0];
        셔플.push(이동값);
    }

    console.log(셔플);
    //지뢰 테이블 만들기


    for(var i=0; i<ver; i+=1){
        var arr=[];
        var tr = document.createElement('tr');
        dataset.push(arr);
        for(var j=0; j<hor; j+=1){
            arr.push(1);
            var td = document.createElement('td');
            //
            td.addEventListener('contextmenu', function(e){
                e.preventDefault();
                var 부모tr = e.currentTarget.parentNode; //e.target
                var 부모tbody = e.currentTarget.parentNode.parentNode;
                var 칸 = Array.prototype.indexOf.call(부모tr.children, e.currentTarget); //children은 유사배열이기 때문에 indexOf를 못쓴다.
                var 줄 = Array.prototype.indexOf.call(부모tbody.children, 부모tr);//이렇게 하면 indexOf 함수 사용 가능
                console.log(부모tr, 부모tbody, e.currentTarget, 칸, 줄);
                e.currentTarget.textContent = '!';
                dataset[줄][칸]= '!';dataset
            });
            //
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
    console.log(dataset);


    //지뢰심기

    for(var k=0; k<셔플.length; k++){ //예 60
        var 세로 = Math.floor(셔플[k]/10); //예 6  자스는 0부터 시작이므로
        var 가로 = 셔플[k] % 10; //예 0 -> 좌표로 생각!! 
        tbody.children[세로].children[가로].textContent= 'X'; //tr > td dp x 넣기 , 화면
        dataset[세로][가로] = 'X';//2차원 배열 데이터
    }
});

// tbody.querySelectorAll('td').forEach(function(td){
//     td.addEventListener('contextmenu', function(e){
//         e.preventDefault();
//         console.log('오른쪽클릭');
//     });
// });


//데이터와 화면을 따로 생각하되, 둘을 일치시키는 작업이 필요하다!
//마우스 우클릭 이벤트 -> contextmenu
//비동기는 동기인 코드보다 나중에 실행된다.
//currentTarget 이벤트리스너를 단 대상
// target 실제로 이벤트가 발생하는 대상