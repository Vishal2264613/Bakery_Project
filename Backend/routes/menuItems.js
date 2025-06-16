const express = require("express");
const router = express.Router();
const controller = require("../controllers/menuItemController");

router.get("/", controller.getAllMenuItems);
router.post("/", controller.createMenuItem);
router.put("/:id", controller.updateMenuItem);
router.delete("/:id", controller.deleteMenuItem);

module.exports = router;
