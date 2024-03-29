import { DataTypes, CreationOptional, Model } from 'sequelize';

interface UsersAttributes {
  idx?: number;
  email: string;
  password: string;
  photo?: string;
  nickname: string;
  birthday?: Date;
  gender?: string;
  refresh_token?: string;
}

export default class Users extends Model<UsersAttributes> {
  public readonly idx!: number;
  public email!: string;
  public password!: string;
  public photo?: string;
  public nickname!: string;
  public birthday?: Date;
  public gender?: string;
  public refresh_token?: string;

  // timestamps!
  // createdAt can be undefined during creation
  declare readonly createdAt: CreationOptional<Date>;
  // updatedAt can be undefined during creation
  declare readonly deletedAt: CreationOptional<Date>;

  static initialize(sequelize: any) {
    return this.init(
      {
        idx: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        email: {
          type: DataTypes.STRING(50),
          allowNull: false,
          validate: {
            notNull: true,
            isEmail: true,
          },
        },
        password: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        photo: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        nickname: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        birthday: {
          type: DataTypes.DATEONLY, // DATE without time.
          allowNull: true,
        },
        gender: {
          type: DataTypes.STRING(10),
          allowNull: true,
        },
        refresh_token: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
      },
      {
        sequelize, // passing the `sequelize` instance is required
        modelName: 'users',
        tableName: 'Users',
        timestamps: true, // createAt & updateAt 활성화
        paranoid: true, // timestamps 가 활성화 되어야 사용 가능 > deleteAt 옵션 on
        updatedAt: false,
        freezeTableName: true,
      }
    );
  }

  static associate(db: any) {
    this.hasMany(db.BookLikes, {
      sourceKey: 'idx',
      foreignKey: 'userId',
    });
  }
}
