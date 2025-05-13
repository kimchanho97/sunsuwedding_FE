# 순수웨딩 2.0

![순수웨딩 소개](https://github.com/Step3-kakao-tech-campus/Team5_BE/assets/84652886/ebb9b772-69cd-413d-9d17-cb10fefdf714)

### 목차

1. [프로젝트 소개](#-프로젝트-소개)
2. [기능 시연](#-기능-시연)
3. [개발 주안점](#%EF%B8%8F개발-주안점)
4. [폴더 구조](#-폴더-구조)
5. [시작 가이드](#%EF%B8%8F-시작-가이드)
6. [기술 스택](#-기술-스택)

<br>

## 🚀 프로젝트 소개

**순수웨딩 2.0**은 예비 부부와 웨딩 플래너를 **투명한 가격과 실시간 상담을 통해 연결**하는 웨딩 매칭 플랫폼입니다.

이 프로젝트는 기존 **순수웨딩 1.0 팀 프로젝트**를 기반으로,  
**기획부터 프론트엔드, 백엔드, 인프라까지 모든 영역을 1인 풀스택으로 리팩토링 및 재구현**한 개인 프로젝트입니다.

<br>

### 🎯 Why 순수웨딩?
결혼 준비를 시작하면 누구나 느끼는 불편함이 있습니다. 
- 💸 **불투명한 가격 정보**: 지인 소개로만 저렴한 견적을 받을 수 있는 구조
- 📑 **복잡한 정보 탐색 과정**: 웨딩 박람회, 블로그, SNS를 모두 뒤져야 하는 번거로움
- 🤝 **판매자 중심 시장**: 소비자가 아닌 판매자가 주도하는 구조
- 💼 **웨딩 플래너의 열정페이**: 경력 중심 수익 구조와 낮은 초봉

**👉 순수웨딩은 가격 공개, 실시간 상담, 리뷰 중심 매칭 기능을 통해 소비자가 주도하는 새로운 결혼 준비 경험을 제공합니다.**

<br>

### 💡 주요 기능

- 🤵🏻‍♀️ **플래너 포트폴리오 열람**

  - 플래너 자기소개, 예상 견적, 시공 사진, 리뷰 등 확인
  - 멤버십 가입 시 실제 계약 이력(업체명, 가격, 날짜 등) 열람 가능
  
- 💬 **실시간 채팅 상담**

  - 원하는 플래너와 1:1 채팅 상담
  - 견적 협의 및 계약 여부는 자유롭게 결정
  
- 🧾 **견적서 공유**

  - 채팅방 내 견적서 작성 및 수정 기능
  - 업체명, 가격, 진행 상태 등을 명확히 공유
  - 견적 확정 후 리뷰 작성 가능
  
- ⭐ **리뷰 및 찜하기**

  - 계약 완료 후 작성된 실제 후기 열람
  - 플래너 찜 기능으로 관심 플래너 저장

<br>

### 🗓 개발 기간

2025.03 ~ 2025.04

<br>

### 🔗 링크 모음

- **서비스 배포 주소**: [https://sunsu-wedding.shop](https://sunsu-wedding.shop/)
- **백엔드 API 서버 레포지토리**: [순수웨딩 메인 API 서버 레포지토리 바로가기](https://github.com/kimchanho97/sunsuwedding_BE)
- **채팅 서버 레포지토리**: [순수웨딩 채팅 서버 레포지토리 바로가기](https://github.com/kimchanho97/sunsuwedding_CHAT)
- **프로젝트 문서(Notion)**: [순수웨딩 프로젝트 문서 바로가기](https://kimchanho.notion.site/2-0-1a0a1b1b0041809f8f31fa9314b10a34)

> **현재 서비스는 배포되어 접속 가능한 상태이며,**  
> **프로젝트의 모든 상세 내용은 아래 문서에서 확인할 수 있습니다.**

<br>

## 🎥 기능 시연

|                                                             포트폴리오 탐색                                                              |                                                             검색 및 필터링                                                              |
|:---------------------------------------------------------------------------------------------------------------------------------:|:---------------------------------------------------------------------------------------------------------------------------------:|
| <img width="380" src="https://github.com/Step3-kakao-tech-campus/Team5_FE/assets/104095041/18e4e9cc-87ed-4053-bec3-fd25e48fda29"> | <img width="380" src="https://github.com/Step3-kakao-tech-campus/Team5_FE/assets/104095041/a52c056e-9912-4062-b926-b1c64eb78eb9"> |
|                             • 플래너 소개, 포트폴리오 이미지, 리뷰 확인 <br> • 멤버십 가입 시 실제 계약 이력(가격, 업체 등) 열람 가능 <br>                              |                                              • 지역, 가격 등 조건 설정 <br> • 플래너 이름 검색 기능 지원                                              |

|                                                      메시지 & 이미지 전송                                                      |                                                             채팅 응답 기능                                                              |
|:----------------------------------------------------------------------------------------------------------------------:|:---------------------------------------------------------------------------------------------------------------------------------:|
| <img width="380" src="https://github.com/kimchanho97/algorithm/assets/104095041/d3b0faf7-d20c-4e83-9d66-00d2c38253c6"> | <img width="380" src="https://github.com/Step3-kakao-tech-campus/Team5_FE/assets/104095041/0863820b-a151-4551-8c01-c8478e3a49ad"> |
|                                         • 텍스트 및 이미지 전송 가능 <br> • 실시간 채팅 상담 제공                                          |                                           • 메시지 읽음 표시 <br> • 안 읽은 메시지 개수 표시로 사용자 편의성 강화                                           |

|                                                           포트폴리오 작성 / 수정                                                           |                                                            견적서 작성 / 수정                                                            |
|:---------------------------------------------------------------------------------------------------------------------------------:|:---------------------------------------------------------------------------------------------------------------------------------:|
| <img width="380" src="https://github.com/Step3-kakao-tech-campus/Team5_FE/assets/104095041/2474a94c-6a19-4e02-b047-500b80b307a6"> | <img width="380" src="https://github.com/Step3-kakao-tech-campus/Team5_FE/assets/104095041/7c2c1e74-4bb1-4682-b26f-51fb07015f1a"> |
|                                    • 플래너 자기소개, 예상 가격 등 정보 등록 및 수정 <br> • 이미지 업로드 및 포트폴리오 삭제 가능                                    |                                     • 채팅 내 견적서 작성 및 수정 가능 <br> • 업체명, 가격, 진행 상태 등 명확하게 기록 가능                                      |

|                                                            리뷰 작성 / 수정                                                             |                                                               리뷰 조회                                                               |
|:---------------------------------------------------------------------------------------------------------------------------------:|:---------------------------------------------------------------------------------------------------------------------------------:|
| <img width="380" src="https://github.com/Step3-kakao-tech-campus/Team5_FE/assets/104095041/aed20cd4-a50d-4084-ba63-99c00e160de7"> | <img width="380" src="https://github.com/Step3-kakao-tech-campus/Team5_FE/assets/104095041/4997bb5f-aa6e-47d5-a60c-aea1d166f75c"> |
|                                           • 별점 및 후기를 작성, 수정, 삭제 가능 <br> • 실제 계약 후 작성 가능                                           |                                                          • 플래너별 리뷰 확인 가능                                                          |

|                                                                결제                                                                 |                                                                찜하기                                                                |
|:---------------------------------------------------------------------------------------------------------------------------------:|:---------------------------------------------------------------------------------------------------------------------------------:|
| <img width="380" src="https://github.com/Step3-kakao-tech-campus/Team5_FE/assets/104095041/1a03508c-5e5a-43c1-a367-3a8a82f92dcb"> | <img width="380" src="https://github.com/Step3-kakao-tech-campus/Team5_FE/assets/104095041/452e1f91-7115-46f2-83de-7e0e007fce99"> |
|                                           • Toss Payments 연동 <br> • 결제 완료 시 유저 등급 업그레이드                                           |                                       • 관심 플래너를 찜하기 등록/해제 가능 <br> • 마이페이지에서 찜한 플래너 목록 조회 가능                                       |

<br>

## 🛠️개발 주안점

### 📌 커서 기반 페이지네이션으로 구현한 무한스크롤

**사용자에게 끊김 없는 탐색 경험을 제공하고, 포트폴리오 수정/삭제로 인한 중복·누락 문제를 해결하고자 커서 기반 페이지네이션을 도입했습니다.**

- `offset` 기반 페이징은 데이터 변경 시 중복 또는 누락 발생 가능성 존재
- `cursor` 방식은 `lastId` 기준으로 고정된 커서를 사용 → **데이터 일관성 유지**
- `React Query` + `Intersection Observer` 조합으로 무한 스크롤 구현

<br>

### 📌 역방향 무한스크롤을 활용한 채팅 히스토리 로딩

**채팅 대화의 맥락을 끊김 없이 유지하고 사용자 경험을 향상시키기 위해 역방향 무한스크롤 패턴을 적용했습니다.**

- 페이지 초기 로딩 시 최신 메시지부터 표시하고 하단으로 자동 스크롤
- `IntersectionObserver` 활용으로 상단 스크롤 시 자동으로 이전 메시지 페칭
- 스크롤 포지션 복원 기술로 새 메시지 로딩 후에도 읽던 위치 유지
- 컨텐츠가 화면 높이보다 작을 경우 자동으로 추가 데이터 로드하여 화면 채움
- `STOMP WebSocket` 연결로 실시간 메시지 수신 및 중복 메시지 필터링

<br>

### 📌 모바일 사용자 경험 강화를 위한 PWA 지원

**웹과 앱의 장점을 결합한 PWA를 통해 모바일 환경에서도 네이티브 앱 수준의 사용자 경험을 제공합니다.**

- 홈 화면 바로가기, 전체화면 모드, 오프라인 캐시 기능 제공
- 별도의 앱 설치 없이 모바일 브라우저에서 앱처럼 사용 가능
- 다양한 디바이스와 브라우저 환경에서 일관된 UX 보장

<br>

### 📌 재사용성과 커스터마이징을 고려한 예외 처리 시스템

**도메인에 맞는 세부적인 예외 처리를 우선하고, 처리되지 않은 예외는 공통 핸들러로 넘기는 구조를 설계했습니다.**

- 프론트/백엔드 공통 에러 코드 정의 및 명세 문서화
- `axios` 인터셉터 대신 컴포넌트 단에서 먼저 예외 처리 → **세밀한 UI 대응 가능**
- 처리되지 않은 예외는 `useDefaultErrorHandler`로 Fallback 처리

<br>

### 📌 클라이언트 이미지 압축 & S3 업로드 최적화

**업로드 성능 개선과 서버 부하 감소를 위해, 클라이언트에서 이미지 압축 후 S3로 직접 전송하는 방식을 적용했습니다.**

- `compressorjs` 사용으로 업로드 전 이미지 용량 최소화
- 압축 예시 (이미지 종류에 따라 약 10~100배 압축 가능)
  - 📷 50.86KB → ✅ 2.73KB
  - 📷 2306.52KB → ✅ 51.24KB
- 압축 후 `multipart/form-data` 방식으로 AWS S3 업로드

<br>

### 📌 새로고침 & 뒤로가기 방지 커스텀 훅

**작성 중인 데이터를 실수로 날리는 상황을 방지하기 위해, 브라우저 이벤트를 제어하는 커스텀 훅을 구현했습니다.**

- 포트폴리오/리뷰/견적서 작성 중 새로고침 또는 뒤로가기 시 경고창 표시
- `usePreventRefresh`, `usePreventGoback` 훅을 통해 브라우저 이벤트 차단
- 자동 저장 기능 없이도 사용자 입력 보호

<br>

### 📌 공통 UI 처리를 위한 Global BottomSheet 도입

**에러/알림 메시지를 통합적으로 보여주는 UI로 BottomSheet를 전역 컴포넌트로 구현했습니다.**

- 상태는 `Redux`로 전역 관리, 컴포넌트 어디서든 호출 가능
- `useOpenBottomSheet` 커스텀 훅으로 열기/닫기 제어
- 로그인, 탈퇴, 서버 에러 등 다양한 케이스에 재사용

|                                                              회원탈퇴 바텀시트                                                              |                                                        로그인 바텀시트                                                         |                                                              서버에러 바텀시트                                                              |
|:-----------------------------------------------------------------------------------------------------------------------------------:|:-----------------------------------------------------------------------------------------------------------------------:|:-----------------------------------------------------------------------------------------------------------------------------------:|
|  <img width="200" src="https://github.com/Step3-kakao-tech-campus/Team5_FE/assets/104095041/9f71665a-8826-4d3c-a7d7-ca50b0c8719f">  |  <img width="200" alt="Image" src="https://github.com/user-attachments/assets/151f0658-44cc-4fd4-8c11-ed758b0ae6cb" />  |  <img width="200" src="https://github.com/Step3-kakao-tech-campus/Team5_FE/assets/104095041/b7c8217c-8161-4cfb-89e0-521c2afc9a49">  |

<br>

## 🗂 폴더 구조

```
├───📂public
│   ├───📂icons
│   └───📂images
└───📂src
    ├───📂apis
    ├───📂assets
    ├───📂components
    │   ├───📁chat
    │   ├───📁common
    │   ├───📁createportfolio
    │   ├───📁favorite
    │   ├───📁main
    │   ├───📁portfoliodetail
    │   ├───📁portfolios
    │   ├───📁profile
    │   ├───📁quotation
    │   └───📁review
    ├───📂hooks
    ├───📂layouts
    ├───📂pages
    ├───📂store
    └───📂utils
```

<br>

## ⚙️ 시작 가이드

> **Requirements: Node.js 18.x, npm 10.x**

1. 프로젝트 클론

    ```bash
    git clone https://github.com/kimchanho97/sunsuwedding_FE.git
    cd sunsuwedding_FE
    ```

2. 실행

    ```bash
    npm install
    npm start
    ```

<br>

## 🧰 기술 스택

![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Redux](https://img.shields.io/badge/Redux-764ABC?style=flat-square&logo=Redux&logoColor=white)
![Redux Persist](https://img.shields.io/badge/Redux_Persist-764ABC?style=flat-square&logo=Redux&logoColor=white)
![MUI](https://img.shields.io/badge/Material%20UI-007FFF?style=flat-square&logo=mui&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=Axios&logoColor=white)
<br>
![React Query](https://img.shields.io/badge/React_Query-FF4154?style=flat-square&logo=React-Query&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat-square&logo=React-Router&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=flat-square&logo=prettier&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=white)
![Lodash](https://img.shields.io/badge/Lodash-3492FF?style=flat-square&logo=Lodash&logoColor=white)
<br>