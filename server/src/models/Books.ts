import { DataTypes, Model } from 'sequelize';

interface BooksAttributes {
  idx?: number;
  isbn: string;
  image?: string;
  title?: string;
  likesCount?: number;
}

export default class Books extends Model<BooksAttributes> {
  public readonly idx!: number;
  public isbn!: string;
  public image?: string; // 썸네일 이미지의 URL, 이미지가 있는 경우만
  public title?: string; // 검색 결과 문서의 제목, 제목에서 검색어와 일치하는 부분은 태그로 감싸져 있다.
  public likesCount?: number;

  static initialize(sequelize: any) {
    return this.init(
      {
        idx: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        isbn: {
          type: DataTypes.STRING(30),
          allowNull: false,
        },
        image: {
          type: DataTypes.STRING(200),
          allowNull: false,
        },
        title: {
          type: DataTypes.STRING(200),
          allowNull: false,
        },
        likesCount: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
      },
      {
        sequelize, // passing the `sequelize` instance is required
        modelName: 'books',
        tableName: 'Books',
        freezeTableName: true,
        timestamps: false,
        updatedAt: false,
      }
    );
  }

  static associate(db: any) {
    this.hasMany(db.BookLikes, {
      sourceKey: 'idx',
      foreignKey: 'bookId',
    });
  }
}
