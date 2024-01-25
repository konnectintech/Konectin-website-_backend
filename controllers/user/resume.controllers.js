const User = require("../../models/user.model");
const ResumeBuilder = require("../../models/resume.model");
require("dotenv").config();

const {
  resumeSchema,
  resumeUpdateSchema,
} = require("../../helpers/resumeValidate");
const { createPdf } = require("../../helpers/puppeteer");
const path = require("path");
const os = require("os");
const cloudinaryUpload = require("../../helpers/cloudinary");

exports.resumeBuilder = async (req, res) => {
  try {
    const { userId } = req.query;
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User does not exist, please register" });
    }
    const { error, value } = resumeSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ Error: error.details[0].message });
    }

    const cv = new ResumeBuilder({
      userId,
      currentStage: 1,
      ...value,
    });

    await cv.save();
    return res.status(201).json({ message: "Resume created successfully", cv });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
exports.getUserResumes = async function (req, res) {
  try {
    const { userId } = req.query;
    const user = await User.findById({ _id: userId });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User does not exist, please register" });
    }

    const cvs = await ResumeBuilder.find({ userId: userId });
    // Convert cv.userId to string for comparison

    for (var i = 0; i < cvs.length; i++) {
      if (cvs[i].userId.toString() !== userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
    }

    return res
      .status(200)
      .json({ message: "Resumes retrieved successfully", cvs });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getUserResume = async function (req, res) {
  try {
    const { resumeId, userId } = req.query;

    const cv = await ResumeBuilder.findById({ _id: resumeId });

    if (!cv) {
      return res.status(404).json({ message: "Resume with Id does not exist" });
    }

    // Convert cv.userId to string for comparison
    if (cv.userId.toString() !== userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    return res
      .status(200)
      .json({ message: "Resume retrieved successfully", cv });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.updateUserResume = async function (req, res) {
  try {
    const { resumeId, userId } = req.query;

    const cv = await ResumeBuilder.findById({ _id: resumeId });

    if (!cv) {
      return res.status(404).json({ message: "CV not found" });
    }

    if (cv.userId.toString() !== userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { error, value } = resumeUpdateSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ Error: error.details[0].message });
    }

    // Update the found CV directly
    cv.set({ ...value });
    await cv.save();

    return res.status(200).json({
      message: "Resume Updated successfully",
      cv,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.createPdf = async function (req, res) {
  try {
    const { resumeId } = req.query;

    const cv = await ResumeBuilder.findById({ _id: resumeId });

    if (!cv) {
      return res.status(404).json({ message: "CV not found" });
    }

    const url = "https://pptr.dev/"; // Replace with the actual URL for generating the CV

    // Generate a PDF from the page content
    try {
      const pdfBuffer = await createPdf(url);

      // Upload the PDF to Cloudinary
      const cloudinaryUrl = await cloudinaryUpload(pdfBuffer);

      // Update the database with the Cloudinary URL
      cv.cloudinaryUrl = cloudinaryUrl;
      await cv.save();

      // Send the Cloudinary URL for download
      res.download(cv.cloudinaryUrl, `${cv._id}.pdf`, (err) => {
        if (err) {
          console.error("Error during file download:", err);
          res.status(500).json({ error: "Error during file download" });
        }
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { resumeId, userId } = req.query;

    const cv = await ResumeBuilder.findById({ _id: resumeId });

    if (!cv) {
      return res.status(404).json({ message: "CV not found" });
    }

    if (cv.userId.toString() !== userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await ResumeBuilder.deleteOne({ _id: cv._id });

    return res
      .status(200)
      .json({ message: "Resume has been deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
