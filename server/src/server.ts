import express, { Request, Response } from 'express';
import path from 'path';
import morgan from 'morgan';
import dotenv from 'dotenv';
import db from '../db/models';

const app = express();

// dotenv 실행 (dotenv를 통해 SECRET KEY를 받는 코드보다 위에 위치해야한다.)
dotenv.config();

app.set('port', process.env.PORT || 9090); // 포트 설정

app.use(morgan('dev')); // 개발모드로 로깅

app.use(express.static(path.join(__dirname, '../../client/build'))); // Express에서 이미지, CSS 파일 및 JavaScript 파일과 같은 정적 파일을 제공

app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});

app.listen(app.get('port'), async () => {
  console.log('listening on', app.get('port'));

  // sequelize db 연결
  try {
    await db.sequelize.sync({ force: true });
    console.log('database connect');
  } catch (error) {
    console.error(error);
  }
});
