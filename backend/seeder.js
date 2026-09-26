require("dotenv").config();
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const mongoose = require("mongoose");
const connectToMongo = require("./config/db");
const seedDefaultData = require("./utils/defaultSeeder");

const runSeeder = async () => {
  try {
    await connectToMongo();
    console.log("Seeding finished successfully!");
  } catch (error) {
    console.error("Seeding execution error:", error);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
};

runSeeder();
