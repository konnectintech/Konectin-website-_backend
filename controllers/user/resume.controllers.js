const User = require("../../models/user.model");
const resume = require("../../models/resume.model");
const pdf = require("html-pdf");
require("dotenv").config();

const { resumeSchema, resumeUpdateSchema } = require("../../helpers/resumeValidate");


exports.resumeBuilder = async (req, res) => {
    try {
        const { userId } = req.query;
        const user = await User.findById({ _id: userId });
        if (!user) {
            return res
                .status(400)
                .json({ message: "User does not exist, please register" });
        }
        const { error, value } = resumeSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ Error: error.details[0].message });
        }

        const cv = new resume({
            userId,
            currentStage: 1,
            ...value,
        });

        await cv.save();
        return res
            .status(201)
            .json({ message: "Resume created successfully", cv });
    } catch (err) {
        console.error(err);
        return res
            .status(500)
            .json({ message: "Server error, try again later!" });
    }
};
exports.getUserResumes = async function (req, res) {
    try {
        const { userId } = req.query;
        const user = await User.findById({ _id: userId });
        if (!user) {
            return res
                .status(400)
                .json({ message: "User does not exist, please register" });
        }
        cvs = await resume.find({ userId: userId });

        return res
            .status(200)
            .json({ message: "Resumes retrieved successfully", cvs });
    } catch (err) {
        console.error(err);
        return res
            .status(500)
            .json({ message: "Server error, try again later!" });
    }
};

exports.getUserResume = async function (req, res) {
    try {
        const { userId, resumeId } = req.query;
        const user = await User.findById({ _id: userId });
        if (!user) {
            return res
                .status(400)
                .json({ message: "User does not exist, please register" });
        }
        const cv = await resume.findById(resumeId);
        if (!cv) {
            return res
                .status(400)
                .json({ message: "Resume with Id does not exist" });
        }

        return res
            .status(200)
            .json({ message: "Resume retrieved successfully", cv });
    } catch (err) {
        console.error(err);
        return res
            .status(500)
            .json({ message: "Server error, try again later!" });
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
            return res
                .status(400)
                .json({ message: "Resume with Id does not exist" });
        }

        return res
            .status(200)
            .json({ message: "Resume Updated successfully", cv });
    } catch (err) {
        console.error(err);
        return res
            .status(500)
            .json({ message: "Server error, try again later!" });
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
        resume.findByIdAndUpdate(resumeId, { currentStage: 6 })
        const buffer = await createPdf(html);
        res.type("pdf");
        return res.end(buffer, "binary");
    } catch (err) {
        console.error(err);
        return res
            .status(500)
            .json({ message: "Server error, try again later!" });
    }
};