$(document).ready(function(){
    function ratiofit(){
        $(".ratiobox").each(function(){


            // 박스의 종횡비를 구한다.
            // 종횡비가 비교적 크다는 이야기는 ->보다 세로로 길쭉하다.
                //분자가 크고 분모가 작아지고 
                //  세로길이(분자)/가로길이(분모)


            // 그 박스 안에 있는 그림의 종횡비를 구한다.
            var boxW = $(this).width(); // 변수 boxW에 .ratiobox의 가로에 길이를 넣는다

            var boxH = $(this).height();// 변수 boxW에 .ratiobox의 세로에 길이를 넣는다
            var boxRatio = boxH / boxW;  // 변수 boxRatop에   boxW(세로)/가로를 넣는다.

            var imgRatio = $(this).children("img").height() / $(this).children("img").width();
            //두 종횡비를 비교하여 그림의 사이즈를 정한다.

            if(boxRatio < imgRatio){
                    //박스종횡비보다 그림의 종횡비  세로가 더 길다.
                    //상대적인 개념 홀쭉하다.
                    $(this).children("img").width(boxW).height("auto"); 

            }else{
                    //박스가 그림보다 더 홀쭉하면  
                    $(this).children("img").height(boxH).width("auto");         
             }

            //$(this).children("img").height() = .ratiobox의 자식 이미지 높이 
                //만약 박스보다 그림이 종횡비가 더 크켠 
                //(박스보다 그림이 더 세로로 길쭉하면)
                    //그림의 가로길이를 박스의 가로길이로 지정
                //만약 그게아니고 박스보다 그림이 종횡비가 더 작으면 
                //(박스보다 그림이 더 가로로 길쭉하면)
                    //그림의 세로길이를 박스의 세로길이로 지정(가로 자동 )
        });
    }
    ratiofit();
    $(window).resize(function(){
        ratiofit();
    });
    
    
    
    
});


