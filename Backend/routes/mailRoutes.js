const express = require("express");
const router = express.Router();
const {
  createMail,
  getAllMails,
  deleteMail,
} = require("../controllers/mailController");

router.post("/", createMail);
router.get("/", getAllMails);
router.delete("/:id", deleteMail);

module.exports = router;
