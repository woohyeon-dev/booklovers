import { DataTypes, ForeignKey, Model } from 'sequelize';

interface BookLikesAttributes {
  idx?: number;
  bookId: number;
  userId: number;
}

interface JoinBooksAttributes {
  image?: string;
  title?: string;
}
export default class BookLikes extends Model<BookLikesAttributes> {
  public readonly idx!: number;
  public bookId!: ForeignKey<number>;
  public userId!: ForeignKey<number>;
  public book?: JoinBooksAttributes;

  static initialize(sequelize: any) {
    return this.init(
      {
        idx: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        bookId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize, // passing the `sequelize` instance is required
        modelName: 'bookLikes',
        tableName: 'BookLikes',
        freezeTableName: true,
        timestamps: false,
        updatedAt: false,
      }
    );
  }

  static associate(db: any) {
    this.belongsTo(db.Users, {
      foreignKey: 'userId',
      targetKey: 'idx',
    });
    this.belongsTo(db.Books, {
      foreignKey: 'bookId',
      targetKey: 'idx',
    });
  }
}
