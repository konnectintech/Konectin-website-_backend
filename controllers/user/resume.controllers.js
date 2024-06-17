const User = require("../../models/user.model");
const ResumeBuilder = require("../../models/resume.model");
require("dotenv").config();
const { convertPageIntoPdf } = require("../../helpers/puppeteer");
const path = require("path");
const { uploadFile, downloadFile } = require("../../helpers/aws");
const fs = require("fs");
const { StatusCodes } = require("http-status-codes");
const ResumeImage = require("../../models/resumeImage.model");

exports.resumeBuilder = async (req, res) => {
  try {
    const { userId } = req.query;
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User does not exist, please register" });
    }

    const cv = new ResumeBuilder({
      userId,
      currentStage: 1,
      ...req.body,
    });

    await cv.save();
    return res
      .status(StatusCodes.CREATED)
      .json({ message: "Resume created successfully", cv });
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
};
exports.getUserResumes = async function (req, res) {
  try {
    const { userId } = req.query;
    const user = await User.findById({ _id: userId });
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User does not exist, please register" });
    }

    const cvs = await ResumeBuilder.find({ userId: userId });
    // Convert cv.userId to string for comparison

    for (var i = 0; i < cvs.length; i++) {
      if (cvs[i].userId.toString() !== userId) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ message: "Unauthorized" });
      }
    }

    return res
      .status(StatusCodes.OK)
      .json({ message: "Resumes retrieved successfully", cvs });
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
};

exports.getUserResume = async function (req, res) {
  try {
    const { resumeId, userId } = req.query;

    const cv = await ResumeBuilder.findById({ _id: resumeId });

    if (!cv) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Resume with Id does not exist" });
    }

    // Convert cv.userId to string for comparison
    if (cv.userId.toString() !== userId) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Unauthorized" });
    }

    return res
      .status(StatusCodes.OK)
      .json({ message: "Resume retrieved successfully", cv });
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
};

exports.updateUserResume = async function (req, res) {
  try {
    const { resumeId, userId } = req.query;

    const cv = await ResumeBuilder.findById({ _id: resumeId });

    if (!cv) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "CV not found" });
    }

    if (cv.userId.toString() !== userId) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Unauthorized" });
    }

    const updated = await ResumeBuilder.findByIdAndUpdate(
      resumeId,
      { ...req.body },
      { new: true }
    );

    return res.status(StatusCodes.OK).json({
      message: "Resume Updated successfully",
      updated,
    });
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
};

exports.downloadPDF = async function (req, res) {
  try {
    const { resumeId } = req.query;
    const { resumeHtml } = req.body;

    const cv = await ResumeBuilder.findById({ _id: resumeId });

    if (!cv) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "CV not found" });
    }
    // 1. Create the CV as a PDF
    const pdfBuffer = await convertPageIntoPdf(resumeHtml);

    const tmpFolderPath = path.join(__dirname, "tmp");
    await fs.promises.mkdir(tmpFolderPath, { recursive: true });

    // 2. Save the CV PDF to a local file in the 'tmp' folder
    const pdfFilePath = path.join(tmpFolderPath, `${cv.id}.pdf`);
    await fs.promises.writeFile(pdfFilePath, pdfBuffer);

    // 3. Upload the PDF file to AWS S3 and update the cv imageUrl
    const imageUrl = await uploadFile(pdfFilePath, `${cv.id}.pdf`);
    cv.resumeUrl = imageUrl;

    //4.  Remove the 'tmp' folder and its contents after successful upload
    await fs.promises.rmdir(tmpFolderPath, { recursive: true });

    // 5. Set the response headers for download from AWS S3
    const pdfContent = await downloadFile(`${cv.id}.pdf`);

    // Set the Content-Type header to application/pdf
    res.setHeader("Content-Type", "application/pdf");

    // Set the Content-Disposition header to attachment
    // This tells the browser to download the file instead of displaying it
    res.setHeader("Content-Disposition", `attachment; filename="${cv.id}.pdf"`);

    //update the resume model after the cv is downloaded
    await ResumeBuilder.findByIdAndUpdate(
      resumeId,
      {
        $set: {
          isDownloaded: true, // Set isDownloaded to true
          downloadedTime: new Date(), // Set downloadedTime to current time
        },
      },
      { new: true } // To return the updated document
    );
    // Send the PDF content as the response
    res.send(pdfContent);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { resumeId, userId } = req.query;

    const cv = await ResumeBuilder.findById({ _id: resumeId });

    if (!cv) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "CV not found" });
    }

    if (cv.userId.toString() !== userId) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Unauthorized" });
    }

    await ResumeBuilder.deleteOne({ _id: cv._id });

    return res
      .status(StatusCodes.OK)
      .json({ message: "Resume has been deleted successfully" });
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
};

exports.getResumePictures = async function (req, res) {
  try {
    const userId = req.query.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    const resumePictures = await ResumeImage.find({ userId: user.id });
    return res.status(200).json({
      message: "Resume Pictures Retrieved Successfully",
      data: resumePictures,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

exports.duplicateResume = async function (req, res) {
  try {
    const userId = req.query.userId;
    const resumeId = req.query.resumeId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    const resume = await ResumeBuilder.findById(resumeId);
    if (!resume) {
      return res.status(404).json({ message: "Resume Not Found" });
    }
    const { __v, _id, ...duplicated } = resume._doc;
    const duplicate = await ResumeBuilder.create(duplicated);
    return res
      .status(200)
      .json({ message: "Resume Duplicated Successfully", data: duplicate });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
exports.numberOfDownloadeResumes = async (req, res) => {
  try {
    const { userId } = req.query;
    const resumes = await ResumeBuilder.find({
      userId: userId,
      isDownloaded: true,
    });

    return res.status(StatusCodes.OK).json(resumes);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
};
