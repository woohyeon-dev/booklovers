import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import db from './models';

// routes
import { createProxyMiddleware } from 'http-proxy-middleware';
import authRouter from './routes/auth';

const app = express();

// dotenv 실행 (dotenv를 통해 SECRET KEY를 받는 코드보다 위에 위치해야한다.)
dotenv.config();

app.set('port', process.env.PORT || 9090); // 포트 설정

app.use(morgan('dev')); // 개발모드로 로깅

// 클라이언트에서 보내준 데이터를 json으로 파싱해서 req.body에 데이터를 넣어주는 역할
app.use(express.json({ limit: '10mb' }));

// cookieParser 설정에 비밀키를 넣어주자.
// cookieParser를 사용하게되면 req.cookies로 접근이 가능하다.
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(express.static(path.join(__dirname, '../../client/build'))); // Express에서 이미지, CSS 파일 및 JavaScript 파일과 같은 정적 파일을 제공

app.use('/img', express.static('src/uploads'));

app.use(
  createProxyMiddleware('/api', {
    target: 'https://openapi.naver.com',
    changeOrigin: true,
    // 하단 처리는 필수로 해주어야 한다. 아래의 내용이 없으면 url 경로에
    // api가 추가되어 경로를 찾을 수 없어진다.
    pathRewrite: {
      '^/api/': '/',
    },
  })
);

app.use('/auth', authRouter);

app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});

// Error handler middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res
    .status(err.status || 500)
    .json({ msg: 'The server encountered an error.' });
});

app.listen(app.get('port'), async () => {
  console.log('listening on', app.get('port'));

  // sequelize db 연결
  try {
    await db.sequelize.sync({ force: false });
    console.log('database connect');
  } catch (error) {
    console.error(error);
  }
});
