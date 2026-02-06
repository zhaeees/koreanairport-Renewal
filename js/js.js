
/* ============================ 
  mainvisual
================================== */
const airports = [
  { id: 'gimpo', name: '김포국제공항', address: '주소: 07505 서울특별시 강서구 하늘길 78', top: '23%', left: '39%', type: 'international', lat: 37.565751, lon: 126.801382, icon: '../images/mainvisual/dot.png'},
  { id: 'gimhae', name: '김해국제공항', address: '주소: 46718 부산 강서구 공항진입로 108', top: '68%', left: '81%', type: 'international' , lat:35.173009, lon:128.947607, icon: '../images/mainvisual/dot.png'},
  { id: 'jeju', name: '제주국제공항', address: '주소: 63115 제주특별자치도 제주시 공항로 2', top: '94%', left: '27%', type: 'international', lat: 33.507269, lon:126.493695  , icon: '../images/mainvisual/dot.png'},
  { id: 'daegu', name: '대구국제공항', address: '주소: 41052 대구 동구 공항로 221', top: '54%', left: '73%', type: 'international' , lat: 35.899302, lon:128.639234 , icon: '../images/mainvisual/dot.png'},
  { id: 'cheongju', name: '청주국제공항', address: '주소: 28142 충북 청주시 청원구 내수읍 오창대로 980', top: '41%', left: '51%', type: 'international' , lat: 36.722183, lon:127.495906 , icon: '../images/mainvisual/dot.png'},
  { id: 'muan', name: '무안국제공항', address: '주소: 59606 전남 여수시 율촌면 여순로 386', top: '70%', left: '34%', type: 'international' , lat: 34.993751, lon:126.387952, icon: '../images/mainvisual/dot.png'},
  { id: 'yangyang', name: '양양국제공항', address: '주소: 25042 강원 양양군 손양면 공항로 201', top: '19%', left: '72%', type: 'international' , lat: 38.058998, lon:128.662969, icon: '../images/mainvisual/dot.png'},
  { id: 'ulsan', name: '울산공항', address: '주소: 44238 울산 북구 산업로 1103', top: '60%', left: '83%', type: 'domestic' , lat: 35.593139, lon: 129.355728, icon: '../images/mainvisual/dot.png'},
  { id: 'gwangju', name: '광주공항', address: '주소: 62425 광주 광산구 상무대로 420-25', top: '69%', left: '40%', type: 'domestic', lat: 35.140006, lon:126.810716, icon: '../images/mainvisual/dot.png'},
  { id: 'yeosu', name: '여수공항', address: '주소: 59606 전남 여수시 율촌면 여순로 386', top: '73%', left: '53%', type: 'domestic' , lat: 34.840408, lon:127.614014, icon: '../images/mainvisual/dot.png'},
  { id: 'pohang', name: '포항·경주공항', address: '주소: 37926 경북 포항시 남구 동해면 일월로 18', top: '52%', left: '88%', type: 'domestic' , lat: 35.984215, lon:129.434514, icon: '../images/mainvisual/dot.png'},
  { id: 'sacheon', name: '사천공항', address: '주소: 52516 경남 사천시 사천읍 사천대로 1971', top: '68%', left: '62%', type: 'domestic' , lat: 35.092427, lon:128.087088, icon: '../images/mainvisual/dot.png'},
  { id: 'gunsan', name: '군산공항', address: '주소: 54168 전북 군산시 옥서면 산동길2', top: '54%', left: '36%', type: 'domestic' , lat: 35.926086, lon:126.615940, icon: '../images/mainvisual/dot.png'},
  { id: 'wonju', name: '원주공항', address: '주소: 25239 강원 횡성군 횡성읍 횡성로 38', top: '22%', left: '60%', type: 'domestic', lat: 37.459377, lon:127.977411, icon: '../images/mainvisual/dot.png'}
];

/* ================= DOM ================= */
const mapWrap = document.getElementById('mapWrap');
const airportNameEl = document.getElementById('airportName');
const airportAddressEl = document.getElementById('airportAddress');
const filterControls = document.getElementById('filterControls');

/* ================= 상태 ================= */
let current = 'gimpo';                 // 현재 선택된 공항
let currentFilter = 'international';   // 기본 필터

/* ================= 초기화 ================= */
document.addEventListener('DOMContentLoaded', () => {

  createAirportLabels();          // 1. 공항 라벨 생성
  applyFilter(currentFilter);     // 2. 기본 필터 적용
  selectAirport(current);         // 3. 초기 선택 공항 세팅 (김포)

});

