const uploadImage = (req, res) => {
  const link_image = req.files["image"][0];
  try {
    return res.status(200).json({
      errCode: 0,
      message: "Uploaded successfully",
      imageUrl: link_image?.path,
    });
  } catch (error) {
    return res.status(500).json({ errCode: 1, message: "Image upload failed" });
  }
};

const updateImageSingle = (req, res) => {
  const link_image = req.files["image"][0];
  try {
    return res.status(200).json({
      errCode: 0,
      message: "Uploaded successfully",
      imageUrl: link_image?.path,
    });
  } catch (error) {
    return res.status(500).json({ errCode: 1, message: "Image upload failed" });
  }
};

module.exports = { uploadImage, updateImageSingle };
