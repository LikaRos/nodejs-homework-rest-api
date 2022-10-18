const fs = require("fs/promises");
const path = require("path");
const { User } = require("../../models/user");

const avatarDir = path.join(__dirname, "../..", "public", "avatars");

const avatarUpdate = async (req, res) => {
  try {
    const { _id } = req.user;

    const { path: tempUpload, originalname } = req.file;
    const resultUpload = path.join(avatarDir, filename);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("avatars", filename);
    await User.findByIdAndUpdate(_id, { avatarURL });
    res.json({
      avatarURL,
    });
  } catch (error) {
    await fs.unlink(req.file.path);
    throw error;
  }
};

// const avatarUpdate = async (req, res) => {
// 	try {
// 		const { _id } = req.user;

//   			const avatar = path.join("public", "avatars", originalname);
//   			const result = await User.findByIdAndUpdate(_id, { avatarUrl: avatar });
// 	}

//   const { _id } = req.user;
//   const avatar = path.join("public", "avatars", originalname);
//   const result = await User.findByIdAndUpdate(_id, { avatarUrl: avatar });
//   if (!result) {
//     throw RequestError(401);
//   }
//   res.json(result);
// };

module.exports = avatarUpdate;
