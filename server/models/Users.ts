import { Model, DataTypes, Sequelize, CreationOptional } from 'sequelize';
import db from './index';

interface UserAttributes {
  username: string;
  email: string;
  password: string;
  nickname?: string;
  birthday?: Date;
  sex?: string;
  refresh_token?: string;
}

class Users extends Model<UserAttributes> {
  public username!: string;
  public email!: string;
  public password!: string;
  public nickname?: string;
  public birthday?: Date;
  public sex?: string;
  public refresh_token?: string;

  // timestamps!
  // createdAt can be undefined during creation
  declare readonly createdAt: CreationOptional<Date>;
  // updatedAt can be undefined during creation
  declare readonly deletedAt: CreationOptional<Date>;
}

Users.init(
  {
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true,
      validate: {
        notNull: true,
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    nickname: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    birthday: {
      type: DataTypes.DATEONLY, // DATE without time.
      allowNull: true,
    },
    sex: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    refresh_token: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize: db.sequelize, // passing the `sequelize` instance is required
    modelName: 'users',
    tableName: 'Users',
    timestamps: true, // createAt & updateAt 활성화
    paranoid: true, // timestamps 가 활성화 되어야 사용 가능 > deleteAt 옵션 on
    updatedAt: false,
    freezeTableName: true,
  }
);

export default Users;
