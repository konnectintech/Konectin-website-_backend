const mongoose = require('mongoose');

const ManualReviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  desiredJobTitle: {
    type: String,
    required: true
  },
  desiredIndustry: {
    type: String,
    required: true
  },
  interestedCompanies: {
    type: [String],
    default: []
  },
  resumeUrl: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'In Review', 'Completed'],
    default: 'Pending'
  },
  reviewerComments: {
    type: String
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

const ManualReview = mongoose.model('ManualReview', ManualReviewSchema);

module.exports = ManualReview;