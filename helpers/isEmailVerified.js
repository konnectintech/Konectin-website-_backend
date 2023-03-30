const User = require('../models/user.model'); // Assuming you have a User model

function isEmailVerified(req, res, next) {
  // Get the user ID from the request object (assuming it's stored in req.user.id)
  const userId = req.userId;

  // Use the User model to find the user by ID and check if their account is verified
  const user = User.findById(userId)
  if (!user.isEmailVerified) {
    return res.status(403).json({ error: 'Account not verified' });
  }
    next();
}

module.exports = {isEmailVerified};
