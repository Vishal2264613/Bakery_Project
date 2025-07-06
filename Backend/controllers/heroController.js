const Hero = require("../models/Hero");

// GET /api/hero/:sectionName
exports.getHeroBySectionName = async (req, res) => {
  try {
    const hero = await Hero.findOne({ sectionName: req.params.sectionName });
    if (!hero) {
      return res.status(404).json({ message: "Hero section not found" });
    }
    res.json(hero);
  } catch (error) {
    res.status(500).json({ message: "Error fetching hero section", error });
  }
};

// PUT /api/hero/:sectionName
exports.updateHeroBySectionName = async (req, res) => {
  const { heading, description, image_urls, opening_hours, content } = req.body;

  try {
    const hero = await Hero.findOne({ sectionName: req.params.sectionName });

    if (!hero) {
      return res.status(404).json({ message: "Hero section not found" });
    }

    if (heading) hero.heading = heading;
    if (description) hero.description = description;
    if (Array.isArray(image_urls) && image_urls.length > 0) {
      hero.image_urls = image_urls;
    }
    if (opening_hours && typeof opening_hours === "object") {
      hero.opening_hours = opening_hours;
    }
    if (Array.isArray(content)) {
      hero.content = content;
    }

    const updatedHero = await hero.save();
    res.json(updatedHero);
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    res.status(500).json({ message: "Failed to update hero section", error });
  }
};

// POST /api/hero
exports.createHero = async (req, res) => {
  const {
    sectionName,
    heading,
    description,
    image_urls,
    opening_hours,
    content,
  } = req.body;

  if (!sectionName) {
    return res.status(400).json({ message: "sectionName is required" });
  }

  if (!Array.isArray(image_urls) || image_urls.length === 0) {
    return res
      .status(400)
      .json({ message: "At least one image URL is required" });
  }

  try {
    const existing = await Hero.findOne({ sectionName });
    if (existing) {
      return res.status(409).json({ message: "Hero section already exists" });
    }

    const newHero = new Hero({
      sectionName,
      heading,
      description,
      image_urls,
      opening_hours,
      content,
    });

    const saved = await newHero.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: "Failed to create hero section", error });
  }
};

// GET /api/hero
exports.getAllHeroes = async (req, res) => {
  try {
    const allHeroes = await Hero.find();
    res.json(allHeroes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching hero sections", error });
  }
};

// PUT /api/hero/image/:sectionName/:index
exports.updateHeroImageAtIndex = async (req, res) => {
  const { sectionName, index } = req.params;
  const { newImageUrl } = req.body;

  try {
    const hero = await Hero.findOne({ sectionName });

    if (!hero) {
      return res.status(404).json({ message: "Hero section not found" });
    }

    if (
      !Array.isArray(hero.image_urls) ||
      index < 0 ||
      index >= hero.image_urls.length
    ) {
      return res.status(400).json({ message: "Invalid image index" });
    }

    hero.image_urls[index] = newImageUrl;

    const updated = await hero.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update image", error });
  }
};
