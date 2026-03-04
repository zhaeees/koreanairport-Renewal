/* ============================ 
  헤더 영역 
================================== */
let menuItems = document.querySelectorAll('.menu-item'); // 대메뉴
let submenus = document.querySelectorAll('.submenu'); //서브메뉴
let searchBtn = document.getElementById('searchBtn'); //검색버튼
let searchBar = document.getElementById('searchBar');  //검색창
let searchInput = document.getElementById('searchInput'); //검색창 input
let menuToggle = document.getElementById('menuToggle'); //햄버거
let mobileMenu = document.getElementById('mobileMenu'); // 모바일메뉴
let accordionItems = document.querySelectorAll('.accordion-item'); // 아코디언 항목들
let subItems = document.querySelectorAll('.accordion-sub')// 아코디언 서브 항목들
let subLinks = document.querySelectorAll('.accordion-sub > a');// 아코디언 서브메뉴 a 태그
let familySite = document.querySelector('.family-site')
let familyContent = document.querySelector('.family-content')// 패밀리사이트
let mobileCloseBtn = document.getElementById('mobileCloseBtn') // 패밀리사이트 닫기버튼
let airportPot = document.getElementById('airportPot') //공항이동 영역
let airportWrap = document.querySelector('.airport-pot-wrap'); // 공항이동 wrap
let closeAirportBtn = document.getElementById('closeAirportBtn'); // 공항이동 닫기버튼
let familyBtn = document.getElementById('familyBtn'); // 패밀리사이트 버튼
let familyWrap = document.querySelector('.family')

menuItems.forEach(function (item) {
  item.addEventListener("mouseenter", function () {
    // 1) 모든 active 제거
    menuItems.forEach(li => li.classList.remove("active"));

    // 2) 현재 메뉴에 active 추가
    item.classList.add("active");
    // 전부 안보이게 내가 선택한 요소만 보이게
    // 3) 모든 submenu 숨기기
    submenus.forEach(function (sub) {
      sub.style.display = 'none';
    })
    // 4) 해당 submenu만 열기
    let target = document.getElementById(item.dataset.target);
    if (target) {
      target.style.display = 'block'
    }
  })

});
// nav에서 마우스가 떠나면 submenu들을 각각 안보이게
document.querySelector('nav').addEventListener('mouseleave', function () {
  submenus.forEach(function (sub) {
    sub.style.display = 'none';
  })
})
// 서브메뉴에 마우스가 들어오면 블럭, 떠나면 display none
submenus.forEach(function (sub) {
  sub.addEventListener('mouseenter', function () {
    sub.style.display = 'block'
  })
  sub.addEventListener('mouseleave', function () {
    sub.style.display = 'none';
    // sub-menu에서 벗어나면 active 제거
    menuItems.forEach(li => li.classList.remove("active"));
  })
})


/*   패밀리 사이트 누르면 패밀리wrap이 열림 */
// 버튼 클릭 → 열고 닫기
familyBtn.addEventListener('click', function (e) {
  e.stopPropagation(); // document 클릭 방지
  familyWrap.classList.toggle('active');
});

// 패밀리 영역 클릭 시 닫히지 않게
familyWrap.addEventListener('click', function (e) {
  e.stopPropagation();
});

// 바깥 클릭 시 닫기
document.addEventListener('click', function () {
  familyWrap.classList.remove('active');
});


// =================================== 반응형 모바일 ==================================

// 햄버거 먼저
//햄버거 클릭하면 active 클래스 추가
menuToggle.addEventListener('click', function () {
  menuToggle.classList.toggle('active');
  mobileMenu.classList.toggle('active');
  document.querySelector('header').classList.toggle('active');
  document.querySelector('.logo-img').classList.toggle('active');

})

// 아코디언 메뉴
accordionItems.forEach(item => {
  let title = item.querySelector('.accordion-title');
  let content = item.querySelector('.accordion-content');

  title.addEventListener('click', function () {
    let isActive = item.classList.contains('active');
    // 모두 닫기
    accordionItems.forEach(i => {
      i.classList.remove('active');
      i.querySelector('.accordion-content').classList.remove('active');
    });
    // 닫혀있으면 열기
    if (!isActive) {
      item.classList.add('active');
      content.classList.add('active');
    }
  });

});

