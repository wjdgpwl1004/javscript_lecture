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
    var dataset = [];
    var tbody = document.querySelector('#table tbody');
    for(var i=0; i<ver; i+=1){
        var arr=[];
        var tr = document.createElement('tr');
        dataset.push(arr);
        for(var j=0; j<hor; j+=1){
            arr.push(1);
            var td = document.createElement('td');
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
    // console.log(dataset);
    //지뢰심기
    for(var k=0; k<셔플.length; k++){ //예 60
        var 세로 = Math.floor(셔플[k]/10); //예 6  자스는 0부터 시작이므로
        var 가로 = 셔플[k] % 10; //예 0 -> 좌표로 생각!! 
        tbody.children[세로].children[가로].textContent= 'X'; //tr > td dp x 넣기 , 화면
        dataset[세로][가로] = 'X';//2차원 배열 데이터
    }
});


//데이터와 화면을 따로 생각하되, 둘을 일치시키는 작업이 필요하다! 