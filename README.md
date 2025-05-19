# 🎯 이벤트 / 보상 관리 플랫폼 - 백엔드 과제

## 📌 프로젝트 개요
NestJS, MongoDB, JWT, Docker를 활용한 이벤트/보상 관리 시스템입니다. 인증 및 역할 기반 권한 제어를 포함한 MSA 아키텍처 구조로 구성되었습니다.

---

## 🧱 기술 스택

| 항목         | 사용 기술               |
|--------------|------------------------|
| Language     | TypeScript             |
| Framework    | NestJS                 |
| Database     | MongoDB (Mongoose)     |
| Auth         | JWT, Passport, Guards  |
| Docs         | Swagger (OpenAPI)      |
| Container    | Docker, docker-compose |

---

## ⚙️ 서버 구조 (MSA 기반)

| 서버 이름        | 역할 설명                                     |
|------------------|----------------------------------------------|
| Gateway Server   | 모든 API 요청 진입점, 인증/권한 검사 및 라우팅 |
| Auth Server      | 회원가입, 로그인, JWT 발급, 유저 권한 관리     |
| Event Server     | 이벤트, 보상, 보상 요청 CRUD 및 상태 관리       |

---

## ✅ 구현 기능 요약

### 🧑‍💻 Auth 기능
- 회원가입 (USER로 기본 등록)
- 로그인 (JWT 발급)
- 유저 정보 조회 (본인 or 관리자)
- 유저 권한 변경 (ADMIN 전용)

### 🎉 Event 기능
- 이벤트 생성 (ADMIN, OPERATOR)
- 전체 / 단일 이벤트 조회 (ADMIN, OPERATOR, AUDITOR)
- 이벤트 비활성화 (ADMIN, OPERATOR)

### 🏆 Reward 기능
- 보상 생성 (ADMIN, OPERATOR)
- 전체 보상 목록 / 이벤트별 보상 조회
- 보상 단일 조회

### 🎁 Reward Request 기능
- 보상 요청 (USER)
- 본인 요청 내역 조회 (USER)
- 전체 요청 내역 조회 (ADMIN, OPERATOR, AUDITOR)
- 요청 상태 변경 (ADMIN, OPERATOR)

---

## 🛡️ 인증 및 권한 시스템

- JWT 기반 인증 (Passport 사용)
- `@UseGuards(JwtAuthGuard, RolesGuard)`
- `@Roles('ADMIN')` 등으로 역할 제한
- Gateway에서 인증 → 각 서비스로 토큰 전달

---

## 📦 실행 방법 (Docker 기반)

1. 각 서비스 디렉토리에 `.env` 파일을 설정합니다.
    #### 📍 auth_server/.env
    ```env
    MONGODB_URI=mongodb://mongo:27017/mydb
    ```
    #### 📍 event_server/.env
    ```env
    AUTH_SERVER_URL=http://auth-server:3001
    MONGODB_URI=mongodb://mongo:27017/mydb
    ```
    #### 📍 gateway_server/.env.docker
    ```env.docker
    AUTH_BASE_URL=http://auth-server:3001
    EVENT_BASE_URL=http://event-server:3000
    ```
    
2. Docker 실행
    ```bash
    docker-compose up --build
    ```
    
---

## 🧪 초기 더미 데이터 (샘플 계정 및 리소스)

### 👤 유저 목록

| 이메일                 | 비밀번호             | 역할         |
|----------------------|--------------------|-------------|
| admin@nexon.com      | Admin123!          | ADMIN       |
| user@nexon.com       | User123!           | USER        |
| auditor@nexon.com    | Auditor123!        | AUDITOR     |
| operator@nexon.com   | Operator123!       | OPERATOR    |

### 📅 이벤트 목록

| 제목                  | 조건 키              | 기간                     | 상태   |
|----------------------|--------------------|-------------------------|-------|
| 7일 연속 로그인          | login_7_days       | 2025-05-01 ~ 2025-06-01 | 활성화  | 
| 버닝 타임! 경험치 2배     | exp_double_event   | 2025-06-10 ~ 2025-06-30 | 활성화  | 
| 추석맞이 한정판 스킨 지급   | login_once_chuseok | 2025-09-05 ~ 2025-09-15 | 비활성화 | 

### 🎁 보상 목록

| 이름                  | 타입        | 수량  | 연동 이벤트(ID)                           |
|----------------------|------------|------|----------------------------------------|
| 7일 출석 기념 선물 상자   | 아이템 상자   | 1    | 682abbddee9c6e2597fd0342 (7일 연속 로그인) |
| 버닝 부스터 포션         | 버프 아이템   | 3    | 682abc7dee9c6e2597fd0344 (버닝 타임)      |
| 한정판 코스튬 뽑기권      | 뽑기 쿠폰     | 1    | 682abc8bee9c6e2597fd0346 (추석맞이)       |

---

## 📖 Swagger 문서 확인

| 서비스         | 포트          | Swagger 주소                    |
|--------------|--------------|--------------------------------|
| Gateway      | 3002         | http://localhost:3002/api-docs |
| Auth         | 3001         | http://localhost:3001/api-docs |
| Event        | 3000         | http://localhost:3000/api-docs |

## 📘 Swagger 문서 미리보기

#### 🔐 Auth 서버
![auth-swagger](./assets/Swagger-auth.png)

#### 🎉 Event 서버
![event-swagger](./assets/Swagger-event.png)

#### 🌐 Gateway 서버
![gateway-swagger](./assets/Swagger-gateway.png)

---


## 📁 폴더 구조 예시

```bash
├── gateway_server
│   └── src
│       ├── auth
│       ├── proxy
│       ├── dto
│       ├── Dockerfile
│       └── main.ts
├── auth_server
│   └── src
│       ├── auth
│       ├── user
│       ├── Dockerfile
│       └── main.ts
├── event_server
│   └── src
│       ├── auth
│       ├── reward
│       ├── reward-request
│       ├── event
│       ├── Dockerfile
│       └── main.ts
├──  Docker-compose.yml
```

---

## 🧪 테스트 코드 작성

- 핵심 로직에 대해 단위 테스트를 작성하여 서비스의 안정성을 확보했습니다.
- NestJS의 `@nestjs/testing`과 Jest를 활용해 `RewardRequestService`의 예외 처리 로직을 검증했습니다.

### ✅ 테스트 대상

| 테스트 항목 | 설명 |
|-------------|------|
| 이벤트 기간 외 요청 | 유효하지 않은 시점에 보상 요청 시 `BadRequestException` 발생 |
| 중복 보상 요청 | 동일 유저가 동일 이벤트/보상에 대해 중복 요청 시 `ConflictException` 발생 |

### ✅ 테스트 결과

```bash
 PASS  src/reward_request/reward-request.service.spec.ts
  RewardRequestService
    ✓ 기한 만료되면 BadRequestException 에러를 나타낼 것 (9 ms)
    ✓ 이미 중복 요청된 건은 ConflictException 에러를 나타낼 것 (1 ms)

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
```
___

## 📌 참고 사항
- 조건 검증 로직은 간단한 예시 수준입니다 (ex: 로그인 1시간 이상)
- 삭제 API는 구현하지 않고 `isActive`를 통한 비활성화 처리
- 각 서비스는 독립된 Swagger 문서를 통해 확인 가능
