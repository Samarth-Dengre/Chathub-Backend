const mongoose = require("mongoose");

const VerificationSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const EmailVerification = mongoose.model(
  "EmailVerification",
  VerificationSchema
);
module.exports = EmailVerification;
