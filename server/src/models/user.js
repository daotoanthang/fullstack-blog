const db = require("./index");

("use strict");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // add
      User.hasMany(models.Post, { foreignKey: "userId" });
    }
  }
  User.init(
    {
      avatar: DataTypes.STRING,
      email: DataTypes.STRING,
      fullname: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  return User;
};
