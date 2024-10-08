const categoryService = require("../services/categoryService");

/// create category
const handleAddCategory = async (req, res) => {
  const message = await categoryService.addCategoryService(req.body);
  return res.status(200).json(message);
};

/// get category ALL & SINGLE
const getCategory = async (req, res) => {
  const id = req.query.id; // ALL || id

  if (!id) {
    return res.status(200).json({
      errCode: 1,
      message: "Does not exist in the category",
    });
  }

  const category = await categoryService.getCategoryService(id);

  res.status(200).json({
    errCode: 0,
    category: category,
  });
};

module.exports = { handleAddCategory, getCategory };
