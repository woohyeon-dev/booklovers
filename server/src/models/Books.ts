import { DataTypes, Model } from 'sequelize';

interface BooksAttributes {
  idx?: number;
  isbn: number;
  likeCount?: number;
}

export default class Books extends Model<BooksAttributes> {
  public readonly idx!: number;
  public isbn!: number;
  public likeCount?: number;

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
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        likeCount: {
          type: DataTypes.INTEGER,
          allowNull: true,
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
