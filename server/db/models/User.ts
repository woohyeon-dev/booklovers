import { DataTypes, Sequelize } from 'sequelize';

export default (sequelize: Sequelize) => {
  const Users = sequelize.define(
    'user',
    {
      name: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(45),
        allowNull: false,
        primaryKey: true,
        validate: {
          notNull: true,
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      nickname: {
        type: DataTypes.STRING(45),
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
      modelName: 'users',
      tableName: 'Users',
      timestamps: true, // createAt & updateAt 활성화
      paranoid: true, // timestamps 가 활성화 되어야 사용 가능 > deleteAt 옵션 on
      updatedAt: false,
      freezeTableName: true,
    }
  );

  return Users;
};
