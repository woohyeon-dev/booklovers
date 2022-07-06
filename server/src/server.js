const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');
const morgan = require('morgan');
const dotenv = require('dotenv');

const app = express();

// dotenv 실행 (dotenv를 통해 SECRET KEY를 받는 코드보다 위에 위치해야한다.)
dotenv.config();

app.set('port', process.env.PORT || 9090); // 포트 설정

app.use(morgan('dev')); // 개발모드로 로깅

app.use(express.static(path.join(__dirname, '../../client/build'))); // Express에서 이미지, CSS 파일 및 JavaScript 파일과 같은 정적 파일을 제공

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});

app.listen(app.get('port'), () => {
  console.log('listening on', app.get('port'));
});
