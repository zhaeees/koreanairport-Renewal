/* ========================================
   main-visual
======================================== */
let mainTabs = document.querySelectorAll('.search-category span');
let result = document.getElementById('result');

mainTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // 1. active 초기화
    mainTabs.forEach(t => t.classList.remove('active'));
    // 2. 클릭한 요소 활성화
    tab.classList.add('active');
    // 3. 출발 / 도착 
    let type = tab.dataset.type;
    
    if (type === 'depart') {
      resultBox.classList.remove('arrive');
      resultBox.classList.add('depart');
    } else {
      resultBox.classList.remove('depart');
      resultBox.classList.add('arrive');
    }
  });
})

// 날씨

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

// 아이콘 코드로 날씨 정보 반환
function getWeatherInfo(iconCode) {
  return weatherMap[iconCode] || {
    text: '날씨 정보 없음',
    icon: '../images/weather/no_img.svg'
  };
}

// 제주 좌표
const JEJU_LAT = 33.4996;
const JEJU_LON = 126.5312;

// API KEY
const API_KEY = '8ae590bac9a62fee70da4890ce212c7f';

// DOM
const timeEl = document.querySelector('.today-time');
const iconEl = document.getElementById('weatherIcon');
const tempEl = document.querySelector('.weather-temp');

// 현재 시간
function setTime() {
  const now = new Date();
  const hour = String(now.getHours()).padStart(2, '0');
  const min = String(now.getMinutes()).padStart(2, '0');
  timeEl.textContent = `${hour}:${min}`;
}

