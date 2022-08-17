/**
 * @stagger 순차적 실행 
 */


$(function(){
    //group-flex1
    const loadAni = gsap.timeline({})
    loadAni.addLabel('a')
    loadAni.to('.load',{delay:0.5, height:0},'a')
    .to('.load .load-logo',{duration:0.5, delay:0.3, yPercent:-100,scrub:1},'a')
    .addLabel('b')
    .from('.group-flex1 .thumb-area figure',{ scale:1.2 },'b-=0.4')
    .from('.sc-home .text',{ yPercent:100, stagger:0.1 },'b-=0.4')
    .from('.home-logo-area .char',{ duration:1, opacity:0, yPercent:103, stagger:0.2 },'b-=0.4')

    const introAni = gsap.timeline({

        scrollTrigger:{
            trigger:".sc-home",
            start:"top top", //[트리거 기준, 윈도우기준 주로 윈도우 기준을 수정함] // 두 지점이 만나야 실행
            end:"bottom top",
            //markers:true,
            scrub:1
        }
    })
    introAni.addLabel('a')
    introAni.to('.group-flex1',{ yPercent:20 },'a')
    .to('.group-flex1 .thumb-area',{ yPercent:-10 },'a')


    //모든 이미지 페럴렉스 통합판 //foreach = each
    $('[data-parallex]').each(function(i,el){ // index, element
        parent = $(this).parent();

        gsap.to(el,{
            scrollTrigger:{
                trigger:parent,
                start:"top 100%",
                end:"bottom top",
                //markers:true,
                scrub:5,
                duration:3
            },
            yPercent:10
        })
    })

    // ol li click시 기존 자동 롤링 bar 멈추고 클릭한 요소의 bar 롤링 진행 
    $('.sc-works .info-box').click(function(e){
        e.preventDefault();
        idx = $(this).parents('.works-item').index();
        $('.sc-works .thumb-box').removeClass('active');
        $(this).siblings('.thumb-box').addClass('active');

        clearInterval(ranking_rolling);
        guageBar.kill();
        gsap.set('.guage',{width:'0%'})
        num = idx;
        bar = $('.works-item').eq(num).find('.guage');
        $('.works-item').eq(num).addClass('active').siblings().removeClass('active');
        guageBar = gsap.to(bar,5,{
            width:'100%',
            ease:'none',
            onComplete:function(){
                gsap.set('.guage',{width:'0%'})
            }
        })
        num++;
        rankingRolling();

    })
    // 자동 롤링 초기세팅
    let num = 0;
    rankRollingInit = function () {
        $('.works-item').eq(num).addClass('active')
        gsap.to('.first-bar',5,{
            width:'100%',
            ease:'none',
            onComplete:function(){
                gsap.set('.guage',{width:'0%'})
            }
        })
        num = 1;
    };
    rankRollingInit();

    // 자동 롤링 실행 함수 
    rankingRolling = function () {
        ranking_rolling = setInterval(function () {

        bar = $('.works-item').eq(num).find('.guage');
        $('.works-item').eq(num).addClass('active').siblings().removeClass('active');
        guageBar = gsap.to(bar,5,{
            width:'100%',
            ease:'none',
            onComplete:function(){ // 전부 실행하면 실행
                gsap.set('.guage',{width:'0%'})
            }
        })

            num === 3 ? num = 0 : num++
        }, 5000)
    };

    rankingRolling();

    // homeapp 텍스트 애니메이션
    $('.thumb-item').each(function(i,el){
        idx1 = $(this).index();
        idx2 = $(this).index()+1;
        gsap.set('.text-item',{opacity:0})
          const app = gsap.timeline({
              scrollTrigger:{
                  trigger:el,
                  start:"top top",
                  end:"bottom top",
                  markers:true,
                  //   scrub:1,
                  toggleActions:"play pause resume reverse",
            }
        })
        .to('.text-item:nth-child('+idx1+')',{ opacity:0,y:-100}) // 이전 텍스트는 y축으로 날리고
        .to('.text-item:nth-child('+idx2+')',{ opacity:1}) // 다음 택스트는 불투명하게
      })

    //hover
    $('.sc-product .thumb-wrap').hover(function(){
            //$(this).css({'clipPath': 'inset(0.625rem round 1.25rem)'})
            gsap.to('.thumb-wrap .thumb-box',{ scale:1.05 })
        },function(){
            //$(this).css({'clipPath': 'inset(0)'})
            gsap.to('.thumb-wrap .thumb-box',{ scale:1 })
        })
    // 1. swiper slide
    const swiper = new Swiper(".slide", {
        // speed:1000,
        slidesPerView: "auto",
        spaceBetween: 30,
      });

    
    // 2. 국가 변경 셀렉트 
    $('#lang').on('change',function(){ // select 선택시 해당 선택값 변화
        const currLang = $(this).val(); // select 선택값 바뀔 때 해당 벨류값 선언
        //프랑스,네덜란드 선택되면 해당 페이지로 이동 // 자기자신은 그대로
        // window.open(currLang); // 새창이동
        window.location.href = currLang; // 현재 창에서 이동
        //이동 후 영문 셀렉트 선택상태로
        $("#lang option:eq(0)").prop("selected",true);
    })
});