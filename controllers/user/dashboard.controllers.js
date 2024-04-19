const User = require("../../models/user.model");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});


exports.getUserInfo = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ message: "Please provide an email address" });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User information fetched successfully", user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error, try again later!" });
  }
};

exports.getNotificationSettings = async (req, res) => {
  try {
    const { userId } = req.query;
    
    const user = await User.findById(userId);
    
    if(!user) {
      return res.status(404).json({message: 'User not found'});
    }
    
    res.json(user.notificationSettings);
    
  } catch(err) {
    console.error(err);
    res.status(500).json({message: 'Server error'}); 
  }
}

exports.getSocials = async (req, res) => {

  try {
    const { userId } = req.query;

    const user = await User.findById(userId);

    if(!user) {
      return res.status(404).json({message: 'User not found'});
    }

    res.json(user.socials);

  } catch(err) {
    console.error(err);
    res.status(500).json({message: 'Server error'});
  }
}

exports.updateUser = async (req, res) => {

  try {
    const { userId } = req.query;
    const update = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({message: 'User not found'});
    }

    if(update.fullname || update.email) {  
      user.set(update);
    }

    if(update.notificationSettings) {
      user.notificationSettings = update.notificationSettings;
    }

    if(update.socials){
      user.socials = update.socials;
    }
    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({message: 'Error updating user'});
  }
}

exports.updateUserPicture = async (req, res) => {
  try {
    const { userId } = req.query;
    console.log(userId);

    const file = req.body.picture;

    if (!userId) {
      console.error('User ID not provided');
      return res.status(400).json({ message: "User ID is required" });
    }

    if (!file) {
      console.error('No picture file provided');
      return res.status(400).json({ message: "Please upload a picture file" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!file) {
      return res.status(400).json({ message: "No picture file provided" });
    }

    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: "profile_pictures",
      unique_filename: true,
      overwrite: true,
    });

    user.picture = result.secure_url;
    await user.save();

    console.log(`User picture updated successfully for user ID: ${userId}`);
    res.json({ message: "User picture updated successfully", url: user.picture });
  } catch (err) {
    console.error(`Error updating user picture: ${err.message}`);
    console.error(err);
    res.status(500).json({ message: "Error updating user picture", error: err});
  }
};