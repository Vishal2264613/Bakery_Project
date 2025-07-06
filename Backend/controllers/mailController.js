const Mail = require("../models/Mail");

const createMail = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newMail = new Mail({ name, email, subject, message });
    await newMail.save();

    res.status(201).json({ message: "Mail sent successfully", mail: newMail });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const getAllMails = async (req, res) => {
  try {
    const mails = await Mail.find().sort({ createdAt: -1 });
    res.json(mails);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const deleteMail = async (req, res) => {
  try {
    const mail = await Mail.findByIdAndDelete(req.params.id);
    if (!mail) {
      return res.status(404).json({ error: "Mail not found" });
    }
    res.json({ message: "Mail deleted" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { createMail, getAllMails, deleteMail };
