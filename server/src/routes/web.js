const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const middlewareController = require("../controllers/middlewareController");
const uploadController = require("../controllers/uploadController");
const postController = require("../controllers/postController");
const categoryController = require("../controllers/categoryController");

/// config cloudinary
const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: "BANK",
  allowedFormats: ["jpg", "png", "jpeg"],
});

const upload = multer({
  storage,
});

let router = express.Router();

let initWebRoutes = (app) => {
  /// Auth routes
  router.post("/v1/register", authController.handleRegister);
  router.post("/v1/login", authController.handleLogin);
  router.post(
    "/v1/logout",
    middlewareController.verifyToken,
    authController.handleLogout
  );

  /// User routes
  router.get("/v1/get-user", userController.handleGetUser);
  router.delete("/v1/delete-user", userController.handleDeleteUser);
  router.put("/v1/update-user", userController.handleUpdateUser);
  router.get("/v1/get-user-id",userController.handdleGetUserById)

  /// upload image and get link
  router.post(
    "/v1/upload-image",
    upload.fields([{ name: "image", maxCount: 1 }]),
    uploadController.uploadImage
  );

  router.post(
    "/v1/upload-image-single",
    upload.fields([{ name: "image", maxCount: 1 }]),
    uploadController.updateImageSingle
  );

  /// Post routes
  router.post(
    "/v1/create-post",
    middlewareController.verifyToken,
    postController.handleAddPost
  );
  /// get post
  router.get("/v1/get-post", postController.handleGetPost);
  router.get("/v1/get-post-limits", postController.handleGetPostLimits);
  ///// get post by author or related
  router.get("/v1/get-post-related", postController.handleGetPostRelated);
  router.get("/v1/get-post-author", postController.handleGetPostAuthor);
  //get post manage
  router.get("/v1/get-post-manage", postController.handleGetPostManage);
  router.delete(
    "/v1/delete-post",
    middlewareController.verifyToken,
    postController.handleDeletePost
  );
  router.put(
    "/v1/update-post",
    middlewareController.verifyToken,
    postController.handleUpdatePost
  );

  ///Categories routes
  router.post("/v1/create-category", categoryController.handleAddCategory);
  router.get("/v1/get-category", categoryController.getCategory);

  return app.use("/", router);
};

module.exports = initWebRoutes;
