const User = require("../../models/user.model");
const LetterBuilder = require("../../models/letter.model");
require("dotenv").config();
const { Types } = require("mongoose");
const { StatusCodes } = require("http-status-codes");
const { Document, Packer, Paragraph, TextRun } = require("docx");

exports.letterBuilder = async (req, res) => {
  try {
    const { userId } = req.query;
    const {
      details: { fullName, email, jobPosition, companyName } = {},
      description: { jobDescription, companyInfo } = {},
      professionalBio,
      content,
    } = req.body;

    let user = await User.findById(userId);

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found" });
    }

    const newLetterData = {
      userId,
      details: {
        fullName: user ? user.fullname : fullName,
        email: user ? user.email : email,
        jobPosition,
        companyName,
      },
      description: {
        jobDescription,
        companyInfo,
      },
      content,
      professionalBio,
    };

    const newLetter = new LetterBuilder({ ...newLetterData });

    const savedLetter = await newLetter.save();
    res
      .status(StatusCodes.CREATED)
      .json({ data: savedLetter, message: "Letter created successfully" });
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
};

exports.getUserLetter = async (req, res) => {
  try {
    const { letterId, userId } = req.query;

    const letter = await LetterBuilder.findById({ _id: letterId });

    if (!letter) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Letter with Id does not exist" });
    }

    // Convert letter.userId to string for comparison
    if (letter.userId.toString() !== userId) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Unauthorized" });
    }

    return res
      .status(StatusCodes.OK)
      .json({ message: "Letter retrieved successfully", letter });
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
};

exports.getUserLetters = async function (req, res) {
  try {
    const { userId, page = 1, pageSize = 10 } = req.query;

    // Convert userId to ObjectId
    const objectIdUserId = new Types.ObjectId(userId);

    // Check if user exists
    const user = await User.findById(objectIdUserId);
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User does not exist, please register" });
    }

    // Calculate pagination parameters
    const skip = (page - 1) * pageSize;

    // Convert pageSize to a number
    const parsedPageSize = parseInt(pageSize, 10) || 10;

    // Aggregate pipeline to fetch user's letters with pagination and authorization check
    const pipeline = [
      {
        $match: {
          userId: objectIdUserId,
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: parsedPageSize,
      },
      {
        $addFields: {
          isAuthorized: { $eq: ["$userId", objectIdUserId] },
        },
      },
      {
        $match: {
          isAuthorized: true,
        },
      },
    ];

    // Execute the aggregation pipeline
    const letters = await LetterBuilder.aggregate(pipeline);

    return res
      .status(StatusCodes.OK)
      .json({ message: "Letters retrieved successfully", letters });
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { letterId, userId } = req.query;

    const letter = await LetterBuilder.findById({ _id: letterId });

    if (!letter) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Letter not found" });
    }

    if (letter.userId.toString() !== userId) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Unauthorized" });
    }

    await LetterBuilder.deleteOne({ _id: letter._id });

    return res
      .status(StatusCodes.OK)
      .json({ message: "Letter has been deleted successfully" });
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
};
exports.updateUserLetter = async (req, res) => {
  try {
    const { letterId, userId } = req.query;
    const updateFields = req.body;

    // Convert userId and letterId to ObjectId
    const objectIdUserId = new Types.ObjectId(userId);
    const objectIdLetterId = new Types.ObjectId(letterId);

    // Find the letter by id
    let letter = await LetterBuilder.findOne({
      _id: objectIdLetterId,
      userId: objectIdUserId,
    });

    if (!letter) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Letter not found or unauthorized" });
    }

    // Update the letter's fields
    for (const key in updateFields) {
      if (key !== "chats") {
        letter[key] = updateFields[key];
      }
    }

    // Add a new chat message to the chats array
    if (updateFields.chats) {
      const newChat = updateFields.chats[0]; // Assuming only one chat message is added at a time
      letter.chats.push(newChat);
    }

    // Save the updated letter
    await letter.save();

    res.status(StatusCodes.OK).json({
      message: "Letter Updated successfully",
      letter,
    });
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
};
exports.getLetterWithChats = async (req, res) => {
  try {
    const { letterId } = req.query;

    // Convert letterId to ObjectId
    const objectIdLetterId = new Types.ObjectId(letterId);

    // Find the letter by id and populate the chats field
    const letter = await LetterBuilder.findOne({
      _id: objectIdLetterId,
    }).populate("chats");

    if (!letter) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Letter not found" });
    }
    const letterChats = letter.chats;

    res.status(StatusCodes.OK).json({
      letterChats,
    });
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
};

exports.createLetterIntoDocx = async function (req, res) {
  try {
    const { letterId } = req.query;

    const letter = await LetterBuilder.findById({ _id: letterId });

    if (!letter) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Letter not found" });
    }

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [new TextRun(letter.content)],
            }),
          ],
        },
      ],
    });

    // Convert DOCX to buffer
    const buffer = await Packer.toBuffer(doc);

    // Send response with appropriate headers
    res.set({
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": `attachment; filename="${letter.id}.docx"`,
    });

    // Send the base64 encoded file in the response
    res.status(StatusCodes.OK).send(buffer);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};