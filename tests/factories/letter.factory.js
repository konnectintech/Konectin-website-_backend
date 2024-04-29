const { createUser } = require("./user.factory");
const LetterBuilder = require("../../models/letter.model");

const createLetter = async (letterData = {}) => {
  const user = await createUser();

  const letter = new LetterBuilder({
    userId: user._id,

    ...letterData,
  });

  await letter.save();

  return letter;
};

module.exports = { createLetter };
