$(document).ready(function(){


    $("#slider").slick({
        fade: true,
        prevArrow:"<button type = 'button' class= 'slick-prev'></button>",
        nextArrow:"<button type = 'button' class= 'slick-next'></button>",
        
        
        dots: true,
      
    });
//
//    $("#ivisual").slick({
//            prevArrow: "<button type='button' class='slick-prev'></button>",
//            nextArrow: "<button type='button' class='slick-next'></button>",
//            dots: true,
//            autoplay:true,
//            autoplaySpeed: 1000
//        });
           
    
    // 각각의 .sum마다 다음과 같이 따로따로 이야기하겠다.
        // 그것이(.sum) 전체 자식들중에 몇번째 자식인지 알아낸다.
        // 그 번째에 해당하는 모든 td들을 불러모아놓고
            // (각각의 tr마다 그 안에있는 td중에 그번째에 해당하는 td)
        // 그 안에 들어있는 글자들을 숫자로 만들어 놓고 그것들을 더한다음
        // 그것에(.sum) 그 값을 쓴다.
    $(".sum").each(function(){
        var nth = $(this).index();
        var total = 0;
        $("tr").each(function(){
            var num = $(this).children().eq(nth).not("th").text();
            var repeat = Math.floor((num.length - 1) / 3);
            for(i=0 ; i<repeat ; i++){
                num = num.replace(",", "");
            }
            num = Number.parseFloat(num);
            if(!isNaN(num)){
                total = total + num;
            }
        });
//                            
//                            total = total.toString();
//                            total = total.split("");
//                            total = total.reverse();
//                            var totallen = total.length;
//                            totallen = Math.ceil(totallen / 3);
//                            var sep = [];
//                            total = total.toString();
//                            // "9,8,7,6,5,4,3,2,1"
//                            for(i=0 ; i<total.length ; i++){
//                                total = total.replace(",", "");
//                            }
//                            // "987654321"
//                            for(i=0 ; i<totallen ; i++){
//                                sep[i] = total.substr(i*3,3);
//                                sep[i] = sep[i].charAt(2) + sep[i].charAt(1) + sep[i].charAt(0);
//                            }
//                            var final = "";
//                            for(i=totallen-1 ; i>=0 ; i--){
//                                final += sep[i];
//                                if(i>0){
//                                    final += ",";
//                                }
//                            }

        var final = total.toLocaleString("en");

        $(this).text(final);
    });
                        
                      
});