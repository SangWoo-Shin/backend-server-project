FROM node:18

# 작업 디렉토리 설정
WORKDIR /app

# 의존성 복사 및 설치
COPY package*.json ./
RUN npm install 

# 주요 의존성 설치
RUN npm install nest \
    npm install @nestjs/mongoose \
    npm install @nestjs/config \
    npm install class-validator \
    npm install bcrypt \
    npm install class-transformer \
    npm install @nestjs/jwt @nestjs/passport passport passport-jwt \
    pm install -D @types/passport-jwt \
    npm install --save @nestjs/swagger swagger-ui-express 
 
# 소스 복사
COPY . .

# 빌드
RUN npm run build

# 포트 오픈
EXPOSE 3002

# 서버 실행
CMD ["node", "dist/main"]