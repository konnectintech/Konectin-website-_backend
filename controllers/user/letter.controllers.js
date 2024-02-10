const User = require("../../models/user.model");
const LetterBuilder = require("../../models/letter.model");
require("dotenv").config();
const { convertPageIntoPdf } = require("../../helpers/puppeteer");
const path = require("path");
const { uploadFile, downloadFile } = require("../../helpers/aws");
const fs = require("fs");
const { Types } = require("mongoose");

exports.letterBuilder = async (req, res) => {
  try {
    const { userId } = req.query;
    const {
      basicInfo: { fullName, email, jobPosition, companyName },
      jobDescriptionAndCompanyBrief: { jobDescription, companyInfo },
      jobLink,
      professionalBio,
    } = req.body;

    let user = null;

    if (userId) {
      user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
    }

    const newLetterData = {
      userId,
      basicInfo: {
        fullName: user ? user.fullname : fullName,
        email: user ? user.email : email,
        jobPosition,
        companyName,
      },
      jobDescriptionAndCompanyBrief: {
        jobDescription,
        companyInfo,
      },
      jobLink,
      professionalBio,
    };

    const newLetter = new LetterBuilder({ ...newLetterData });

    const savedLetter = await newLetter.save();
    res
      .status(201)
      .json({ data: savedLetter, message: "Letter created successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getUserLetter = async (req, res) => {
  try {
    const { letterId, userId } = req.query;

    const letter = await LetterBuilder.findById({ _id: letterId });

    if (!letter) {
      return res.status(404).json({ message: "Letter with Id does not exist" });
    }

    // Convert letter.userId to string for comparison
    if (letter.userId.toString() !== userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    return res
      .status(200)
      .json({ message: "Letter retrieved successfully", letter });
  } catch (err) {
    return res.status(500).json({ message: err.message });
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
        .status(404)
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
      .status(200)
      .json({ message: "Letters retrieved successfully", letters });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { letterId, userId } = req.query;

    const letter = await LetterBuilder.findById({ _id: letterId });

    if (!letter) {
      return res.status(404).json({ message: "Letter not found" });
    }

    if (letter.userId.toString() !== userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await LetterBuilder.deleteOne({ _id: letter._id });

    return res
      .status(200)
      .json({ message: "Letter has been deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.updateUserLetter = async (req, res) => {
  try {
    const { letterId, userId } = req.query;
    const updateFields = req.body;

    // Convert userId and letterId to ObjectId
    const objectIdUserId = new Types.ObjectId(userId);
    const objectIdLetterId = new Types.ObjectId(letterId);

    // Define the aggregation pipeline
    const pipeline = [
      {
        $match: {
          _id: objectIdLetterId,
          userId: objectIdUserId,
        },
      },
      {
        $set: updateFields,
      },
      {
        $replaceRoot: { newRoot: "$$ROOT" },
      },
    ];

    // Execute the aggregation pipeline to update and return the updated letter
    const updatedLetter = await LetterBuilder.aggregate(pipeline);

    if (!updatedLetter || updatedLetter.length === 0) {
      return res
        .status(404)
        .json({ message: "Letter not found or unauthorized" });
    }

    res.status(200).json({
      message: "Letter Updated successfully",
      letter: updatedLetter[0],
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createLetterIntoPdf = async function (req, res) {
  try {
    const { letterId } = req.query;
    const { letterHtml } = req.body;

    const letter = await LetterBuilder.findById({ _id: letterId });

    if (!letter) {
      return res.status(404).json({ message: "letter not found" });
    }
    // 1. Create the letter as a PDF
    const pdfBuffer = await convertPageIntoPdf(letterHtml);

    const tmpFolderPath = path.join(__dirname, "tmp");
    await fs.promises.mkdir(tmpFolderPath, { recursive: true });

    // 2. Save the letter PDF to a local file in the 'tmp' folder
    const pdfFilePath = path.join(tmpFolderPath, `${letter.id}.pdf`);
    await fs.promises.writeFile(pdfFilePath, pdfBuffer);

    // 3. Upload the PDF file to AWS S3 and update the letter imageUrl
    const imageUrl = await uploadFile(pdfFilePath, `${letter.id}.pdf`);
    letter.imageUrl = imageUrl;

    //4.  Remove the 'tmp' folder and its contents after successful upload
    await fs.promises.rm(tmpFolderPath, { recursive: true });

    // 5. Set the response headers for download from AWS S3
    const pdfContent = await downloadFile(`${letter.id}.pdf`);

    return res.end(pdfContent, "binary");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
