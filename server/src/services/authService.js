const db = require("../models/index");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const checkEmailExist = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({ where: { email: userEmail } });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};

const generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const registerService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.email || !data.fullname || !data.password) {
        resolve({
          errCode: 1,
          message: "Missing input parameters",
        });
      }
      let check = await checkEmailExist(data.email);
      if (check === true) {
        resolve({
          errCode: 2,
          message: "Email already exists",
        });
      } else {
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(data.password, salt);
        await db.User.create({
          avatar:
            "https://cdn.dribbble.com/users/1356445/screenshots/3777371/media/4503c530db6af11a6c548e299ba47a71.jpg?resize=400x0",
          email: data.email,
          fullname: data.fullname,
          password: hashPassword,
          role: 2,
          status: 1,
        });
        resolve({
          errCode: 0,
          message: "Create user successfully",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const loginService = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let emailExist = await checkEmailExist(email);
      let userInfo = {};
      if (emailExist) {
        let user = await db.User.findOne({
          attributes: [
            "id",
            "avatar",
            "email",
            "fullname",
            "password",
            "role",
            "status",
          ],
          where: { email: email },
          raw: true,
        });
        if (user) {
          let validatePassword = bcrypt.compareSync(password, user.password);
          if (validatePassword) {
            const { password, ...info } = user;
            const payload = {
              email: user.email,
              role: user.role,
              status: user.status,
            };
            const accessToken = generateAccessToken(payload);
            userInfo = { errCode: 0, userInfo: { ...info }, accessToken };
          } else {
            userInfo.message = "Wrong password";
            userInfo.errCode = 1;
          }
        }
      } else {
        userInfo.message = "Wrong email";
        userInfo.errCode = 1;
      }
      resolve(userInfo);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { registerService, loginService };
