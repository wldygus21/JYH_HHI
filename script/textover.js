//본 스크립트는 대우직업전문학교 한지호가 제작하였으며
// 누구나 수정 배포할 있습니다.
// 본 스클립트로 재미를 좀 보셨다면
// 저도 좀 재미를 볼수 있게 아래 계좌로 후원금을 주시면 감사하겠습니다.


// 개발일자 2019.11.11
// 개발자 : 한지호 (exe125@naver.com)





// 1. 본문에서 .txtover라는 상자를 찾아서 각 상자마다 다음과 같이 이야기 하겠다!..  
// 2. 그상자(.txtover) 내용을 잘 저장해 두고, 그 상자를 비운다.
// 3. 그상자 .compare라는 상자를 만든다.
// 4. 아까 갈무리해둔 내용 " " 기준으로 다진다.
// 5. 다져진 단어수 만큼 반복
// 5-1. i번쨰 단어<span>를 묶어서 그상자 안에있는 .compare에 추가한다.
// 5-2. .compare의 높이를 재고 그 높이가 그상자(.txtover)의 높이보다 크다면
// 5-2-1. 그상자 안에있는 .compare안에있는 span중에 마지막을 지운다.
// 5-2-2. 그상자 안에있는 .compare안에 "&hellip;"을 추가한다.  
// 5-2-3. 반복문을 중지한다


//.each()는 선택한 요소가 여러 개일 때 각각에 대하여 반복하여 함수를 실행시킵니다.
function textover(){
    $(".txtover").each(function(){

    //.text()는 선택한 요소 안의 내용을 가져오거나, 다른 내용으로 바꿉니다. .html()과 비슷하지만 태그의 처리가 다릅니다.
        //hasAttribute () 메소드는 지정된 속성이 존재하면 true를, 그렇지 않으면 false를 리턴합니다.
        var oldtxt;
        if(!this.hasAttribute("title")){
            oldtxt = $(this).text();
    //        .attr()은 요소(element)의 속성(attribute)의 값을 가져오거나 속성을 추가합니다.
            $(this).attr("title",oldtxt);
        }else{
            oldtxt = $(this).attr("title");

        }
        //.empty()는 선택한 요소의 내용을 지웁니다. 내용만 지울 뿐 태그는 남아있다는 것에 주의합니다.
        //$(this).empty();
        //$(this).append("<div class='compare'></div>");
        $(this).html("<div class='compare'></div>");
        //html 이전에 내용을 다지우고 괄호안에 있는것을 덮어씌운다.


        // .split() .split()은 문자열을 분할하는 메서드입니다.
        // 문법 separator에는 분할의 기준을 넣습니다.
        // 예를 들어 쉼표를 기준으로 분할할 때는 와 같이 합니다.
        //limit로 최대 분할 개수를 정합니다.\
        //선택 사항으로, 값을 정하지 않으면 전체를 […]

        var oldword = oldtxt.split(" ");
        var originH = $(this).height();
        for(i=0; i<oldword.length ; i++){
            $(this).children(".compare").append("<span>" + oldword[i] + " </spna>");
            var newH = $(this).children(".compare").height();
            if(originH < newH){
                $(this).children(".compare").children("span:last-of-type").remove();
                $(this).children(".compare").children("span:last-of-type").remove();
                $(this).children(".compare").append("&hellip;");
                break;
            }  

        }

    });
};

textover();
$(window).resize(function(){
    
    textover();
    
});












