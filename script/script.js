$(document).ready(function(){
    
    // #direct_mark를 눌렀을때
        // #direct_cont를 보였다/숨겼다.
        // .reverse 클래스를 줬다/뺐었다.
    $("#direct_mark").click(function(){
        $("#direct_cont").toggle();
        $(this).toggleClass("reverse");
    });
    
    
    // #pcnav에 마우스를 올리면
        // #pcnav(this)의 높이가 340px (80+260)가 되도록 애니메이트
        // #back은 그냥 slideDown으로 나타나게
    // #pcnav에서 마우스를 치우면
        // #pcnav(this)의 높이가 80px이 되도록 애니메이트
        // #back은 그냥 slideUp으로 사라지게
    
    $("#pcnav, #back").mouseover(function(){
        $("#pcnav").stop().animate({
            height: "340px"
        },200);
        $("#back").stop().slideDown(200);
    });
    
    $("#pcnav, #back").mouseout(function(){
        $("#pcnav").stop().animate({
            height: "80px"
        },200);
        $("#back").stop().slideUp(200);
    });
    
    
    $("header").after("<div id='dummy'></div>");
    function setheader(){
        var headerH = $("header").height();
        $("#dummy").height(headerH);
    }
    setheader();
    
    $(".mmain>a").append("<span class='plus'>+</span>");
    
    // 모바일버전 메뉴바
    // .mmain>a를 눌렀을때
        // 응당 해야할 일을 멈춰라. ( e.preventDefault() )
    $(".mmain>a").click(function(e){
        e.preventDefault();
    });
    
    // .mmain을 눌렀을때
        // 모든 .mmain으로부터 .aactive를 일단 뺏기.
        // 만약 지금누른그것 안에 있는 .msub가 보이고 있는가?
                                    //   is(":visible")
            // 지금누른그것 안에 있는 .msub를 닫기
        // 그렇지 않다면
            // 지금누른그것 안에 있는 .msub를 열기
            // 지금누른그것에게 .aactive를 주기.
        // 열기가 끝나면
        // 지금누른그것을 제외한 나머지 .mmain안에있는 .msub를 닫기    
    $(".mmain").click(function(){
        $(".mmain").removeClass("aactive");
        $(".plus").text("+");
        if( $(this).children(".msub").is(":visible") ){
            $(this).children(".msub").stop().slideUp(400);
        }else{
            $(this).children(".msub").stop().slideDown(400);
            $(this).addClass("aactive");
            $(this).find(".plus").text("-");
        }
        $(this).siblings(".mmain").children(".msub").delay(400).slideUp(400);
    });
    
    // #ham을 눌렀을때
        // #mnav의 right:0px이 되도록 애니메이트
    $("#ham").click(function(){
        $("#mback").fadeIn(200);
        $("#mnav").animate({
            right: "0px"
        },300);
        $("html,body").css("overflow","hidden");
    });
    
    $("#mback, .msub a").click(function(){
        $("#mnav").animate({
            right: "-250px"
        },300);
        $("#mback").fadeOut(200);
        $("html,body").css("overflow","auto");
    });
    
    
    // 모바일에서 만들어진 각종 부산물들이
    // PC버젼까지 묻어오는것을 초기화하는 함수
    function pcini(){
        // #mnav, #mback의 style 속성자체를 들어냄
        $("#mnav, #mback").removeAttr("style");
    }
    
    // 화면크기가 바뀔때
        // 화면 가로길이를 재고
        // 화면 가로길이가 1025px 초과일때 pcini실행
    $(window).resize(function(){
        var winW = $(this).outerWidth();
        if(winW > 1025){
            pcini();
        }
        setheader();
    });
    
    
    // #linkbtn이 눌렸을때
        // #linklist의 value가 무엇이냐를 알아보고
        // 만약 그 값이 ""이 아니냐
            // 새 이름으로 새 창을 띄우고 그 해당 value를
            // 방금띄운 새창에 주소로 삽입한다.
    var popnum = 0;
    $("#linkbtn").click(function(){
        popnum++;
        var linkval = $("#linklist").val();
        if(linkval != ""){
            window.open(linkval, "pop"+popnum);
        }
    });
    
    
    // Breadcrumb 구동부
    var urlset = [
        ["intro0", "intro1"],
        ["part0", "part1"],
        ["adv0", "adv1"],
        ["manage0", "manage1"],
        ["coop0"]
    ];
    
    var path = window.location.pathname;
    var page = path.split("/").pop();
    page = page.split(".")[0];
    
    // urlset라는 아파트에서 page라는 이름을 가진 값이
    // 몇층 몇호에 있는지 수색
    // 1. 우리 아파트가 몇층이지?
    // 2. 각 층별로 수색.
        // 2-1. 이번 층 복도에는 몇개의 호실이 있지?
        // 2-2. 각 호실별로 수색.
            // 이때 page라는 이름이 같은 값이 발견되면!
            // 그때의 층수 => 층수
            // 그때의 호수 => 호수
    var mainnum;
    var subnum;
    
    var level = urlset.length;
    for(i=0; i<level; i++){
        var room = urlset[i].length;
        for(j=0; j<room; j++){
            if(urlset[i][j] == page){
                mainnum = i;
                subnum = j;
            }
        }
    }
    
    // mainnum를 보고 depth2에 넣어줄 값을 찾아서 넣어주기
    // 서브메뉴의 href를 담을 배열변수 => subhref
    // 서브메뉴의 text를 담을 배열변수 => subtext
    // .main중에 mainnum번째 안에 들어있는 .sub 안에 들어있는 li
        // 의 개수대로 반복(i).
            // 그것(li) 안에 있는 a태그의 href속성값과 text를 알아내서
            // subhref와 subtext 배열변수의 i번째 칸에 저장.
    var subhref = [];
    var subtext = [];
    var lilen = $(".main").eq(mainnum).find("li").length;
    for(i=0; i<lilen; i++){
        subhref[i] = $(".main").eq(mainnum).find("li").eq(i).children("a").attr("href");
        subtext[i] = $(".main").eq(mainnum).find("li").eq(i).children("a").text();
    }
    
    // #depth2_cont 안쪽에 새로운 a들을 만들어 내는 단계
    // li의 개수만큼 반복
        // #depth2_cont 안쪽에 새로운 a들을 만들기(href랑 text 넣어서)
    for(i=0; i<lilen; i++){
        $("#depth2_cont").append("<a href='" + subhref[i] + "'>" + subtext[i] + "</a>");
    }
    
    
    // #depth1_mark 내용 넣어주기
    // #depth1_cont안에 들어있는 a중에 mainnum번째의 글자내용을 알아내서
    // #depth1_mark안에 내용으로 넣어주기
    $("#depth1_mark").text($("#depth1_cont>a").eq(mainnum).text());
    
    // #depth2_mark 내용 넣어주기
    // #depth2_cont안에 들어있는 a중에 subnum번째의 글자내용을 알아내서
    // #depth2_mark안에 내용으로 넣어주기
    $("#depth2_mark").text($("#depth2_cont>a").eq(subnum).text());
    
    // #depth1을 눌렀을때
        // #depth1_cont가 등장/사라지기
        // #depth2_cont가 사라지기
    // #depth2를 눌렀을때
        // #depth2_cont가 등장/사라지기
        // #depth1_cont가 사라지기
    $("#depth1").click(function(){
        $("#depth1_cont").toggle();
        $("#depth2_cont").hide();
    });
    $("#depth2").click(function(){
        $("#depth2_cont").toggle();
        $("#depth1_cont").hide();
    });
    // #depth1_cont, #depth2_cont에서 마우스를 치웠을때
        // 그 자신이 사라진다.
    $("#depth1_cont, #depth2_cont").mouseleave(function(){
        $(this).hide();
    });
        
    
    // 페이지 내 모든 table태그에게 다음과 같이 따로따로 이야기하겠다.
        // 그테이블 안쪽에 있는 내용을 잘 갈무리 해 두고,
        // 그테이블 아래에 <div class='newtable'></div>를 만들고
        // 아까 갈무리한 내용을 그테이블 다음에 있는 .newtable의 안쪽에 넣어준다.
        // 그테이블을 지운다.
    $("table").each(function(){
        var almengi = $(this).html();
        var kkubdegi = this.attributes;
        var attrlen = this.attributes.length;
        $(this).after("<div class='newtable'><table></table></div>");
        $(this).next(".newtable").children("table").append(almengi);
        for(i=0 ; i<attrlen ; i++){
            var key = kkubdegi[i].name;
            var value = kkubdegi[i].value;
            $(this).next(".newtable").children("table").attr(key,value);
        }
        $(this).remove();
    });
    
    
    // 여러 .tabbtn중에 하나를 클릭했을때
        // 방금클릭한그것 이 전체 .tabbtn중에서 몇번째인가? =>nth
        // 모든 .tabcont를 전부 숨겨준 다음에
        // .tabcont중에서 nth번째만 다시 보여준다.
        
        // 모든 .tabbtn으로부터 "tactive"라는 클래스를 뺏는다.
        // .tabbtn중에 nth번째에게는 "tactive"라는 클래스는 준다.
        // └-----------------┘this
    $(".tabbtn").click(function(){
        var nth = $(this).index(".tabbtn");
        $(".tabcont").hide();
        $(".tabcont").eq(nth).show();
        $(".tabbtn").removeClass("tactive");
        $(this).addClass("tactive");
    });
    
    // "     "라는 리스트들 li태그
    // 안쪽에 파란박스, 내용이들어갈 박스 만들어주기
    
    function makenum(name){
        $(name).each(function(){
            $(this).children("li").each(function(){
                var txt = $(this).text();
                var nth = $(this).index();
                $(this).empty();
                $(this).append("<div class='li-num'></div><div class='li-txt'></div>");
                $(this).children(".li-txt").text(txt);
                $(this).children(".li-num").text(nth+1);
            });
        });
    }
    
    makenum(".list-blue");
    makenum(".list-circle");
    
    // .list-circle이라는 리스트 안에있는 li 안에있는
    // .li-num마다 따로따로 다음과 같이 이야기 합시다.
        // 만약 그것 안에 들어있는 글자가 두자리 이상인가?
            // 그렇다면 그것의 스타일 중에
            // "letter-spacing"이라는 스타일의 값을 "-0.17em"으로 바꿔준다.
    $(".list-circle>li>.li-num").each(function(){
        if($(this).text().length >= 2){
            $(this).css({
                letterSpacing: "-0.17em",
                textIndent: "-0.2em"
            });
        }
    });
    
    $(".box-title").each(function(){
        var cont = $(this).html();
        $(this).empty();
        $(this).append("<span></span>");
        $(this).children("span").html(cont);
    });
    
});

































