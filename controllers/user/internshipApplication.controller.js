const Intern = require("../../models/internshipModel");
const { StatusCodes } = require("http-status-codes");
const { uploadFile } = require("../../helpers/aws");
const CurrentEducationEnum = require("../../utils/enums/CurrentEducationEnum");

exports.internshipApplication = async (req, res) => {
  try {
    const {
      fullName,
      email,
      country,
      countryCode,
      phoneNumber,
      ageRange,
      portfolio,
      internshipType,
      preferedField,
      ...otherFields
    } = req.body;
    const cvUrls = [];

    if (
      process.env.NODE_ENV === "development" ||
      process.env.NODE_ENV === "production"
    ) {
      let cvFiles = req.files.resumes;
      // Ensure cvFiles is an array
      if (!Array.isArray(cvFiles)) {
        cvFiles = [cvFiles];
      }

      const allowedExtensions = ["pdf", "doc", "docx", "png", "jpeg", "jpg"];
      const maxSizeInBytes = 2 * 1024 * 1024;
      for (const cvFile of cvFiles) {
        try {
          const fileExtension = cvFile.name.split(".").pop();
          if (!allowedExtensions.includes(fileExtension)) {
            return res.status(StatusCodes.BAD_REQUEST).json({
              message: `Invalid file extension: ${fileExtension}`,
            });
          } else if (cvFile.size > maxSizeInBytes) {
            return res.status(StatusCodes.BAD_REQUEST).json({
              message: "File size exceeds 2MB",
            });
          }
          const cvUrl = await uploadFile(cvFile.tempFilePath, cvFile.name);
          cvUrls.push(cvUrl);
        } catch (error) {
          // Handle file upload error
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Error uploading file to S3",
            error: error.message,
          });
        }
      }
    }

    const newInternshipData = {
      fullName,
      email,
      country,
      countryCode,
      phoneNumber,
      ageRange,
      portfolio,
      resumes: cvUrls,
      internshipType,
      preferedField,
      ...otherFields,
    };

    const internshipExists = await Intern.findOne({ email: email });
    if (internshipExists) {
      return res.status(StatusCodes.CONFLICT).json({
        message: "You've already registered for Konectin's Internship Program.",
      });
    }

    const newInternship = new Intern({ ...newInternshipData });

    const savedInternship = await newInternship.save();
    res.status(StatusCodes.CREATED).json({
      data: savedInternship,
      message: "Thank you for applying for Konectin's Internship Program.",
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
