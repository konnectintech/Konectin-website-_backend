const User = require("../../models/user.model");

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