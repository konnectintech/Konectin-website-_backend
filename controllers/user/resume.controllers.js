const User = require("../../models/user.model");
const ResumeBuilder = require("../../models/resume.model");
const pdf = require("html-pdf");
require("dotenv").config();

const {
  resumeSchema,
  resumeUpdateSchema,
} = require("../../helpers/resumeValidate");
const { createPdf } = require("../../helpers/puppeteer");
const { ObjectId } = require("mongodb");

exports.resumeBuilder = async (req, res) => {
  try {
    const userId = req.body.userId;
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
    console.error(err);
    return res.status(500).json({ message: "Server error, try again later!" });
  }
};
exports.getUserResumes = async function (req, res) {
  try {
    const { userId } = req.params;
    const user = await User.findById({ _id: userId });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User does not exist, please register" });
    }
    const cvs = await ResumeBuilder.find({ userId: userId });

    return res
      .status(200)
      .json({ message: "Resumes retrieved successfully", cvs });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error, try again later!" });
  }
};

exports.getUserResume = async function (req, res) {
  try {
    const { resumeId } = req.params;
    const cv = await ResumeBuilder.findById({ _id: resumeId });
    if (!cv) {
      return res.status(404).json({ message: "Resume with Id does not exist" });
    }

    return res
      .status(200)
      .json({ message: "Resume retrieved successfully", cv });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error, try again later!" });
  }
};

exports.updateUserResume = async function (req, res) {
  try {
    const { userId, resumeId } = req.query;
    const user = await User.findById({ _id: userId });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User does not exist, please register" });
    }
    const { error, value } = resumeUpdateSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ Error: error.details[0].message });
    }
    const cv = await resume.findByIdAndUpdate(
      resumeId,
      { ...value },
      { new: true }
    );
    if (!cv) {
      return res.status(400).json({ message: "Resume with Id does not exist" });
    }

    return res.status(200).json({ message: "Resume Updated successfully", cv });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error, try again later!" });
  }
};

exports.createPdf = async function (req, res) {
  try {
    const { userId, resumeId } = req.query;
    const { html } = req.body;
    const user = await User.findById({ _id: userId });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User does not exist, please register" });
    }
    resume.findByIdAndUpdate(resumeId, { currentStage: 6 });
    const buffer = await createPdf(html);
    res.type("pdf");
    return res.end(buffer, "binary");
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error, try again later!" });
  }
};
exports.delete = async (req, res) => {
  try {
    const resumeId = req.params.resumeId;
    const { user } = req;

    const cv = await ResumeBuilder.findById(resumeId);

    if (!cv) {
      return res.status(404).json({ message: "CV not found" });
    }

    if (cv.userId.toString() !== new ObjectId(user.userId).toString()) {
      return res
        .status(401)
        .json({ message: "Unauthorized: You are not the owner of this CV" });
    }

    await ResumeBuilder.deleteOne({ _id: cv._id });

    return res
      .status(200)
      .json({ message: "Resume has been deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
