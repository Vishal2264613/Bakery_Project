const mongoose = require("mongoose");

const mailSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    subject: { type: String, required: true, trim: true },
    message: { type: String, required: true },
  },
  { timestamps: true, collection: "mails" } // creates createdAt & updatedAt automatically
);

const Mail = mongoose.model("Mail", mailSchema);
module.exports = Mail;
