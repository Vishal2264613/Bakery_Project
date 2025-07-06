const express = require("express");
const router = express.Router();
const {
  getHeroBySectionName,
  updateHeroBySectionName,
  updateHeroImageAtIndex,
  createHero,
  getAllHeroes,
} = require("../controllers/heroController");

// Get hero by section name
router.get("/:sectionName", getHeroBySectionName);

// Update hero by section name
router.put("/:sectionName", updateHeroBySectionName);

router.put("/image/:sectionName/:index", updateHeroImageAtIndex);

// Create a new hero section
router.post("/", createHero);

// Get all heroes
router.get("/", getAllHeroes);

module.exports = router;
