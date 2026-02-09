# 한국공항공사 리뉴얼
![MainVisual](https://github.com/user-attachments/assets/0e632b75-9144-4d6d-80b0-9ac8877e1d18)

## Link
리뉴얼 사이트(web-site): 🖥[보러가기](https://zhaeees.github.io/koreanairport-Renewal/) <br/>
디자인 기획서(figma-slide):[기획서 보러가기](https://www.figma.com/slides/WlfXol5i5hcYz3tifUCk7B) <br/>
디자인시안(figma): 🎨[디자인 보러가기](https://www.figma.com/design/vWrPlSnYOOtSFLhJWrxSbt/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-32&t=DLOKfLYf2d4HIvBr-1)
## 리뉴얼 이유
기존 사이트는 정보 중복과 복잡한 구조로 인해 사용자가 핵심 콘텐츠에 빠르게 접근하기 어렵고, 반응형·접근성 측면에서도 한계가 있어 사용자 중심의 정보 재구성과 UX 개선을 위한 리뉴얼이 필요하다 생각됨.

### 리뉴얼이 필요한 포인트✨
1. 정보 구조의 복잡성과 중복
2. 사용자 동선 및 탐색성 문제
3. 반응형·접근성 한계
4. 콘텐츠 우선순위 불명확
5. 브랜드 신뢰도 및 최신성 부족


## 리뉴얼 목표
본 리뉴얼은 정보 구조 단순화와 사용자 동선 개선을 통해 핵심 콘텐츠 접근성을 높이는 것을 목표로 함.

* 정보 탐색 시간 단축
* 콘텐츠 우선순위 재정의
* 반응형·접근성 강화


## 개선 방향
페이지별 사용자 목적을 기준으로 채용 페이지는 행동 유도 중심으로, 공항 이용 페이지는 정보 탐색 중심 구조로 분리.   
이를 통해 사용자는 불필요한 판단 과정을 줄이고, 각 페이지에서 기대하는 행동과 정보를 빠르게 인지할 수 있도록 개선가능.

## 사용한 툴
Figma, HTML, CSS, Javascript

## Before & After
// point📍

1. 날씨 API 연동을 통해 실시간 날씨 데이터 자동 수신
   - 수신한 날씨 코드값을 기준으로 이미지 조건 분기 처리 → 날씨 상태에 따라 날씨 아이콘 동적 변경
   - 데이터 기반 UI 제어 방식으로 사용자 체감 정확도 및 몰입도 향상
 2. 배열 기반 데이터 구조로 위치 좌표 및 ID를 생성하여 유지보수성과 확장성 개선
 3. Swiper 슬라이더에 반응형 회전 효과(rotate) 를 적용하여 모바일 UX 몰입도 향상
 4. 가상 데이터 기반으로 공항 소요시간을 계산하여 실시간 시뮬레이션 UI 구현
     - 이동 시간을 사람 이동 애니메이션으로 시각화하여 정보 전달력과 재미 요소를 동시에 강화
     - 수치 중심 정보 → 직관적 인터랙션 UI 로 전환하여 사용자 몰입도 향상
     - CSS 애니메이션 + JS 제어하여 시간값에 따라 animation-duration 동적 조절

<br/>
<br/>

| Before | After |
|--------|-------|
| <img width="300" height="auto" alt="Image" src="https://github.com/user-attachments/assets/041344cb-92fb-4bf3-9551-5b2dc2d54588" /><img width="80" height="auto" alt="Image" src="https://github.com/user-attachments/assets/2e1f2ea6-96b6-4118-8945-3c9e2bad0294" /> | <img width="420" height="auto" alt="Image" src="https://github.com/user-attachments/assets/800a6d05-2830-4277-a6ce-63bd8c9a29f5" /><img width="120" height="auto" alt="Image" src="https://github.com/user-attachments/assets/807dbdb2-8719-4b06-9b84-c9638d98dcf6" /> |
<br/>


   


| 서브페이지1 | 서브페이지2 |
|--------|-------|
| <img width="1920" height="4339" alt="Image" src="https://github.com/user-attachments/assets/1799b16f-ff0b-423f-9f6b-bcb5aa0061be" /> | <img width="1920" height="6280" alt="Image" src="https://github.com/user-attachments/assets/4b73ed87-96d5-4a09-a712-b600110eaaf2" /> |
<br/>


