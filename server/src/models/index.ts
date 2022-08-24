'use strict';
import Sequelize from 'sequelize';
import Users from './Users';
import Books from './Books';
import BookLikes from './BookLikes';
// 환경변수, 실제 배포할 때는 'production'으로 바꿔야한다
const env = process.env.NODE_ENV || 'development';
// config
import { config } from '../config/config';

const currentConfig = config[env];

// db 객체 생성
const db: any = {};

// 시퀄라이즈 객체에 config 파일에 있는 설정들을 넣어준다
let sequelize = new Sequelize.Sequelize(
  currentConfig.database,
  currentConfig.username,
  currentConfig.password,
  currentConfig
);

// db 객체에 시퀄라이즈 패키지와 객체를 넣고 모듈로 사용한다.
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Users = Users;
db.Books = Books;
db.BookLikes = BookLikes;

Users.initialize(sequelize);
Books.initialize(sequelize);
BookLikes.initialize(sequelize);

Users.associate(db);
Books.associate(db);
BookLikes.associate(db);

export default db;
