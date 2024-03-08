const User = require("../../models/user.model");
const { StatusCodes } = require("http-status-codes");

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

    if (update.fullname || update.email) {
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
};