// 아코디언 서브메뉴
subItems.forEach(item => {
  let link = item.querySelector('a'); // 클릭 대상
  let subList = item.querySelector('.accordion-sub-list'); // 열릴 대상

  // 서브리스트가 없는 항목은 패스
  // 아래 코드 지웠어요 
  // if (!subList) return;

  link.addEventListener('click', function (e) {

    const isOpen = subList && subList.classList.contains('active');

    // 1. 무조건 전체 닫기
    document.querySelectorAll('.accordion-sub-list').forEach(list => {
      list.classList.remove('active');
    });

    // 2. 자식 없는 메뉴면 끝
    if (!subList) return;

    // 3. 이미 열려있던 게 아니면 다시 열기 (토글)
    if (!isOpen) {
      e.preventDefault();
      subList.classList.add('active');
    }
  });
});

// 서브메뉴의 a태그 누르면 active 추가 제거
subLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();

    // 이미 active면 제거 (원래 상태로)
    if (this.classList.contains('active')) {
      this.classList.remove('active');
      return;
    }

    // 다른 a들의 active 제거
    subLinks.forEach(l => l.classList.remove('active'));

    // 클릭한 a만 active 추가
    this.classList.add('active');
  });
});

// 모바일 탑 메뉴
familySite.addEventListener('click', function () {
  familyContent.classList.toggle('active')
})


// 공항이동
airportPot.addEventListener('click', function () {
  airportWrap.classList.toggle('active');
  airportPot.classList.toggle('active')
})
closeAirportBtn.addEventListener('click', function () {
  airportWrap.classList.remove('active');
  airportPot.classList.remove('active')
})

/* 검색창 */
/* 돋보기 클릭 */
searchBtn.addEventListener('click', function (e) {
  e.preventDefault();
  e.stopPropagation(); // 문서 클릭 방지

  searchBtn.classList.toggle('active');
  searchBar.classList.toggle('active');

  // 열릴 때 포커스
  if (searchBar.classList.contains('active')) {
    searchInput.focus();
  }
});

/* 검색창 내부 클릭 시 닫히지 않게 */
searchBar.addEventListener('click', function (e) {
  e.stopPropagation();
});

/* 화면 아무 데나 클릭하면 닫기 + 초기화 */
document.addEventListener('click', function () {
  searchBtn.classList.remove('active');
  searchBar.classList.remove('active');
  searchInput.value = ''; //  검색어 초기화
});

searchInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') { // Enter 키 감지
    e.preventDefault(); // 기본 폼 제출 방지
    const query = searchInput.value.trim();
    if (query !== '') {
      // 여기서 검색 결과 처리, API 호출, 페이지 이동 등 가능
      searchInput.value = ''; // 입력 초기화 (원하면)
      searchBar.classList.remove('active');
      searchBtn.classList.remove('active');
    }
  }
});

/* ============================ 
  팝업 영역 
================================== */
document.addEventListener("DOMContentLoaded", () => {

  const popup = document.querySelector('.open-popup');
  const popupBg = document.querySelector('.popup-background');
  const closeBtn = document.querySelector('.close-popupBtn');

  const popupKey = "mainPopupShown";
  const isMainPage = document.body.dataset.page === "main";

  function openPopup() {
    if (!popup) return;
    popup.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closePopup() {
    if (!popup) return;
    popup.classList.remove("active");
    document.body.style.overflow = "";

    
    sessionStorage.setItem(popupKey, "true");
  }

  // 메인이고 + 아직 안 닫았을 때만 열기
  if (isMainPage && !sessionStorage.getItem(popupKey)) {
    openPopup();
  }

  if (closeBtn) closeBtn.addEventListener("click", closePopup);
  if (popupBg) popupBg.addEventListener("click", closePopup);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closePopup();
  });

});