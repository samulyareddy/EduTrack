//require("dotenv").config();
// const mongoose = require("mongoose");
// const mongoURI = process.env.MONGODB_URI;

// const connectToMongo = () => {
//   mongoose
//     .connect(mongoURI, { useNewUrlParser: true })
//     .then(() => {
//       console.log("Connected to MongoDB Successfully");
//     })
//     .catch((error) => {
//       console.error("Error connecting to MongoDB", error);
//     });
// };


// module.exports = connectToMongo;
const mongoose = require("mongoose");
const dns = require("dns");

// Force Node.js DNS resolver to use reliable public DNS servers.
// Many Windows networks / local ISP routers fail or reject DNS SRV queries (querySrv ECONNREFUSED).
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;

    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log("Connected to MongoDB Successfully");

    // Automatically check and seed default data if database is empty
    const seedDefaultData = require("../utils/defaultSeeder");
    await seedDefaultData();
  } catch (error) {
    console.error("Error connecting to MongoDB:");
    console.error(error);
  }
};

module.exports = connectDB;