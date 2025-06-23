const mongoose = require("mongoose");
const Product = require("./models/MenuItem");
const fs = require("fs");
require("dotenv").config();

// Connect to DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to MongoDB");

    // Read JSON file
    const data = JSON.parse(fs.readFileSync("bakery.json", "utf-8"));

    // Insert data
    await Product.insertMany(data);

    console.log("Data imported successfully!");
    process.exit(); // Exit script
  })
  .catch((err) => {
    console.error("Error:", err);
    process.exit(1);
  });
