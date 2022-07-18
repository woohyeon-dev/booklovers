import { Model, DataTypes } from 'sequelize';
import db from './index';
interface UserAttributes {
  username: string;
  email: string;
  password: string;
  nickname?: string;
  age?: string;
  sex?: string;
}

class User extends Model<UserAttributes> {
  public username!: string;
  public email!: string;
  public password!: string;
  public nickname?: string;
  public age?: string;
  public sex?: string;
}

User.init(
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
      defaultValue: 'Unnamed',
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    sex: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    sequelize: db.sequelize,
    modelName: 'users',
    tableName: 'Users',
    timestamps: true, // createAt & updateAt 활성화
    paranoid: true, // timestamps 가 활성화 되어야 사용 가능 > deleteAt 옵션 on
    updatedAt: false,
    freezeTableName: true,
  }
);

export default User;
