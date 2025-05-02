# pedometer

[과제 제약사항]
- 객체 생성 : ERD의 테이블을 class로 만들 것
- 구조 : Controller - Service - Repository - Model
- 한 메서드당 최대 15자 라인까지만 가능
- google typescript convention에 맞춰서 할 것
- 가능하다면 ORM사용할 것(Prisma, TypeORM)


📦 src
├── 📁 config               # 환경설정 및 DB 연결
│   └── data-source.ts     # TypeORM 설정 및 연결 파일
├── 📁 models             # TypeORM Entity 정의
│   ├── 
│   ├── User.ts
│   ├── Step.ts
│   ├── Goal.ts
│   └── Friend.ts
├── 📁 controllers          # 라우터에서 사용할 로직 처리
│   ├── stepController.ts
│   ├── goalController.ts
│   ├── friendController.ts
│   └── authController.ts
├── 📁 routes               # 각 기능별 라우터
│   ├── stepRoutes.ts
│   ├── goalRoutes.ts
│   ├── friendRoutes.ts
│   └── authRoutes.ts
├── 📁 middlewares          # 인증, 에러 처리 등 공통 미들웨어
│   └── auth.ts            # JWT 인증 미들웨어
├── 📁 services            # 비즈니스 로직 처리 (선택 사항)
│   └── stepService.ts     # 복잡한 로직 분리 시
├── 📁 types  
│   └── index.ts           # 인터페이스 저장
├── 📁 utils                # 유틸 함수들 (예: 날짜 처리 등)
│   └── date.ts
├── app.ts                 # Express 앱 설정
└── server.ts              # 서버 실행 (포트 연결 등)
