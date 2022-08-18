/**
 * 1. gsap load화면, 제목,버튼,svg // gsap 스크롤트리거 img,text영역 
 * 2. 모든 이미지 페럴렉스 통합판 - each문 활용
 * 3. sc-works 자동 롤링 함수, 자동 롤링 셋팅
 * 4. sc-works li클릭 이벤트 - 클릭시 자동 롤링,bar 멈추고 클릭한 요소의 bar 롤링진행
 * 5. homeapp 텍스트 애니메이션 - each문 활용
 * 6. hover 이벤트
 * 7. swiper slide
 * 8. 국가변경 셀렉트
 */
$(function(){
    // 1. gsap load화면,제목,버튼,svg // 요소 자체의 애니메이션
    const loadAni = gsap.timeline({})
    loadAni.addLabel('a')
    loadAni.to('.load',{delay:0.6,height:0},'a')
    .to('.load .load-logo',{duration:0.5,delay:0.3,yPercent:-100,scrub:1},'a')
    .addLabel('b')
    .from('.sc-home .thumb-area figure',{scale:1.2},'b-=0.4')
    .from('.sc-home .text',{yPercent:100,stagger:0.1},'b-=0.4')
    .to('.sc-home .link-btn',{duration:0.7,opacity:1},'b-=0.4')
    .from('.sc-home .home-logo-area .char',{opacity:0,duration:0.9,stagger:0.2,yPercent:103},'b-=0.4')
    
    // 스크롤 했을 때의 애니메이션
    const introAni = gsap.timeline({
        scrollTrigger:{
            trigger:".sc-home", 
            start:"top top",
            end:"bottom top",
            //markers:true,
            scrub:1
        }
    })
    introAni.addLabel('c')
    introAni.to('.group-flex1',{yPercent:20},'c')
    introAni.to('.sc-home .thumb-area',{yPercent:-20},'c')


    // 2. 모든 이미지 페럴렉스 통합판 -> 페럴렉스 진행할 img에 data-parallex 적용
    $('[data-parallex]').each(function(i,el){
        parent = $(this).parent(); // .thumb-box

        gsap.to(el,{
            scrollTrigger:{
                trigger:parent,
                start:"top bottom",
                end:"bottom top",
                //markers:true,
                scrub:5,
                duration:3
            },
            yPercent:10
        })

    })

    // 3. sc-works 자동 롤링 함수, 자동 롤링 셋팅
    let num = 0;
    workRollingInit = function(){
        $('.works-item').eq(num).addClass('active')
        gsap.to('.first-bar',5,{
            width:"100%",
            ease:"none",
            onComplete:function(){
                gsap.set('.guage',{width:"0%"})
            }
        })
        num = 1;
    }
    workRollingInit();
    
    worksRolling = function(){ // 함수 선언
        works_Rolling = setInterval(function(){ //자동 롤링 함수 선언
            bar = $('.works-item').eq(num).find('.guage'); // 게이지바 변수 선언
            $('.works-item').eq(num).addClass('active').siblings().removeClass('active');

            guageBar = gsap.to(bar,5,{ //게이지바 애니메이션 설정
                width:"100%",
                ease:"none",
                onComplete:function(){ // 애니메이션이 전부 실행되었을 때 실행
                    gsap.set('.guage',{width:"0%"})
                }
            })

            num === 3 ? num = 0 : num++ // num이 3이되면 다시 0을 대입하여 루프, 3아니면 증감

        },5000)
    }

    worksRolling(); // 이때 setInterval이 5초뒤에 실행되기 때문에 초기셋팅 잡아줘야함

    // 4. sc-works li클릭 이벤트 - 클릭시 자동 롤링,bar 멈추고 클릭한 요소의 bar 롤링진행
    $('.sc-works .info-box').click(function(e){
        e.preventDefault();
        idx = $(this).parents('.works-item').index();
        $('.sc-works .thumb-box').removeClass('active');
        $(this).siblings('.thumb-box').addClass('active'); // thumb-box scale active

        clearInterval(works_Rolling); // 누르면 자동 롤링 해제
        guageBar.kill(); // gsap 애니메이션 삭제
        gsap.set('.guage',{width:'0%'}) // gsap 애니메이션 기본 세팅
        num = idx; // works-item index 값 num 변수 대입
        bar = $('.works-item').eq(num).find('.guage');
        guageBar = gsap.to(bar,5,{
            width:'100%',
            ease:'none',
            onComplete:function(){
                gsap.set('.guage',{width:'0%'})
            }
        })// 게이지바 변수, 애니메이션 재설정
        $('.works-item').eq(num).addClass('active').siblings().removeClass('active');
        num++; // index++
        worksRolling(); // 자동 롤링 재생
    })
    // 5. sc-homeapp
    $('.thumb-item').each(function(i,el){
        idx1 = $(this).index();
        idx2 = $(this).index()+1;
        gsap.set('.text-item',{opacity:0})
        const app = gsap.timeline({
            scrollTrigger:{
                trigger:el,
                start:"top top",
                end:"bottom top",
                //markers:true,
                //   scrub:1,
                toggleActions:"play pause resume reverse",
            }
        })
        .to('.text-item:nth-child('+idx1+')',{opacity:0,y:-100})
        .to('.text-item:nth-child('+idx2+')',{opacity:1})

    })

    // 6. hover
    $('.sc-product .thumb-wrap').hover(function(){
        //$(this).css({'clipPath': 'inset(0.625rem round 1.25rem)'})
        gsap.to('.thumb-wrap .thumb-box',{scale:1.05})
    },function(){
        //$(this).css({'clipPath': 'inset(0)'})
        gsap.to('.thumb-wrap .thumb-box',{scale:1})
    })

    // 7. swiper slide
    const swiper = new Swiper(".slide", {
        // speed:1000,
        slidesPerView: "auto",
        spaceBetween: 30,
    });

    // 8. 국가 변경 셀렉트
    $('#lang').on('change',function(){
        const currLang = $(this).val();
        window.location.href = currLang
        $('#lang option:eq(0)').prop("seleced",true)
    })
})