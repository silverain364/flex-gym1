$(function(){
    const toggleBtn = $('.menu');
    const header = $('header');
    const fixedTop = $('.fixedTop')

    const body = $('body')
    const tabList = $('.page_wrap span')//Act
    const content = $('.event li')//On

    $(toggleBtn).on('click', function(e){
        e.preventDefault()
        body.toggleClass('navOpen');
    })

    $(window).on('scroll', function () {
        let i = $(this).scrollTop()

        if (i >= 100) {
            header.addClass('scroll');
        }
        else {
            header.removeClass('scroll');
        }

    })

    $(window).on('resize', function(){
        const viewport = window.innerWidth
    
        if(viewport > 1280 && body.hasClass('navOpen')){
            body.removeClass('navOpen')
        }
        console.log(viewport);
        
    })

    $(fixedTop).on('click', function (){
        $('body, html').animate({scrollTop: 0}, 600);
    });
    
    let i = 0

    init(i)

    function init(q) {//초기 세팅함수
        tabList.eq(q).addClass('Act')
        content.eq(q).addClass('On')

    }

    function reset() {//class 제거 함수
        tabList.removeClass('Act')
        content.removeClass('On')
    }

    tabList.on('click', function () {

        let crt = $(this).index()//순서값 알아내기

        console.log(crt);
        reset()
        init(crt)
    })
    
    AOS.init();

    gsap.to('.hero-wrap .rel>*', {
        opacity: 1,
        y: -30,
        duration: 1,
        stagger: .3
    })

    // event
    let isClicking = false; // 클릭 여부를 체크하는 변수

    init(i);

    // 초기 세팅 함수
    function init(q) {
        tabList.eq(q).addClass('Act');
        content.eq(q).addClass('On');
    }

    // 클래스 제거 함수
    function reset() {
        tabList.removeClass('Act');
        content.removeClass('On').removeClass('instant'); // 'instant' 클래스 제거
    }

    // 클릭 이벤트 처리
    tabList.on('click', function () {
        let crt = $(this).index(); // 클릭된 항목의 인덱스 값
        isClicking = true; // 클릭 상태로 설정
        reset();
        content.eq(crt).addClass('instant'); // 클릭 시 'instant' 클래스 추가하여 transition 비활성화
        init(crt);
        
        // 클릭 후 일정 시간 지나면 자동 전환을 위한 transition 다시 활성화
        setTimeout(function () {
            content.removeClass('instant'); // 클릭 후 0.5초 뒤 transition 활성화
            isClicking = false; // 클릭 상태 해제
        }, 500); // 0.5초 후에 transition 활성화
        
    });

    // 자동 페이지 전환
    function autoChangeSlide() {
        if (isClicking) return; // 클릭 상태일 때는 자동 전환을 막음
        
        i++; // 현재 인덱스를 1 증가시킴
        if (i >= tabList.length) { // 마지막 슬라이드라면
            i = 0; // 첫 번째 슬라이드로 돌아감
            reset(); // 모든 슬라이드 초기화
            init(i); // 첫 번째 슬라이드 세팅
            content.eq(i).css('z-index', 1); // 첫 번째 슬라이드 z-index 재설정
        } else {
            reset(); // 기존 클래스 제거
            init(i); // 새 인덱스에 맞게 클래스 추가
        }
    }

    setInterval(autoChangeSlide, 3000); // 3초마다 자동으로 변경

});

const swiperHero = new Swiper(".mySwiper", {
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    loop:true,
    autoplay:true
})

const swiper = new Swiper(".card", {
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    loop: true,
    autoplay: true,
    breakpoints: {
        0: {
            slidesPerView: 1,
            // spaceBetween: 40,
        },
        768: {
            slidesPerView: 1,
            // spaceBetween: 40,
        },
        1280: {
            slidesPerView: 3,
            // spaceBetween: 40,
        },
        1440: {
            slidesPerView: 5,
            // spaceBetween: 50,
        },
    },
});