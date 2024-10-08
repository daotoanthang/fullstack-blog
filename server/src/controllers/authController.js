const authService = require("../services/authService");

let handleRegister = async (req, res) => {
  let data = req.body;
  const message = await authService.registerService(data);

  res.status(200).json(message);
};

let handleLogin = async (req, res) => {
  let user = req.body;
  if (!user.email || !user.password) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing input parameters",
    });
  }
  let message = await authService.loginService(user.email, user.password);
  return res.status(200).json(message);
};

let handleLogout = (req, res) => {
  res.status(200).json("Log out successfully");
};

//// Controller testing
const getBook = (req, res) => {
  return res.status(200).json({
    errcode: 0,
    book: "Norland",
  });
};

module.exports = { handleRegister, handleLogin, getBook, handleLogout };
