const db = require("../models/index");

/// check name category exist
const checkNameCategoryExist = (nameCategory) => {
  return new Promise(async (resolve, reject) => {
    try {
      let nameExist = await db.Category.findOne({
        where: { name: nameCategory },
      });
      if (nameExist) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};

/// Create category
const addCategoryService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.name) {
        resolve({
          errCode: 1,
          message: "Please enter name category",
        });
      }
      let check = await checkNameCategoryExist(data.name);
      if (check) {
        resolve({
          errCode: 2,
          message: "Category already exists",
        });
      } else {
        await db.Category.create({
          name: data.name,
          slug: data.name.toLowerCase(),
          status: 1,
        });
        resolve({
          errCode: 0,
          message: "Create category successfully",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

/// Get category all || id
const getCategoryService = (CategoryId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let category = "";
      if (CategoryId && CategoryId === "ALL") {
        category = await db.Category.findAll();
      }
      if (CategoryId && CategoryId !== "ALL") {
        category = await db.Category.findOne({
          where: { id: CategoryId },
        });
      }
      resolve(category);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { addCategoryService, getCategoryService };
