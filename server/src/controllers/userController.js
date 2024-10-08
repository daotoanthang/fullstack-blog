const userService = require("../services/userService");

const handleGetUser = async (req, res) => {
  const role = req.query.role;
  const userId = req.query.userId;

  const message = await userService.getUser(Number(role), userId);
  return res.status(200).json(message);
};

const handdleGetUserById = async (req, res) => {
  const id = req.query.id;
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      message: "Missing input parameters",
    });
  }
  const message = await userService.getUserById(id);
  return res.status(200).json(message);
};

const handleUpdateUser = async (req, res) => {
  const data = req.body;
  if (!data.userId) {
    return res.status(200).json({
      errCode: 1,
      message: "Missing input parameters",
    });
  }
  const message = await userService.updateUser(data);
  return res.status(200).json(message);
};

const handleDeleteUser = async (req, res) => {
  console.log(req.body.id);

  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      message: "Missing input parammeter",
    });
  }
  const message = await userService.deleteUser(req.body.id);

  return res.status(200).json(message);
};

module.exports = {
  handleGetUser,
  handleDeleteUser,
  handleUpdateUser,
  handdleGetUserById,
};
