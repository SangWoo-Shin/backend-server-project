🎯 이벤트 / 보상 관리 플랫폼 - 백엔드 과제

📌 프로젝트 개요
이 프로젝트는 NestJS, MongoDB, JWT, Docker를 활용하여 구축된 이벤트/보상 관리 시스템입니다. 인증 및 역할 기반 권한 제어를 포함한 구조로, 실제 서비스 환경을 고려하여 MSA 아키텍처 기반으로 설계되었습니다.

🧱 기술 스택
항목	사용 기술
Language	TypeScript
Framework	NestJS
Database	MongoDB (Mongoose)
Auth	JWT, Passport, Role-based Guard
Containerization	Docker, docker-compose
Docs	Swagger (OpenAPI)

⚙️ 서버 구조 (MSA 기반)
서버	역할
Gateway Server (3002)	모든 API 요청 진입점, 인증 및 권한 검사, 각 서버로 라우팅
Auth Server (3001)	회원가입, 로그인, JWT 발급, 유저 역할 관리
Event Server (3000)	이벤트 등록/조회/비활성화, 보상 등록/조회, 보상 요청/승인 관리

✅ 구현된 기능
🧑‍💻 Auth Server
* 회원가입 (USER로 기본 등록)
* 로그인 (JWT 발급)
* 유저 정보 조회 (본인 또는 관리자 전용)
* 유저 권한 변경 (ADMIN 전용)
🎉 Event 기능
* 이벤트 생성 (ADMIN, OPERATOR)
* 이벤트 전체/단건 조회 (ADMIN, OPERATOR, AUDITOR)
* 이벤트 비활성화 (ADMIN, OPERATOR)
🏆 Reward 기능
* 보상 생성 (ADMIN, OPERATOR)
* 전체 보상 목록 조회 (모든 권한자)
* 이벤트별 보상 조회 / 보상 ID로 조회
🎁 Reward Request 기능
* 보상 요청 (USER)
* 본인 요청 내역 조회 (USER)
* 전체 요청 내역 조회 (ADMIN, OPERATOR, AUDITOR)
* 요청 상태 변경 (ADMIN, OPERATOR)

🛡️ 인증 및 권한 시스템
* JWT 기반 인증
* Passport + @UseGuards(JwtAuthGuard, RolesGuard)
* 데코레이터 기반 권한 분기: @Roles('ADMIN'), @Roles('USER', 'OPERATOR') 등
* Gateway에서 인증 후 다른 서비스로 프록시 요청 시 토큰 전달

📦 실행 방법 (Docker 기반)
1. .env 설정 (루트 및 각 서비스)
JWT_SECRET=jwt-secret-key
MONGO_URI=mongodb+srv://sdu0333:abcd1234@usercluster.wnu7sub.mongodb.net/mydb?retryWrites=true&w=majority
2. 도커 실행
docker-compose up --build
3. Swagger 문서
* Gateway: http://localhost:3002/api-docs
* Auth: http://localhost:3001/api-docs
* Event: http://localhost:3000/api-docs

📁 폴더 구조 (예시)
├── gateway_server
│   ├── src
│   │   ├── auth
│   │   ├── proxy
│   │   ├── dto
│   │   └── main.ts
├── auth_server
│   ├── src
│   │   ├── auth
│   │   ├── user
│   │   └── main.ts
├── event_server
│   ├── src
│   │   ├── auth
│   │   ├── reward
│   │   ├── reward-request
│   │   ├── event
│   │   └── main.ts

📌 참고 사항
* 조건 검증 로직은 간단한 상수 기반으로 가정 (ex: "로그인 1시간 이상")
* 삭제 API는 제공하지 않으며, isActive 플래그를 통해 비활성화 처리
* 토큰 검증은 Gateway 및 각 서비스에서 수행됨, 역할에 따라 접근 제한

💬 설계 의도
* 실무에서 사용되는 MSA + JWT + Role 기반 접근 제어 학습 목적
* 모든 요청은 Gateway를 통해 라우팅되며, 인증/권한은 공통 처리
* 유지보수성과 확장성을 고려한 서비스 분리 및 유틸 함수화

🧪 향후 확장 아이디어 (선택 구현 가능)
* 유저 활동 로그 저장
* 이벤트 조건 자동 평가 (배치 또는 트리거)
* Admin Panel 기반 보상 지급
* Kafka 기반 이벤트 큐 연동
