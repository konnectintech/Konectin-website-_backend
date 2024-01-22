const fs = require("fs");
const os = require("os");
const path = require("path");
const CoverLetter = require("../../models/coverLetter.model");
const { cloudinaryUpload } = require("../../helpers/cloudinary");
const { createPdf } = require("../../helpers/puppeteer");
const { coverLetterSchema } = require("../../helpers/validator");

async function createLetter(request, response) {
    try {
        const user = request.user;
        const { error, value } = coverLetterSchema.validate(request.body);

        if (!user) {
            return response.status(401).json({
                status: false,
                message: "Invalid access token",
            });
        }
        if (error) {
            return response.status(422).json({
                status: false,
                error: "Kindly provide a professional cover letter. A professional cover letter contains at least 250 characters",
            });
        }

        const savedLetter = await CoverLetter.findOne({ userId: user._id });

        const directoryPath = os.tmpdir();
        const filePath = path.join(directoryPath, `${user._id}-letter.pdf`);

        await createPdf(undefined, filePath, value.letter);
        const downloadUrl = await cloudinaryUpload(filePath);
        fs.unlinkSync(filePath);

        if (savedLetter) {
            try {
                const coverLetter = await CoverLetter.findByIdAndUpdate(
                    savedLetter._id,
                    { letter: value.letter, downloadUrl: downloadUrl },
                    { new: true }
                );

                return response.status(202).json({
                    status: true,
                    message: "Successfully updated your cover letter",
                    data: coverLetter,
                });
            } catch (err) {
                return response.status(500).json({
                    status: false,
                    error: "An error occured while trying to update your cover letter. Try again!",
                });
            }
        }

        try {
            const coverLetter = new CoverLetter({
                userId: user._id,
                letter: value.letter,
                downloadUrl: downloadUrl,
            });
            await coverLetter.save();

            return response.status(201).json({
                status: true,
                message: "Successfully created your cover letter",
                data: coverLetter,
            });
        } catch (err) {
            return response.status(500).json({
                status: false,
                error: "An error occured while trying to save your cover letter. Try again!",
            });
        }
    } catch (err) {
        return response.status(500).end();
    }
}

module.exports = { createLetter };
