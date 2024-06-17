const cloudinary = require("cloudinary").v2;

require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudinaryUpload = (file) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload(file)
      .then((result) => {
        resolve(result.secure_url);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const uploadImage = async (filePath, params) => {
  const options = {
    unique_filename: true,
    overwrite: true,
    uses_asset_folder_as_public_id_prefix: true,
    ...params
  };
  const response = await cloudinary.uploader.upload(filePath, options)
  return response
}

const uploadResumeProfilePicture = async function (filePath, resumeImage, params) {
  const options = {
    folder: `${resumeImage.userId}/resumePictures`,
    public_id: resumeImage.id,
    ...params
  };
  const response = await uploadImage(filePath, options)
  return response
}

const uploadProfilePicture = async function (filePath, profileImage, params) {
  const options = {
    folder: `${profileImage.userId}/profilePictures`,
    public_id: profileImage.id,
    ...params
  };
  const response = await uploadImage(filePath, options)
  return response
}


module.exports = { cloudinaryUpload, uploadResumeProfilePicture, uploadProfilePicture };
