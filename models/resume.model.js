const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
  },
  resumeUrl: {
    type: String,
  },
  basicInfo: {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    country: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    zipCode: {
      type: String,
    },
    profession: {
      type: String,
    },
    phoneCode: {
      type: String,
    },
    expertise: {
      id: { type: Number },
      name: { type: String },
      text: { type: String }
    },
  },
  jobExperience: [
    {
      jobTitle: {
        type: String,
      },
      company: {
        type: String,
      },
      country: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      startMonth: {
        type: String,
      },
      startYear: {
        type: String,
      },
      endMonth: {
        type: String,
      },
      endYear: {
        type: String,
      },
      workDesc: {
        type: String,
      },
      current: Boolean,
    },
  ],
  education: [
    {
      city: String,
      country: String,
      degree: String,
      startMonth: String,
      startYear: Number,
      schoolName: String,
      state: String,
      endMonth: String,
      endYear: String,
      awards: [{ name: String }],
      relevantCourses: [{ name: String }],
      current: Boolean,
      type: { type: String },
      instituteType: { type: String },
      qualifications: [{ type: String }]
    },
  ],
  skills: [
    {
      name: String,
      lvl: String,
    },
  ],
  currentEditedJob: { type: Number },
  currentEditedEducation: { type: Number },
  bio: { type: String },
  selectedTemplate: {
    name: { type: String },
    id: { type: String },
    themeSet: [{ type: String }]
  },
  currentStage: {
    type: Number,
  },
  isDownloaded: {
    type: Boolean,
    default: false,
  },
  downloadedTime: {
    type: Date,
  },
  templateDetails: {
    fontType: { type: String },
    fontSize: { type: String },
    colour: { type: String },
  },
  resumeImage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ResumeImage"
  },
  additionalInformation: {
    awards: [
      {
        title: String,
        organization: String,
        awardYear: String,
        description: String
      }
    ],
    certificates: [
      {
        name: String,
        authority: String,
        license: String,
        startDate: Date,
        endDate: Date
      }
    ],
    hobbies: [String],
    languages: [String],
    projects: [
      {
        title: String,
        description: String,
        role: String,
        link: String,
        duration: String
      }
    ]
  },
  theme: {
    color: { type: String },
    font: {
      family: { type: String },
      size: {
        heading: { type: String },
        paragraph: { type: String }
      },
      weight: { type: String }
    }
  },
  image: {
    show: { type: Boolean },
    value: { type: String }
  },
});

module.exports = mongoose.model("ResumeBuilder", resumeSchema);
