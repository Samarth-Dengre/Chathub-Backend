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

VerificationSchema.index({ createdAt: 1 }, { expireAfterSeconds: 180 });

const EmailVerification = mongoose.model(
  "EmailVerification",
  VerificationSchema
);
module.exports = EmailVerification;
