const db = require("./index");
("use strict");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User, { foreignKey: "userId" });
      Post.belongsTo(models.Category, { foreignKey: "categoryId" });
    }
  }
  Post.init(
    {
      categoryId: DataTypes.STRING,
      userId: DataTypes.STRING,
      title: DataTypes.STRING,
      slug: DataTypes.STRING,
      image: DataTypes.STRING,
      content: DataTypes.TEXT,
      status: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  /// add

  return Post;
};
