const B2BApplication = require("../../models/B2B.model");
const { StatusCodes } = require("http-status-codes");
const { uploadFile } = require("../../helpers/aws");

exports.partnershipApplication = async (req, res) => {
  try {
    const { fullName, email, country, phoneNumber, ...otherFields } = req.body;

    // Convert mouConfirmed to a boolean
    const mouConfirmed =
      req.body.mouConfirmed === "true" || req.body.mouConfirmed === true;

    if (!mouConfirmed) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message:
          "You have to confirm that you have read and acknowledged the Memorandum of Understanding (MOU)",
      });
    }

    const folderName = "Partnership";
    let logoUrl = null;

    if (
      process.env.NODE_ENV === "development" ||
      process.env.NODE_ENV === "production"
    ) {
      let logoFile = req.files.logo;

      const allowedExtensions = ["pdf", "doc", "docx", "png", "jpeg", "jpg"];
      const maxSizeInBytes = 2 * 1024 * 1024;

      try {
        const fileExtension = logoFile.name.split(".").pop();
        if (!allowedExtensions.includes(fileExtension)) {
          return res.status(StatusCodes.BAD_REQUEST).json({
            message: `Invalid file extension: ${fileExtension}`,
          });
        } else if (logoFile.size > maxSizeInBytes) {
          return res.status(StatusCodes.BAD_REQUEST).json({
            message: "File size exceeds 2MB",
          });
        }
        logoUrl = await uploadFile(
          logoFile.tempFilePath,
          `${folderName}/${logoFile.name}`
        );
      } catch (error) {
        // Handle file upload error
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          message: "Error uploading file to S3",
          error: error.message,
        });
      }
    }

    const newPartnerData = {
      fullName,
      email,
      country,
      phoneNumber,
      logo: logoUrl,
      ...otherFields,
    };

    const parnershipExists = await B2BApplication.findOne({
      email: email,
    });
    if (parnershipExists) {
      return res.status(StatusCodes.CONFLICT).json({
        message: "You've already registered",
      });
    }

    const newPartner = new B2BApplication({ ...newPartnerData });

    const savedPartner = await newPartner.save();

    return res.status(StatusCodes.CREATED).json({
      data: savedPartner,
      message: "Your request has been submitted successfully",
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
