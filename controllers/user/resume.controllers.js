const User = require("../../models/user.model");
const ResumeBuilder = require("../../models/resume.model");
require("dotenv").config();

const {
  resumeSchema,
  resumeUpdateSchema,
} = require("../../helpers/resumeValidate");
const { convertResumeIntoPdf } = require("../../helpers/puppeteer");
const path = require("path");
const os = require("os");
const fs = require("fs");
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
    const updated = await ResumeBuilder.findByIdAndUpdate(resumeId, { ...value }, { new: true });
    // Update the found CV directly
    // cv.set({ ...value });
    // await cv.save();

    return res.status(200).json({
      message: "Resume Updated successfully",
      updated,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// exports.createPdf = async function (req, res) {
//   try {
//     const { resumeHtml } = req.body;
//     const { resumeId } = req.query;

//     const resume = await ResumeBuilder.findById({ _id: resumeId });

//     if (!resume) {
//       return res.status(404).json({ message: "Resume not found" });
//     }

//     // Create the CV as a PDF
//     const pdfBuffer = await convertResumeIntoPdf(resumeHtml);

//     const downloadsFolderPath = path.join(os.homedir(), "Downloads");
//     await fs.promises.mkdir(downloadsFolderPath, { recursive: true });

//     // Save the CV PDF to a local file in the 'downloads' folder
//     const pdfFilePath = path.join(
//       downloadsFolderPath,
//       `${resume.basicInfo.firstName}_${resume.basicInfo.lastName}_Resume.pdf`
//     );
//     await fs.promises.writeFile(pdfFilePath, pdfBuffer);

//     res.json({
//       message: "Your Resume has been downloaded. Check your downloads folder",
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

exports.createPdf = async function (req, res) {
  try {
    const { resumeId } = req.query;
    const { resumeHtml } = req.body;
    const resume = await ResumeBuilder.findById(resumeId);
    if (resume) {
      await ResumeBuilder.findByIdAndUpdate(resumeId, { currentStage: 6 })
    } else {
      return res.status(404).json({ message: "Resume not found" });
    }
    const buffer = await convertResumeIntoPdf(resumeHtml);
    if (!buffer) {
      return res.status(500).json({ message: "Server error, try again later!" });
    }
    res.type("pdf");
    return res.end(buffer, "binary");
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error, try again later!" });
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
