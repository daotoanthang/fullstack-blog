const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dwumzk5ta",
  api_key: "794624298418674",
  api_secret: "s24wBwmXqnqK6WiNlJGJLwbXa8Q", // Click 'View API Keys' above to copy your API secret
});

module.exports = cloudinary;
