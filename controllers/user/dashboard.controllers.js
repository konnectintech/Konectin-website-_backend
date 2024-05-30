const { uploadProfilePicture, uploadResumePicture } = require("../../helpers/cloudinary");
const User = require("../../models/user.model");
const cloudinary = require("cloudinary").v2;
const { StatusCodes } = require("http-status-codes");
const ProfileImage = require("../../models/profileImage.model")
const ResumeImage = require("../../models/resumeImage.model")
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
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Please provide an email address" });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found" });
    }
    return res
      .status(StatusCodes.OK)
      .json({ message: "User information fetched successfully", user });
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
};

exports.getNotificationSettings = async (req, res) => {
  try {
    const { userId } = req.query;

    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found" });
    }

    res.json(user.notificationSettings);
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
};

exports.updateNotificationSettings = async (req, res) => {
  try {
    const { userId } = req.query;
    const { emailNotifications, pushNotifications, resumeStatusUpdates, jobAlerts, internshipAlerts, blogUpdates, reminders } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (emailNotifications) user.notifications.emails = emailNotifications;
    if (pushNotifications) user.notifications.pushNotifications = pushNotifications;
    if (resumeStatusUpdates) user.notifications.resumeStatusUpdates = resumeStatusUpdates;
    if (jobAlerts) user.notifications.jobAlerts = jobAlerts;
    if (internshipAlerts) user.notifications.internshipAlerts = internshipAlerts;
    if (blogUpdates) user.notifications.blogUpdates = blogUpdates;
    if (reminders) user.notifications.reminders = reminders;

    await user.save();

    return res.status(200).json({ message: "Notification preferences updated successfully", user });
  } catch (err) {
    return res.status(500).json({ message: "Server error, try again later" });
  }
};

exports.getSocials = async (req, res) => {
  try {
    const { userId } = req.query;

    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found" });
    }

    res.json(user.socials);
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { userId } = req.query;
    const update = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found" });
    }

    if (update.fullname || update.email || update.phoneNumber || update.picture || update.country || update.city || update.college) {
      user.set(update);
    }

    if (update.notificationSettings) {
      user.notificationSettings = update.notificationSettings;
    }

    if (update.socials) {
      user.socials = update.socials;
    }
    await user.save();
    res.json(user);
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
}

exports.updateUserPicture = async (req, res) => {
  let file;
  try {
    const { userId } = req.query;
    if (req.files && req.files.file) {
      file = req.files.file
    } else {
      file = req.body.picture
    }
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

    // const result = await cloudinary.uploader.upload(file, {
    //   folder: `${userId}/profilePictures`,
    //   unique_filename: true,
    //   overwrite: true,
    // });
    const profileImage = new ProfileImage({ userId: user.id })
    const result = await uploadProfilePicture(file, profileImage)
    if (result && result?.secure_url) {
      profileImage.link = result.secure_url
      await profileImage.save()
      user.picture = result.secure_url;
      await user.save();

      // create a corresponding resumeImage
      const resumeImage = new ResumeImage({ userId: user.id })
      const resumeImageUpload = await uploadResumePicture(file, resumeImage)
      if (resumeImageUpload && resumeImageUpload.secure_url) {
        resumeImage.link = resumeImageUpload.secure_url
        await resumeImage.save()
      }
    }

    res.json({ message: "User picture updated successfully", url: user.picture });
  } catch (err) {
    console.error(`Error updating user picture: ${err.message}`);
    res.status(500).json({ message: "Error updating user picture", error: err });
  }
};
