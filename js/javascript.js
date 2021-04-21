$(function(){
    //상단메뉴바
    const $gnb = $('header>nav>.gnb>li');
    const $sub = $gnb.find(".sub");
    let mnuIdx = 0;

    $gnb.on("mouseenter",function(){
        mnuIdx = $gnb.index(this)
        $sub.eq(mnuIdx).fadeIn();
    });
    $gnb.on("mouseleave",function(){
        $sub.hide();
    });

    //슬라이드배너
    const $slides = $('.slides_bnr');
    const $autotoggle = $('.slides_indicator>.button');
    const $indicator = $('.slides_indicator>li>a')
    const $next_btn = $('article>.slides>.next')
    const $prev_btn = $('article>.slides>.prev')
    const $container = $('.slides')

    let intervalkey = null;
    let slideIdx = 0;
    
    $indicator.on('click',function(evt){
        evt.preventDefault();
        slideIdx = $indicator.index(this);
        $slides.stop().animate({
            left : -940*slideIdx
        },500);
        $toggleindicator();
        $autotoggle.addClass('pause');
        $setplay();
    });

    const $toggleindicator = function(){
        $indicator.parent().eq(slideIdx).addClass('on').siblings().removeClass('on');
    };
    const $autoplay = function(){
        clearInterval(intervalkey);
        intervalkey = setInterval(function(){
            if(slideIdx<2){
                slideIdx++;
            }else{
                slideIdx=0;
            }
            $slides.stop().animate({
                left : -940*slideIdx
            },500);
            $toggleindicator();
        },3000);
        
    };

    const $setplay = function(){
        if($autotoggle.hasClass('pause')){
            clearInterval(intervalkey);
        }else{
            $autoplay();
        };
    }

    

    $autotoggle.on('click',function(evt){
        evt.preventDefault();
        $autotoggle.toggleClass('pause');

        $setplay();
    });
    $container.on({
        'mouseover' : function(){
            $next_btn.stop().animate({
                right : 0
            },500)
            $prev_btn.stop().animate({
                left : 0
            },500)
        },
        'mouseleave' : function(){
            $next_btn.stop().animate({
                right : -42
            },500)
            $prev_btn.stop().animate({
                left : -42
            },500)
        }
    })
    $next_btn.on('click',function(evt){
        evt.preventDefault();
        clearInterval(intervalkey);
        if(slideIdx<2){
            slideIdx++;
        }else if(slideIdx=2){slideIdx=0}
        console.log(slideIdx);
        $autotoggle.addClass('pause');
        $toggleindicator();
        $slides.stop().animate({
            left : -940*slideIdx
        },500);
    });
    $prev_btn.on('click',function(evt){
        evt.preventDefault();
        clearInterval(intervalkey);
        if(slideIdx>0){
            slideIdx--;
        }else{slideIdx=2}
        $autotoggle.addClass('pause');
        $toggleindicator();
        $slides.stop().animate({
            left : -940*slideIdx
        },500);
    });


    //삼표인 이야기
   const $story = $('.story_board>li');
   const $playstory = $('.story>.auto>.btn_play');
   const $stopstory = $('.story>.auto>.btn_stop');
   let intervalkey1 = null;
   let storyIdx = 0;
   const $storyauto = function(){
        clearInterval(intervalkey1);
        intervalkey1 = setInterval(function(){
            if(storyIdx<1){
                storyIdx++;
            }else{storyIdx=0}
            $story.eq(storyIdx).fadeIn(600).siblings().fadeOut(600)
        },2500);
        $stopstory.addClass('on')
    };
    
    $playstory.on('click',function(evt){
        evt.preventDefault();
        $(this).removeClass('on').siblings().addClass('on');
        $storyauto();
    });
    $stopstory.on('click',function(evt){
        evt.preventDefault();
        $(this).removeClass('on').siblings().addClass('on');
        clearInterval(intervalkey1);
    });

    //슬라이드 자동실행
    $(window).on('load',function(){
        $storyauto();
        $autoplay();
    });

    //옵션박스
    const $selecName = $('.select>form[name=selecCompanyName]');
    const $name = $('.select>form>.select-name>ul>li>a');
    const $nameList = $('.select>form>.select-name>ul');
    const $selecDiv = $('.select>form[name=selecCompanyDiv]');
    const $divList = $('.select>form>.select-div>ul');
    const $div = $('.select>form>.select-div>ul>li>a');
    const $btn = $('.select>button');
    let nowIdx = 0;
    
    
    $selecName.on('click', function(){
        $nameList.toggle();
        $selecDiv.toggle();
        
    });

    $selecName.on('mouseleave', function(){
        $nameList.hide();
        $selecDiv.show();
    });

    //위에 글자 바뀌도록
    $name.on('click', function(evt){
        evt.preventDefault();
        const selectedName = $(this).text();
        $('#selName').val(selectedName);
        $('#selDiv').val('선택하세요');
    });

    //글자 바뀐대로 아래 선택하세요 내용 바뀌도록
    $name.on('click', function(evt){
        evt.preventDefault();
        nowIdx = $name.index(this);
        $divList.eq(nowIdx).children().hide();
    });

    $selecDiv.on('click', function(){
        $divList.eq(nowIdx).toggle();
        $divList.eq(nowIdx).children().show();

        $divList.css({
            height : $divList.eq(nowIdx).children().length * 30
        });
    });

    //아래 글자 선택하면 바뀌도록
    $div.on('click', function(evt){
        evt.preventDefault();
        const selectedName = $(this).text();
        $('#selDiv').val(selectedName);
    });

    //유효성 검사
    $btn.on('click', function(){
        if($('#selDiv').val()=='선택하세요'){
            alert('부서를 선택해주세요');
        }
    });
});