/* ================= 공항 라벨 생성 ================= */
function createAirportLabels() {

  // 배경(map)은 유지하고 기존 라벨만 제거
  mapWrap.querySelectorAll('.airport-label').forEach(el => el.remove());

  airports.forEach(item => {
    const el = document.createElement('div');

    el.className = 'airport-label';
    el.dataset.id = item.id;
    el.dataset.type = item.type;
    el.dataset.icon = item.icon || '';

    el.style.top = item.top;
    el.style.left = item.left;

    el.innerHTML = `
      <span class="pin-slot" aria-hidden="true"></span>
      <span class="label-bubble">${item.name}</span>
    `;

    /*  제주국제공항만 클릭 유도 표시 */
    if (item.id === 'jeju') {
      el.classList.add('has-clickpoint');
    }

    // 라벨 클릭 시 공항 선택
    el.addEventListener('click', () => selectAirport(item.id));

    mapWrap.appendChild(el);
  });
}

/* ================= 공항 선택 ================= */
function selectAirport(id) {
  const item = airports.find(a => a.id === id);
  if (!item) return;

  /* ----- 왼쪽 카드 정보 업데이트 ----- */
  airportNameEl.textContent = item.name;
  airportNameEl.style.color = '#3b3b3b';
  airportNameEl.style.fontWeight = '700';
  airportAddressEl.textContent = item.address;

  /* ----- 제주 선택 시 클릭 유도 표시 ----- */
  airportNameEl.classList.remove('has-clickpoint');
  if (id === 'jeju') {
    airportNameEl.classList.add('has-clickpoint');
   
  }
  

  /* ----- 날씨 호출 ----- */
  getWeather(Number(item.lat), Number(item.lon));

  /* ----- 상태 업데이트 ----- */
  current = id;

  /* ----- 지도 라벨 active 처리 ----- */
  document.querySelectorAll('.airport-label').forEach(lbl => {
    lbl.classList.toggle('active', lbl.dataset.id === id);

    // 기존 핀 이미지 제거
    const existingImg = lbl.querySelector('.pin-img');
    if (existingImg) existingImg.remove();
  });

  /* ----- 선택된 라벨에만 핀 이미지 삽입 ----- */
  const selectedLabel = document.querySelector(`.airport-label[data-id="${id}"]`);
  if (!selectedLabel) return;

  const img = document.createElement('img');
  img.className = 'pin-img';
  img.src = 'images/mainvisual/dot.png';
  img.alt = `${item.name} 아이콘`;

  selectedLabel.querySelector('.pin-slot')?.appendChild(img);
}

/* ================= 공항명 클릭 (이동만 담당) ================= */
airportNameEl.addEventListener('click', e => {
  e.preventDefault();

  // 제주가 아니면 이동 안 함
  if (current !== 'jeju') return;

  applyFilter('international');
  window.location.href = 'sub2.html';
});

/* ================= 필터 적용 ================= */
function applyFilter(filter) {
  currentFilter = filter;

  // 버튼 상태 토글
  filterControls.querySelectorAll('button').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === filter);
  });

  // 라벨 표시 제어
  document.querySelectorAll('.airport-label').forEach(lbl => {
    lbl.style.display = lbl.dataset.type === filter ? '' : 'none';
  });
}

/* ================= 필터 버튼 이벤트 ================= */
filterControls.querySelectorAll('button').forEach(btn => {
  btn.addEventListener('click', () => {
    applyFilter(btn.dataset.filter);
  });
});


// 모바일 공항 선택 버튼
let mobileSearchAirport = document.querySelector('.mobile-search-ariport > a');
let mobileAirportPotWrap = document.querySelector('.mobile-airport-pot-wrap');
let mobileAirportLinks = document.querySelectorAll('.mobile-airport-pot-wrap a');

// 모바일 목록 열기/닫기
mobileSearchAirport.addEventListener('click', function (e) {
  e.preventDefault();
  mobileAirportPotWrap.classList.toggle('active');
   mobileSearchAirport.classList.add('active');
});

