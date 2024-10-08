const { where } = require("sequelize");
const db = require("../models/index");
const slugify = require("slugify");

const generateUniqueSlug = async (title) => {
  let slug = slugify(title, {
    lower: true, // convert to lower case, defaults to `false`
    strict: true,
    remove: /[*+~.()'"!:@%]/g,
  });
  let slugExists = await db.Post.findOne({ where: { slug } });

  // If slug already exists, append a unique identifier
  if (slugExists) {
    const uniqueSuffix = Date.now().toString().slice(-4); // e.g., a 4-digit timestamp
    slug = `${slug}-${uniqueSuffix}`;
  }

  return slug;
};

const createNewPost = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const slug = await generateUniqueSlug(data.title);
      await db.Post.create({
        categoryId: data.categoryId,
        userId: data.userId,
        title: data.title,
        slug: slug,
        image: data.image,
        content: data.content,
        status: 1,
      });
      resolve({
        errCode: 0,
        message: "Create post succesfully",
      });
    } catch (error) {
      reject(error);
    }
  });
};

/// Get post use limits
const getPostLimits = (limits) => {
  return new Promise(async (resolve, reject) => {
    try {
      let post = "";
      post = await db.Post.findAll({
        limit: parseInt(limits), // Apply the limit here
        include: [
          {
            model: db.User,
            attributes: ["fullName", "avatar", "role"], // Lấy thông tin từ bảng User
          },
          {
            model: db.Category,
            attributes: ["name"], // Lấy category name từ bảng Category
          },
        ],
      });
      resolve(post);
    } catch (error) {
      reject(error);
    }
  });
};

//// Get ALL or Single Post
const getPost = (slug) => {
  return new Promise(async (resolve, reject) => {
    try {
      let post = "";
      if (slug && slug === "All") {
        post = await db.Post.findAll({
          include: [
            {
              model: db.User,
              attributes: ["fullName", "avatar", "role"], // Lấy thông tin từ bảng User
            },
            {
              model: db.Category,
              attributes: ["name"], // Lấy category name từ bảng Category
            },
          ],
        });
      }
      if (slug && slug !== "All") {
        post = await db.Post.findOne({
          where: { slug: slug },
          include: [
            {
              model: db.User,
              attributes: ["fullName", "avatar", "role"], // Lấy thông tin từ bảng User
            },
            {
              model: db.Category,
              attributes: ["name"], // Lấy category name từ bảng Category
            },
          ],
        });
      }
      resolve(post);
    } catch (error) {
      reject(error);
    }
  });
};

/// get post by author
const getPostAuthor = (userId, limits = 3) => {
  return new Promise(async (resolve, reject) => {
    try {
      let post = "";
      if (limits === "All") {
        post = await db.Post.findAll({
          where: {
            userId: userId,
          },
          include: [
            {
              model: db.User,
              attributes: ["fullName", "avatar", "role"], // Lấy thông tin từ bảng User,
            },
            {
              model: db.Category,
              attributes: ["name"], // Lấy category name từ bảng Category,
            },
          ],
        });
        resolve(post);
      } else {
        post = await db.Post.findAll({
          where: {
            userId: userId,
          },
          limit: parseInt(limits), // Apply the limit here
          include: [
            {
              model: db.User,
              attributes: ["fullName", "avatar", "role"], // Lấy thông tin từ bảng User,
            },
            {
              model: db.Category,
              attributes: ["name"], // Lấy category name từ bảng Category,
            },
          ],
        });
        resolve(post);
      }
    } catch (error) {
      reject(error);
    }
  });
};

/// Get post related
const getPostRelated = (category, limits = 3) => {
  return new Promise(async (resolve, reject) => {
    try {
      let post = "";
      if (limits === "All") {
        post = await db.Post.findAll({
          include: [
            {
              model: db.User,
              attributes: ["fullName", "avatar", "role"], // Lấy thông tin từ bảng User
            },
            {
              model: db.Category,
              attributes: ["name"], // Lấy category name từ bảng Category,
              where: {
                name: category, // Điều kiện lọc theo Category.name
              },
            },
          ],
        });
        resolve(post);
      } else {
        post = await db.Post.findAll({
          limit: parseInt(limits), // Apply the limit here
          include: [
            {
              model: db.User,
              attributes: ["fullName", "avatar", "role"], // Lấy thông tin từ bảng User
            },
            {
              model: db.Category,
              attributes: ["name"], // Lấy category name từ bảng Category,
              where: {
                name: category, // Điều kiện lọc theo Category.name
              },
            },
          ],
        });
        resolve(post);
      }
    } catch (error) {
      reject(error);
    }
  });
};

/// GET POST MANAGE PAGE
const getPostManage = (userId, userRole) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (userRole === 1) {
        let post = "";
        post = await db.Post.findAll({
          include: [
            {
              model: db.User,
              attributes: ["fullName", "avatar", "role"], // Lấy thông tin từ bảng User
            },
            {
              model: db.Category,
              attributes: ["name"], // Lấy category name từ bảng Category
            },
          ],
        });
        resolve(post);
      }
      if (userRole !== 1) {
        let post = "";
        post = await db.Post.findAll({
          where: {
            userId: userId,
          },
          include: [
            {
              model: db.User,
              attributes: ["fullName", "avatar", "role"], // Lấy thông tin từ bảng User
            },
            {
              model: db.Category,
              attributes: ["name"], // Lấy category name từ bảng Category
            },
          ],
        });
        resolve(post);
      }
    } catch (error) {
      reject(error);
    }
  });
};

const deletePost = (postId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.Post.findOne({
        where: { id: postId },
      });
      if (!user) {
        resolve({
          errCode: 2,
          message: "The post isn't exist",
        });
      }
      // await user.destroy();
      await db.Post.destroy({
        where: { id: postId },
      });
      resolve({ errCode: 0, message: "post delete succeeds" });
    } catch (error) {
      reject(error);
    }
  });
};

const updatePost = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let post = await db.Post.findOne({ where: { slug: data.slug } });
      if (post) {
        post.categoryId = data.categoryId;
        post.slug = data.slug;
        post.userId = data.userId;
        post.title = data.title;
        post.image = data.image;
        post.content = data.content;
        post.status = 1;
        await post.save();
        resolve({
          errCode: 0,
          message: "Update post successfully",
        });
      } else {
        resolve({
          errCode: 1,
          message: "Update post fail",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createNewPost,
  getPost,
  getPostLimits,
  getPostRelated,
  getPostAuthor,
  getPostManage,
  deletePost,
  updatePost,
};
