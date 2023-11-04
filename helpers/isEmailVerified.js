const User = require('../models/user.model'); // Assuming you have a User model

async function isEmailVerified(req, res, next) {
  // Get the user ID from the request object (assuming it's stored in req.user.id)
  const userId = req.user._id;

  try {
    // Use the User model to find the user by ID and check if their account is verified
    const user = await User.findById(userId)
    if (user.isEmailVerified == false) {
      return res.status(403).json({ error: 'Account not verified' });
    }
    next();
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ message: "Internal Server Error" })
  }

}

module.exports = { isEmailVerified };