// 제주 날씨 요청
async function getJejuWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${JEJU_LAT}&lon=${JEJU_LON}&units=metric&lang=kr&appid=${API_KEY}`;
  
  const response = await fetch(url);
  const data = await response.json();
   console.log('data = api에서 가져온 데이터값', data)
  
   // 아이콘 코드
  const iconCode = data.weather[0].icon;
  const weatherInfo = getWeatherInfo(iconCode);
  
 // 화면 반영
 //아이콘
  document.getElementById('weatherIcon').src = weatherInfo.icon;
  // 온도
  tempEl.textContent = `${Math.round(data.main.temp)} °C`;
  // 날씨
   document.getElementById('description').textContent = weatherInfo.text;
}

// 실행
setTime();
getJejuWeather();

/* ========================================
   탑승수속 대기시간
======================================== */
/*  요소  */
const totalTimeEl = document.querySelector('.total-time');
const timeNotice = document.querySelector('.time-notice');
const steps = document.querySelectorAll('.step');
const times = document.querySelectorAll('.step-time');
const person = document.querySelector('.person');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

/*  상태  */
let currentStep = 0;
let currentCongestion = 'normal';

/*  데이터  */
let positions = ['12%', '25%', '40%', '58%', '68%', '82%'];
let stepsData = [3, 4, 2, 6, 3, 0]; // 마지막 단계 출발은 계산 제외
let congestionRate = { smooth: 1, normal: 1.2, busy: 1.5 };

/*  시간 표시 제어  */
function isHiddenTime() {
  let hour = new Date().getHours();
  return hour >= 23 || hour < 6; // 0시 ~ 5시
}

function toggleTimeVisibility() {
  let hidden = isHiddenTime();
  totalTimeEl.style.display = hidden ? 'none' : 'inline';
  timeNotice.style.display = hidden ? 'inline' : 'none';
  
  times.forEach((el, i) => {
    if(i === startDate.length - 1 ){
      el.style.display = 'inline;'
    }else{
      el.style.display = hidden ? 'none' : 'inline';
    }
  });
}

/*  단계 & 사람 이동  */
function updateStep() {
  steps.forEach((step, idx) => {
    step.classList.toggle('is-active', idx === currentStep);
  });


  // 화면이 넓으면 사람 이동
  if (window.innerWidth > 768) {
    person.style.left = positions[currentStep];
  }
  updateStepTimes();
  toggleTimeVisibility();
}

/*  단계별 시간 계산  */
function updateStepTimes() {
  let total = 0;
  stepsData.forEach((base, i) => {

    if (i === stepsData.length - 1){
        times[i].textContent = '—'; //  출발은 '-' 보여야함
        return;
      }
    
    const time = Math.round(base * congestionRate[currentCongestion]);
    times[i].textContent = `${time}분`;
    total += time;
  });
  totalTimeEl.textContent = total;
}

/* ================= 자동 이동 ================= */
function autoMove() {
  // 모바일이면 자동 이동 종료
  if (window.innerWidth <= 768) return;

  currentStep = (currentStep + 1) % steps.length;
  updateStep();
}

let autoMoveTimer = setInterval(autoMove, 3000);
function resetAutoMove() {
  clearInterval(autoMoveTimer);
  autoMoveTimer = setInterval(autoMove, 3000);
}

/* ================= 이벤트 ================= */
steps.forEach((step, idx) => {
  step.addEventListener('click', () => {
    currentStep = idx;
    updateStep();
    resetAutoMove();
  });
});

nextBtn.addEventListener('click', () => {
  if (currentStep < steps.length - 1) {
    currentStep++;
    updateStep();
    resetAutoMove();
  }
});

prevBtn.addEventListener('click', () => {
  if (currentStep > 0) {
    currentStep--;
    updateStep();
    resetAutoMove();
  }
});

/* ================= 실시간 혼잡도 ================= */
setInterval(() => {
  const levels = ['smooth', 'normal', 'busy'];
  currentCongestion = levels[Math.floor(Math.random() * levels.length)];
  updateStepTimes();
  toggleTimeVisibility();
}, 6000);

/* ================= 초기 실행 ================= */
document.addEventListener('DOMContentLoaded', () => {
  updateStep();
  toggleTimeVisibility();

  // 1분마다 야간 체크
  setInterval(toggleTimeVisibility, 60000);

  
});


/* ========================================
  Airport Guide
======================================== */

var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,        // 모바일 기본 1개
  spaceBetween: 20,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    769: {                // 태블릿 이상
      slidesPerView: 3,
    }
  }
});
/* ===============================
   주차장 혼잡도 API 연동
================================ */

/* 상태 판별 */
function getStatus(percent) {
  if (percent <= 40) return { text: '여유', class: 'low' };
  if (percent <= 70) return { text: '보통', class: 'mid' };
  return { text: '혼잡', class: 'high' };
}

/* 화면 반영 */
function renderParking(id, percent) {
  const box = document.querySelector(`.parking-${id.toLowerCase()}`);
  const textEl = box.querySelector('.parking-top p');
  const barEl = box.querySelector('.parking-bottom');

  const status = getStatus(percent);

  textEl.textContent = status.text;
  barEl.className = `parking-bottom ${status.class}`;
}

/* Mock API 호출 */
function fetchParkingData() {
  // 실제 API 오면 여기 fetch 주소만 변경
  const mockData = {
    P1: 82,
    P2: 55
  };

  renderParking('P1', mockData.P1);
  renderParking('P2', mockData.P2);
}

/* 실행 */
document.addEventListener('DOMContentLoaded', fetchParkingData);


/* ========================================
   항공권 예약
======================================== */
/* 탭 요소 */
let tabs = document.querySelectorAll('.book-top-category span');
/* 국내선 / 국제선 영역 */
let domesticBox = document.querySelector('.book-left.domestic');
let internationalBox = document.querySelector('.book-left.international');
// 국내선
let domeStart = document.getElementById('domeStart');
let domeArrived = document.getElementById('domeArrived');
// 국제선
let intStart = document.getElementById('intStart');
let intArrived = document.getElementById('intArrived');


// ============ 국내선 국제선 탭 ====================
tabs.forEach(tab => {
  tab.addEventListener('click', () => {

    /* 1. 모든 탭 비활성화 */
    tabs.forEach(t => t.classList.remove('active'));

    /* 2. 클릭한 탭 활성화 */
    tab.classList.add('active');

    /* 3. 모든 영역 숨김 */
    domesticBox.classList.remove('is-active');
    internationalBox.classList.remove('is-active');

    /* 4. 선택된 탭에 따라 영역 표시 */
    if (tab.dataset.type === 'domestic') {
      domesticBox.classList.add('is-active');
    } else {
      internationalBox.classList.add('is-active');
    }
  });
});
// 출발지 = 도착지 방지 공통 함수
function preventSamePlace(startSelect, arrivedSelect) {

  startSelect.addEventListener('change', () => {
    if (
      startSelect.value &&
      startSelect.value === arrivedSelect.value
    ) {
      alert('출발지와 도착지는 같을 수 없습니다.');
      startSelect.selectedIndex = 0;
    }
  });

  arrivedSelect.addEventListener('change', () => {
    if (
      arrivedSelect.value &&
      arrivedSelect.value === startSelect.value
    ) {
      alert('출발지와 도착지는 같을 수 없습니다.');
      arrivedSelect.selectedIndex = 0;
    }
  });
}
preventSamePlace(domeStart, domeArrived);
preventSamePlace(intStart, intArrived);

// ============= 왕복과 편도 영역 =====================
/* 라디오 왕복, 편도 영역 */
let roundTicket = document.getElementById('roundTicket');
let singleTicket = document.getElementById('singleTicket');
let dateTitle = document.getElementById('dateTitle');
let startDate = document.getElementById('startDate');
let arrivedDate = document.getElementById('arrivedDate');

// 초기상태는 왕복
dateTitle.textContent = '가는날 / 오는날';
arrivedDate.classList.remove('is-hidden');

/* 왕복 */
roundTicket.addEventListener('change', () => {
  if (roundTicket.checked) {
    dateTitle.textContent = '가는날 / 오는날';
    arrivedDate.classList.remove('is-hidden');
    arrivedDate.value = ''; 
    startDate.value = ''; 
  }
});

/* 편도 */
singleTicket.addEventListener('change', () => {
  if (singleTicket.checked) {
    dateTitle.textContent = '가는날';
    arrivedDate.classList.add('is-hidden');
    startDate.value = ''; 
  }
});

// ============ 탑승인원 선택하기 =============
// 버튼 & 옵션 영역
const passengerBtn = document.querySelector('.inp-sCustom');
const optionGroup = document.getElementById('search-optGrp');
const closeBtn = document.getElementById('search-optGrpClosed');
// 처음엔 숨김
optionGroup.style.display = 'none';

// 버튼 클릭 → 옵션 토글
passengerBtn.addEventListener('click', function () {
  optionGroup.style.display =
    optionGroup.style.display === 'block' ? 'none' : 'block';
});

// 닫기 버튼
closeBtn.addEventListener('click', function () {
  optionGroup.style.display = 'none';
});


document.querySelectorAll('.list-age li').forEach(function (item) {
  const minusBtn = item.querySelector('.btn-del');
  const plusBtn = item.querySelector('.btn-add');
  const input = item.querySelector('.inp-t');

  input.value = 0; // 초기값

  plusBtn.addEventListener('click', function () {
    input.value = Number(input.value) + 1;
  });

  minusBtn.addEventListener('click', function () {
    if (input.value > 0) {
      input.value = Number(input.value) - 1;
    }
  });
});

const applyBtn = document.querySelector('.btnRedA');

applyBtn.addEventListener('click', function () {
  const counts = document.querySelectorAll('.list-age .inp-t');

  const adult = counts[0].value;
  const child = counts[1].value;
  const baby = counts[2].value;

  passengerBtn.textContent =
    `성인${adult}, 소아${child}, 유아${baby}`;

  optionGroup.style.display = 'none';
});
/* ========================================
  Travel Jeju
======================================== */
const travel = [
  // 랜드마크
  {id: 'halla', name: '한라산', address: '제주 제주시 오라이동 산107-20',top: '43%', left: '50%', type: 'landmark', icon: 'images/mainvisual/dot.png'},
  {id: 'udo', name: '우도', address: '제주 제주시 우도면', top: '15%', left: '98%', type: 'landmark', icon: 'images/mainvisual/dot.png'},
  {id: 'Seongsan Ilchulbong', name: '성산일출봉', address: '제주 서귀포시 성산읍 성산리 1', top: '23%', left: '95%', type: 'landmark', icon: 'images/mainvisual/dot.png'},
  {id: 'Seopjikoji', name: '섭지코지', address: '제주 서귀포시 성산읍 고성리', top: '28%', left: '93%', type: 'landmark', icon: 'images/mainvisual/dot.png'},
  {id: 'SeongeupVillage', name: '성읍 민속마을', address: '제주 서귀포시 표선면 성읍리 3294', top: '39%', left: '84%', type: 'landmark', icon: 'images/mainvisual/dot.png'},
  {id: 'DokkaebiRoad', name: '도깨비도로', address: '제주 제주시 노형동 291-17', top: '30%', left: '45%', type: 'landmark', icon: 'images/mainvisual/dot.png'},
  {id: 'Cheonjiyeon', name: '천지연폭포', address: '제주 서귀포시 천지동 666-2', top: '63%', left: '55%', type: 'landmark', icon: 'images/mainvisual/dot.png'},
  {id: 'Bijarim', name: '비자림', address: '제주 제주시 구좌읍 비자숲길 55', top: '24%', left: '85%', type: 'landmark', icon: 'images/mainvisual/dot.png'},
  {id: 'Cheonjeyeon', name: '천제연폭포', address: '제주 서귀포시 천제연로 132', top: '68%', left: '43%', type: 'landmark', icon: 'images/mainvisual/dot.png'},
  {id: 'Jusangjeolli', name: '대포주상절리', address: '제주 서귀포시 이어도로 36-24', top: '64%', left: '26%', type: 'landmark', icon: 'images/mainvisual/dot.png'},
  {id: 'hallaAroretum', name: '한라수목원', address: '제주 제주시 수목원길 72', top: '25%', left: '48%', type: 'landmark', icon: 'images/mainvisual/dot.png'},
  {id: 'yongdo', name: '용두암', address: '제주 제주시 용두암길 15', top: '15%', left: '46%', type: 'landmark', icon: 'images/mainvisual/dot.png'},
  // 둘레길, 오름
  {id: 'Salyeonisup', name: '사려니숲길', address: '사려니숲입구 → 물찻오름입구 → 붉은오름 입구 ', top: '37%', left: '58%', type: 'trail', icon: 'images/mainvisual/dot.png'},
  {id: 'Donbaeg', name: '동백길', address: '무오법정사 입구 → 무오법정사 → 시오름 → 돈내코', top: '50%', left: '43%', type: 'trail', icon: 'images/mainvisual/dot.png'},
  {id: 'CheonAsup', name: '천아숲길', address: '천아수원지 → 임도삼거리 → 노로오름 → 보림농장삼거리', top: '38%', left: '40%', type: 'trail', icon: 'images/mainvisual/dot.png'},
  {id: 'Saebyeol', name: '새별오름', address: '제주 제주시 애월읍 봉성리 산59-8', top: '43%', left: '28%', type: 'trail', icon: 'images/mainvisual/dot.png'},
  {id: 'Geum', name: '금오름', address: '제주 제주시 한림읍 금악리 산1-1', top: '48%', left: '21%', type: 'trail', icon: 'images/mainvisual/dot.png'},
  {id: 'Baekyaki', name: '백약이오름', address: '제주 서귀포시 표선면 성읍리 산1', top: '30%', left: '75%', type: 'trail', icon: 'images/mainvisual/dot.png'},
  {id: 'Byeoldobong', name: '별도봉', address: '제주 제주시 화북일동 4472', top: '14%', left: '48%', type: 'trail', icon: 'images/mainvisual/dot.png'},
  {id: 'Udobong', name: '우도봉', address: '제주 제주시 우도면 연평리 산18-2', top: '18%', left: '99%', type: 'trail', icon: 'images/mainvisual/dot.png'},
  // 박물관 / 미술관
  {id: 'Arario Museum', name: '아라리오뮤지엄', address: '제주 제주시 탑동로 14', top: '15%', left: '49%', type: 'museum', icon: 'images/mainvisual/dot.png'},
  {id: 'Lee Jung-seop Art Museum', name: '이중섭미술관', address: '제주 서귀포시 이중섭로 27-3', top: '66%', left: '55%', type: 'museum', icon: 'images/mainvisual/dot.png'},
  {id: 'Museum of Art', name: '제주도립미술관', address: '제주 제주시 1100로 2894-78', top: '28%', left: '50%', type: 'museum', icon: 'images/mainvisual/dot.png'},
  {id: 'Museum of Contemporary Art', name: '제주현대미술관', address: '제주 제주시 저지14길 35', top: '46%', left: '21%', type: 'museum', icon: 'images/mainvisual/dot.png'},
  {id: 'National Museum', name: '국립제주박물관', address: '제주 제주시 일주동로 17', top: '18%', left: '55%', type: 'museum', icon: 'images/mainvisual/dot.png'},
  {id: 'Chocolate Museum', name: '초콜릿박물관', address: '제주 서귀포시 대정읍 일과리 551-18', top: '70%', left: '16%', type: 'museum', icon: 'images/mainvisual/dot.png'},
  {id: 'Teddy Bear', name: '제주테디베어뮤지엄', address: '제주 서귀포시 중문관광로110번길 31', top: '66%', left: '30%', type: 'museum', icon: 'images/mainvisual/dot.png'},
  {id: 'Jeju Folk Village', name: '제주민속촌박물관', address: '제주 서귀포시 표선면 민속해안로 631-34', top: '40%', left: '85%', type: 'museum', icon: 'images/mainvisual/dot.png'}
];

const travelMap = document.getElementById('travelMap');
const filterControls = document.getElementById('filterControls');

let current = 'halla';
let currentFilter = 'landmark';

/* ================= 초기화 ================= */
document.addEventListener('DOMContentLoaded', () => {
  createTravelLabels();
  applyFilter(currentFilter);
  selectTravel(current);
});


/* ================= 라벨 생성 ================= */


function createTravelLabels() {
  travelBox.querySelectorAll('.travel-label').forEach(el => el.remove());


  travel.forEach(item => {
    const label = document.createElement('div');
    label.className = 'travel-label';
    label.dataset.id = item.id;
    label.dataset.type = item.type;
    label.dataset.address = item.address;
    label.style.top = item.top;
    label.style.left = item.left;
    label.dataset.icon = item.icon;
    label.innerHTML = `
      <span class="pin-slot">
         <img class="pin-img" src="${item.icon}" alt="">
      </span>
      <span class="label-bubble">${item.name}</span>
    `;
    

    label.addEventListener('click', () => selectTravel(item.id));
    travelMap.appendChild(label);
  });
}

function isMobile() {
  return window.innerWidth <= 768;
}

/* ================= 여행지 선택 (모바일 대응) ================= */
function selectTravel(id) {
  current = id;

  // 기존 상태 초기화
  document.querySelectorAll('.travel-label').forEach(label => {
    label.classList.remove('active');
    label.querySelector('.address-bubble')?.remove();

    // 데스크톱에서만 pin 제거
    if (!isMobile()) {
      label.querySelector('.pin-img')?.remove();
    }
  });

  const selected = document.querySelector(`.travel-label[data-id="${id}"]`);
  if (!selected) return;

  selected.classList.add('active');


  /* ================= 데스크톱 전용 ================= */
  if (!isMobile()) {
    const img = document.createElement('img');
    img.className = 'pin-img';
    img.src = selected.dataset.icon;
    img.alt = '';

    selected.querySelector('.pin-slot')?.appendChild(img);
  }

  /* ================= 공통 : 주소 말풍선 ================= */
  const bubble = document.createElement('div');
  bubble.className = 'address-bubble';
  bubble.textContent = selected.dataset.address;
  selected.appendChild(bubble);
}




/* ================= 필터 ================= */
function applyFilter(filter) {
  currentFilter = filter;

  filterControls.querySelectorAll('button').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === filter);
  });

  document.querySelectorAll('.travel-label').forEach(label => {
    label.style.display =
      label.dataset.type === filter ? '' : 'none';
  });
}

/* ================= 필터 버튼 이벤트 ================= */
filterControls.querySelectorAll('button').forEach(btn => {
  btn.addEventListener('click', () => {
    applyFilter(btn.dataset.filter);
  });
});

/* ================= resize 대응 ================= */
window.addEventListener('resize', () => {
  const currentMode = isMobile() ? 'mobile' : 'desktop';

  if (prevMode !== currentMode) {
    refreshUI();
    prevMode = currentMode;
  }
});

/* ================= UI 재정렬 ================= */
function refreshUI() {
  document.querySelectorAll('.travel-label').forEach(label => {
    label.classList.remove('active');
    label.querySelector('.address-bubble')?.remove();
  });

  if (current) {
    selectTravel(current);
  }
}