/* ========================================
   main-visual
======================================== */
var swiper = new Swiper(".mySwiper", {
    cssMode: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".next",
      prevEl: ".prev",
    },
    pagination: {
      el: ".paging",
      clickable: true,
    }
});

function toggleAutoplay(btn){
  if (swiper.autoplay.running) {
    swiper.autoplay.stop();        // 일시정지
    btn.classList.add('paused');    // 색상 변경
  } else {
    swiper.autoplay.start();       // 재생
    btn.classList.remove('paused');
  }
}
let btn = document.getElementById('stopBtn');
if (btn) {
  btn.addEventListener('click', function () {
    toggleAutoplay(this);
  });
}

/* ======================== 
  채용 공고
======================= */

let jobSwiper;

function initJobSwiper() {
  jobSwiper = new Swiper(".jobSwiper", {
    scrollbar: '.swiper-scrollbar',
    scrollbarHide: true,
    slidesPerView: 3,
    initialSlide: 0,
    spaceBetween: 30,
    grabCursor: true,
    pagination: {
      el: ".swiper-pagination",
      type: "progressbar", 
    },
    breakpoints: {
      0: { // 모바일
        slidesPerView: 1.2,
        initialSlide: 0,
        spaceBetween: 30,
        watchSlidesProgress: true,
      },
      769: { // PC
        slidesPerView: 3,
        spaceBetween: 30,
        centeredSlides: false,
        effect: "slide"
      }
    }
  });


}
initJobSwiper();

// 브라우저 리사이즈 감지
window.addEventListener('resize', () => {
  // Swiper 옵션을 다시 적용
  if (jobSwiper) jobSwiper.destroy(true, true);
  initJobSwiper();
});


/* ======================== 
  working at kac
======================= */
let workingSwiper;

function initworkingSwiper() {
  workingSwiper = new Swiper(".workingSwiper", {
    scrollbar: '.swiper-scrollbar',
    scrollbarHide: true,
    slidesPerView: 4,
    initialSlide: 0,
    spaceBetween: 30,
    centeredSlides: true,
    grabCursor: true,
    pagination: {
      el: ".swiper-pagination",
      type: "progressbar",
    },
    breakpoints: {
      0: { // 모바일
        slidesPerView: 1,
        spaceBetween: 20,
        initialSlide: 0,
        centeredSlides: true,
        watchSlidesProgress: true,
      },
      769: { // PC
        slidesPerView: 4,
        spaceBetween: 30,
        centeredSlides: false,
        effect: "slide"
      }
    }
  });
}

initworkingSwiper();

// 브라우저 리사이즈 감지
window.addEventListener('resize', () => {
  // Swiper 옵션을 다시 적용
  if (jobSwiper) jobSwiper.destroy(true, true);
  initJobSwiper();
});