// 공항 클릭 시
mobileAirportLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
   let airportId = this.dataset.id; // 공항 id 가져오기
    if (!airportId) return;
    // 기존 로직 그대로 재사용 (지도 + 날씨 + 아이콘 + 날짜)
    selectAirport(airportId);
    // 선택한 공항 이름을 상단에 표시
    mobileSearchAirport.textContent = this.textContent;
    // 목록 닫기
    mobileAirportPotWrap.classList.remove('active');
    mobileSearchAirport.classList.remove('active')
  });
});




/* ========================== 메인비주얼 날씨 ======================= */

// API KEY
const API_KEY = '8ae590bac9a62fee70da4890ce212c7f';

/* 날씨 통합 관리 */
// 아이콘 코드 기준으로 텍스트 + 이미지 한 번에 관리
const weatherMap = {
  '01d': { text: '맑음', icon: '../images/weather/01d.svg' },
  '01n': { text: '맑은 밤', icon: '../images/weather/01n.svg' },
  '02d': { text: '구름 조금', icon: '../images/weather/02d.svg' },
  '02n': { text: '구름 조금', icon: '../images/weather/02n.svg' },
  '03d': { text: '구름 많음', icon: '../images/weather/03d.svg' },
  '03n': { text: '구름 많은 밤', icon: '../images/weather/03d.svg' },
  '04d': { text: '흐림', icon: '../images/weather/04d.svg' },
  '04n': { text: '흐린밤', icon: '../images/weather/04d.svg' },
  '09d': { text: '소나기', icon: '../images/weather/09d.svg' },
  '10d': { text: '비', icon: '../images/weather/10d.svg' },
  '11d': { text: '번개', icon: '../images/weather/11d.svg' },
  '13d': { text: '눈', icon: '../images/weather/13d.svg' },
  '50d': { text: '안개', icon: '../images/weather/50d.svg' }
};
console.log(weatherMap)
// 아이콘 코드로 날씨 정보 반환
function getWeatherInfo(iconCode) {
  return weatherMap[iconCode] || {
    text: '날씨 정보 없음',
    icon: 'images/weather/no_img.jpg'
  };
}

/*  날씨 API  */
async function getWeather(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);
  const data = await response.json();
  console.log('data = api에서 가져온 데이터값', data)
  // 날씨 영역 렌더링
  document.getElementById('weather').innerHTML = `
    <div class="temp">${data.main.temp.toFixed(0)}°</div>
    <div class="weather-detail">
      <span class="date" id="date"></span>
      <span class="today-temp">
        <span>${data.main.temp_max.toFixed(0)}°</span> /
        <span>${data.main.temp_min.toFixed(0)}°</span>
      </span>
      <span class="today-weather" id="description"></span>
    </div>
  `;

  // 오늘 요일 설정
  setTodayDay();

  // 아이콘 코드
  const iconCode = data.weather[0].icon;

  // 통합 날씨 정보
  const weatherInfo = getWeatherInfo(iconCode);

  // 화면 반영
  document.getElementById('weatherIcon').src = weatherInfo.icon;
  document.getElementById('description').textContent = weatherInfo.text;
}

/*  위치 정보  */
function getMyLocation() {
  navigator.geolocation.getCurrentPosition((pos) => {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;
    getWeather(lat, lon);
  });
}

/*  날짜  */
function setTodayDay() {
  const dateEl = document.getElementById('date');
  const dayNames = ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'];
  dateEl.textContent = dayNames[new Date().getDay()];
}



/* ======================== 
NEWSROOM & POPUP 
======================= */
let newsroomTab = document.querySelectorAll('.newsroom-tab') // 탭버튼
let newsroomContent = document.querySelectorAll('.newsroom-content')
    
newsroomTab.forEach(btn => {
  btn.addEventListener('click', () => {
    // 버튼 active 초기화
    newsroomTab.forEach(b => b.classList.remove('active'));
    // 목록 숨김
    newsroomContent.forEach(list => list.classList.remove('active'));

    // 클릭한 버튼 활성화
    btn.classList.add('active');

    // data-news와 같은 id 가진 목록 열기
    let targetId = btn.dataset.news;
    document.getElementById(targetId).classList.add('active');
  });
});

/* ------------- 팝업영역 슬라이드-------------- */
var swiper1 = new Swiper(".mySwiper", {
      navigation: {
        nextEl: ".swiper-buttonNext", 
        prevEl: ".swiper-buttonPrev",
      },
      pagination: {
        el: ".mobile-pagination",
        clickable: true,
        type: "fraction"
      },
      autoplay: {
        delay: 1000
      }
    });
    
    function toggleAutoplay(btn){
  if (swiper1.autoplay.running) {
    swiper1.autoplay.stop();        // 일시정지
    btn.classList.add('paused');    // 색상 변경
  } else {
    swiper1.autoplay.start();       // 재생
    btn.classList.remove('paused');
  }
}

