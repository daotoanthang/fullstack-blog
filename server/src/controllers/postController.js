const postService = require("../services/postService");

handleAddPost = async (req, res) => {
  const data = req.body;
  if (!data.title || !data.content || !data.categoryId || !data.userId) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing title or content or categoryId",
    });
  }
  let message = await postService.createNewPost(data);
  return res.status(200).json(message);
};

handleGetPost = async (req, res) => {
  slug = req.query.slug;
  if (!slug) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing input paramters",
    });
  }
  const postData = await postService.getPost(slug);

  return res.status(200).json({
    errCode: 0,
    post: postData,
  });
};

handleGetPostLimits = async (req, res) => {
  limits = req.query.limits;
  if (!limits) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing input paramters",
    });
  }
  const postData = await postService.getPostLimits(limits);

  return res.status(200).json({
    errCode: 0,
    post: postData,
  });
};

handleGetPostRelated = async (req, res) => {
  category = req.query.category;
  limits = req.query.limits;
  if (!category) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing input paramters",
    });
  }
  const postData = await postService.getPostRelated(category, limits);

  return res.status(200).json({
    errCode: 0,
    post: postData,
  });
};

/// get post by author
handleGetPostAuthor = async (req, res) => {
  userId = req.query.userId;
  limits = req.query.limits;
  console.log(userId);
  if (!userId) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing input paramters",
    });
  }
  const postData = await postService.getPostAuthor(userId, limits);

  return res.status(200).json({
    errCode: 0,
    post: postData,
  });
};

/// Get post manage ( role & id)
handleGetPostManage = async (req, res) => {
  userId = req.query.userId;
  userRole = parseInt(req.query.userRole);
  console.log(userRole);
  const postData = await postService.getPostManage(userId, userRole);

  return res.status(200).json({
    errCode: 0,
    post: postData,
  });
};

/// Delete post by id
handleDeletePost = async (req, res) => {
  console.log(req.body.id);
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing input parameter",
    });
  }
  const message = await postService.deletePost(req.body.id);
  return res.status(200).json(message);
};

//// Update post by id
handleUpdatePost = async (req, res) => {
  const data = req.body;
  if (!data.title || !data.content) {
    return res.status(200).json({
      errCode: 2,
      message: "Missing title or content",
    });
  }
  const messsage = await postService.updatePost(data);
  return res.status(200).json(messsage);
};
module.exports = {
  handleAddPost,
  handleGetPost,
  handleGetPostLimits,
  handleGetPostRelated,
  handleGetPostAuthor,
  handleGetPostManage,
  handleDeletePost,
  handleUpdatePost,
};
