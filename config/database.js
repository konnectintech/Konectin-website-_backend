const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongod;

const connectDatabase = async () => {
  try {
    if (process.env.NODE_ENV === "test") {
      mongod = await MongoMemoryServer.create();
      const uri = mongod.getUri();
      await mongoose.connect(uri);
      console.log("Using MongoMemoryServer for testing");
    } else {
      const connectionString = process.env.MONGO_DB_URI;
      await mongoose.connect(connectionString);
      console.log("Using regular MongoDB connection");
    }
  } catch (err) {
    console.error("Error connecting to the database:", err);
    throw err;
  }
};

module.exports = connectDatabase;