// PC 버튼
const pcBtn = document.getElementById('stopBtn');
if (pcBtn) {
  pcBtn.addEventListener('click', function () {
    toggleAutoplay(this);
  });
}

// 모바일 버튼
const mobileBtn = document.getElementById('mobilestopBtn');
if (mobileBtn) {
  mobileBtn.addEventListener('click', function () {
    toggleAutoplay(this);
  });
}


/* ======================== 
    ESG section 
======================= */
    var swiper = new Swiper(".esg-swiper", {
      //loop: true,
      
      navigation: {
        nextEl: ".esgbutton-next",
        prevEl: ".esgbutton-prev",
      },
      slidesPerView: 3,
      spaceBetween: 40,
       breakpoints: {
    0: {               // 모바일
      slidesPerView: 1,
    },
    768: {            // PC
      slidesPerView: 2,
    },
    1024: {            // PC
      slidesPerView: 3,
    },
  },
    })

/* ======================== 
  인재채용
======================= */

let jobSwiper;

function initJobSwiper() {
  jobSwiper = new Swiper(".jobSwiper", {
    scrollbar: '.swiper-scrollbar',
    scrollbarHide: true,
    slidesPerView: 3,
    initialSlide: 1,
    spaceBetween: 30,
    centeredSlides: true,
    grabCursor: true,
    navigation: {
      nextEl: ".jobs-button-next",
      prevEl: ".jobs-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      type: "progressbar",
    },
    breakpoints: {
      0: { // 모바일
        slidesPerView: 1.5,
        spaceBetween: 30,
        centeredSlides: true,
        watchSlidesProgress: true,
        effect: "creative",
        creativeEffect: {
          prev: { translate: ['-100%', 0, -300], rotate: [0,0,-30], scale: 0.8, opacity:0.7, shadow:true },
          next: { translate: ['100%', 0, -500], rotate: [0,0,30], scale:0.8, opacity:0.7, shadow:true }
        }
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
  통합예약
======================= */
 gsap.registerPlugin(ScrollTrigger);
    let mm = gsap.matchMedia();
    let content = document.querySelector(".reservation-content");
    let isWhite = false;

    // pc용 1024px 이상
mm.add("(min-width: 1024px)", () => {
  const ctx = gsap.context(() => {
    ScrollTrigger.create({
      trigger: ".reservation",
      start: "top top",
      end: () => "+=" + window.innerHeight * 0.6,
      pin: ".reservation-content",
      pinSpacing: true,
      onEnter: () => content.classList.remove("white"),
      onEnterBack: () => content.classList.remove("white"),
      onUpdate: (self) => {
        const movedY = 2080 * self.progress;
        content.classList.toggle("white", movedY > 200);
      }
    });

    gsap.fromTo(
      ".reservation-img",
      { y: 1780, opacity: 0 },
      {
        y: -300,
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".reservation",
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5
        }
      }
    );
  });

  // 브레이크포인트 바뀌면 자동 정리
  return () => ctx.revert();
});

//  mobile/tablet 1023px 이하
mm.add("(max-width: 1023px)", () => {
  const ctx = gsap.context(() => {
    ScrollTrigger.create({
      trigger: ".reservation",
      start: "top top",
      end: () => "+=" + window.innerHeight * 0.4,
      pin: ".reservation-content",
      pinSpacing: true,
      onEnter: () => content.classList.remove("white"),
      onEnterBack: () => content.classList.remove("white"),
      onUpdate: (self) => {
        const movedY = 900 * self.progress;
        content.classList.toggle("white", movedY > 120);
      }
    });

    gsap.fromTo(
      ".reservation-img",
      { y: 1600, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".reservation",
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      }
    );
  });

  return () => ctx.revert();
});

var swiper = new Swiper(".adSwiper", {
  slidesPerView: 4,      // 한 화면에 4개 슬라이드
  spaceBetween: 50,       // 슬라이드 사이 간격
  loop: true,             // 무한 반복
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
 breakpoints: {
  0: { slidesPerView: 2 },
  769: { slidesPerView: 3 },
  1024: { slidesPerView: 4}
}
});
