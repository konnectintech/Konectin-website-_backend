const mongoose = require("mongoose");
const UserRoleEnum = require("../utils/userRoleEnum");
const validator = require("validator");
const {
  validateGitHub,
  validateFacebook,
  validateInstagram,
  validateLinkedInProfile,
  validateMediumProfile,
} = require("../utils/socialMediaValidations");

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return validator.isEmail(v);
        },
        message: (props) => `${props.value} is not a valid email address.`,
      },
    },
    password: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    typeOfUser: {
      type: String,
      enum: Object.values(UserRoleEnum),
      default: UserRoleEnum.REGULAR,
    },
    notificationSettings: {
      emails: {
        type: Boolean,
        default: true,
      },
      pushNotifications: {
        type: Boolean,
        default: true,
      },
    },
    socials: {
      github: {
        type: String,
        validate: {
          validator: validateGitHub,
          message: (props) => `${props.value} is not a valid GitHub URL.`,
        },
      },
      facebook: {
        type: String,
        validate: {
          validator: validateFacebook,
          message: (props) => `${props.value} is not a valid Facebook URL.`,
        },
      },
      instagram: {
        type: String,
        validate: {
          validator: validateInstagram,
          message: (props) => `${props.value} is not a valid Instagram URL.`,
        },
      },
      linkedin: {
        type: String,
        validate: {
          validator: validateLinkedInProfile,
          message: (props) => `${props.value} is not a valid LinkedIn URL.`,
        },
      },
      medium: {
        type: String,
        validate: {
          validator: validateMediumProfile,
          message: (props) => `${props.value} is not a valid Medium URL.`,
        },
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);
