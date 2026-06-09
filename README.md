<div align="center">

<img src="https://github.com/user-attachments/assets/324bbab6-8bc8-4105-aaf4-e0c9806a2e12" alt="수거의 달인" width="400" />

> AI 기반 쓰레기 분류 학습과 3D 섬 건설 게임을 결합한 환경 교육 웹앱

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-0.184-000000?style=flat-square&logo=three.js)](https://threejs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)

</div>

---

## 📸 화면 구성

|                                                게임 메인                                                 |                                                   랭킹                                                   |                                                   상점                                                   |                                                   촬영                                                   |
| :------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/user-attachments/assets/58df6c74-51d4-443c-abd8-007666ee0ea2" width="160"/> | <img src="https://github.com/user-attachments/assets/da526338-0f47-47a8-b293-e30c2d943e63" width="160"/> | <img src="https://github.com/user-attachments/assets/c225b682-2394-4a15-bd0f-743951a38ea6" width="160"/> | <img src="https://github.com/user-attachments/assets/5a748f5d-ab49-4016-ab2c-450c4d51b58b" width="160"/> |
|                                                **바구니**                                                |                                              **분석 목록**                                               |                                              **분석 상세**                                               |                                                 **퀴즈**                                                 |
| <img src="https://github.com/user-attachments/assets/340bb252-085c-4ebf-84fc-15e202a04773" width="160"/> | <img src="https://github.com/user-attachments/assets/96ee66a2-599f-4241-a0a9-6480091ee7f7" width="160"/> | <img src="https://github.com/user-attachments/assets/d290056e-9956-4fe4-9aa1-213950d4319a" width="160"/> | <img src="https://github.com/user-attachments/assets/6487e5a3-0ce7-41a9-b43a-9e10dc8ccfbd" width="160"/> |

---

## ✨ 주요 기능

- **AI 쓰레기 분석** — 카메라로 촬영한 쓰레기를 ML 모델이 분류, 결과 그리드로 표시 (무한 스크롤)
- **분리배출 교육** — 유형별 배출 방법 안내 → 체크리스트 → 타이머 기반 퀴즈 → 보상 지급
- **3D 섬 건설** — Three.js 기반 인터랙티브 섬에 건물 배치·수확·이동 시스템
- **포인트 상점** — 퀴즈로 획득한 조개(Shell)·젬(Gem)으로 건물·장식 구매
- **지역 랭킹** — 시도별 리더보드, 인터랙티브 한반도 지도로 지역 선택

---

## 🏗️ 아키텍처

```
┌───────────────────────────────────────────────┐
│                   Browser                     │
│                                               │
│  ┌────────────────┐  ┌─────────────────────┐  │
│  │  3D Engine     │  │   App UI Layer      │  │
│  │  Three.js      │  │  styled-components  │  │
│  │  R3F / Drei    │  │  react-router v7    │  │
│  └────────────────┘  └─────────────────────┘  │
│  ┌──────────────────────────────────────────┐ │
│  │           State Management               │ │
│  │  TanStack Query — 서버 캐싱 / 무한 스크롤     │ │
│  │  Zustand        — 모달     / 편집 상태      │ │
│  └──────────────────────────────────────────┘ │
│  ┌──────────────────────────────────────────┐ │
│  │         API Layer  (Axios + Zod)         │ │
│  └──────────────────┬─────────────────────-─┘ │
└─────────────────────┼─────────────────────────┘
                      │ HTTP (withCredentials)
             ┌────────▼────────┐
             │   Backend API   │
             │  :8080          │
             └─────────────────┘
```

---

## 🛠️ 기술 스택

| 분류      | 기술                                           |
| --------- | ---------------------------------------------- |
| Framework | React, TypeScript, Vite                        |
| 3D        | Three.js, React Three Fiber, @react-three/drei |
| 상태 관리 | TanStack Query, Zustand                        |
| 통신      | Axios, Zod                                     |
| 스타일    | styled-components                              |
| 인증      | Kakao OAuth 2.0                                |
| 인프라    | Docker, Nginx, Jenkins                         |
| 코드 품질 | ESLint, Prettier, Husky + lint-staged          |

---

> 전체 시스템 아키텍처 및 팀 구성은 [수달 Organization README](https://github.com/sudal-kgu)를 참고해주세요.

## 🚀 시작하기

```bash
git clone <repository-url>
cd client
npm ci
npm run dev   # http://localhost:3000
```

---

## 🔐 환경 변수

```env
VITE_API_BASE_URL="http://localhost:8080"
VITE_KAKAO_CLIENT_ID="your_kakao_client_id"
VITE_KAKAO_REDIRECT_URI="http://localhost:3000/kakao/redirect"
```

---

## 🐳 배포

- Jenkins Credentials(`fe-env`)에 `.env` 파일을 Secret File로 등록
- `docker-compose.yml`의 `IMAGE_NAME`, `CONTAINER_NAME`, `FE_WEB_NGINX_PORT`는 Jenkins 환경 변수로 주입

---

## 📁 디렉토리 구조

```
src/
├── api/
│   ├── hooks/        # TanStack Query 커스텀 훅 (13개)
│   └── types.ts      # 전체 API 응답 인터페이스
├── components/
│   ├── island/       # 3D 씬 (건물, 나무, 지형, 모달)
│   ├── game/         # 게임 HUD (화폐 바, 레벨, 편집 모드)
│   ├── quiz/         # 타이머, 진행 바
│   └── common/       # Header, Modal, Spinner
├── pages/            # 라우트 1:1 매핑 (12개)
├── hooks/
│   └── store/        # Zustand 스토어 (모달 8종)
└── utils/            # 순수 유틸 함수
```

---

## 👥 팀원

| 이름       | 역할                                                 |
| ---------- | ---------------------------------------------------- |
| **손유관** | 프론트엔드 전반 (3D 섬, 분석, 상점, 랭킹, 인프라 등) |
| **염수민** | 퀴즈 기능 MVP                                        |
| **염지은** | 체크리스트, UI/UX 디자인                             |
