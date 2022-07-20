'use strict';

import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';

// 환경변수, 실제 배포할 때는 'production'으로 바꿔야한다
const env = process.env.NODE_ENV || 'development';
// config
import { config } from '../config/config';

const currentConfig = config[env];

// db 객체 생성
const db: any = {};

// 시퀄라이즈 객체에 config 파일에 있는 설정들을 넣어준다
let sequelize: {};
if (currentConfig.use_env_variable) {
  sequelize = new Sequelize.Sequelize(currentConfig);
} else {
  sequelize = new Sequelize.Sequelize(
    currentConfig.database,
    currentConfig.username,
    currentConfig.password,
    currentConfig
  );
}

fs.readdirSync(__dirname)
  .filter((file: string) => {
    return (
      file.indexOf('.') !== 0 && file !== 'index.ts' && file.slice(-3) === '.ts'
    );
  })
  .forEach(async (file: string) => {
    const { default: model } = await import(path.join(__dirname, file));
    console.log(model);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].init) {
    db[modelName].init(sequelize);
  }
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// db 객체에 시퀄라이즈 패키지와 객체를 넣고 모듈로 사용한다.
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
