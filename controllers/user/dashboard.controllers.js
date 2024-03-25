const User = require("../../models/user.model");
const cloudinary = require("cloudinary").v2;
const { StatusCodes } = require("http-status-codes");

cloudinary.config({
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

    if(emailNotifications) user.notifications.emails = emailNotifications;
    if(pushNotifications) user.notifications.pushNotifications = pushNotifications;
    if(resumeStatusUpdates) user.notifications.resumeStatusUpdates = resumeStatusUpdates;
    if(jobAlerts) user.notifications.jobAlerts = jobAlerts;
    if(internshipAlerts) user.notifications.internshipAlerts = internshipAlerts;
    if(blogUpdates) user.notifications.blogUpdates = blogUpdates;
    if(reminders) user.notifications.reminders = reminders;

    await user.save();

    return res.status(200).json({ message: "Notification preferences updated successfully", user });
  } catch (err) {
    console.error(err);
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
  try {
    const { userId } = req.query;
    const file = req.files.picture;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!file) {
      return res.status(400).json({ message: "No picture file provided" });
    }

    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: "user_pictures",
      unique_filename: true,
      overwrite: true,
    });

    user.picture = result.secure_url;
    await user.save();

    res.json({ message: "User picture updated successfully", url: user.picture });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating user picture" });
  }
};
