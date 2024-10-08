const { where } = require("sequelize");
const db = require("../models/index");

const getUserById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: { id: id },
      });
      if (user) {
        resolve({
          errCode: 0,
          user,
        });
      }
      resolve({
        errCode: 2,
        message: "The user isn't exist",
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getUser = (role, userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user;
      if (userId && role === 1) {
        user = await db.User.findAll({
          where: { status: 1 },
        });
      }
      if (userId && role !== 1) {
        user = await db.User.findOne({
          where: { id: userId, status: 1 },
        });
      }

      //   else {
      //     resolve({
      //       errCode: 1,
      //       message: "Missing info or don't allow permission",
      //     });
      //   }
      resolve({
        errCode: 0,
        user,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: { id: userId },
      });
      if (user) {
        user.avatar = user.avatar;
        user.email = user.email;
        user.password = user.password;
        user.fullname = user.fullname;
        user.role = user.role;
        user.status = 2;
        await user.save();
        resolve({
          errCode: 0,
          message: "Delete user successfully",
        });
      }
      resolve({
        errCode: 2,
        message: "The user isn't exist",
      });
    } catch (error) {
      reject(error);
    }
  });
};

const updateUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: { id: data.userId },
      });
      if (user) {
        user.avatar = data.avatar;
        user.email = data.email;
        user.password = user.password;
        user.fullname = data.fullname;
        user.role = user.role;
        user.status = 1;
        await user.save();
        resolve({
          errCode: 0,
          message: "Update user successfully",
          user,
        });
      }
      resolve({
        errCode: 2,
        message: "The user isn't exist",
      });
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = { getUser, deleteUser, updateUser, getUserById };
