const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
require("dotenv").config();
const logger = require("morgan");
const userRoutes = require("./routes");
const adminRoutes = require("./routes/admin");
const expressFileUpload = require("express-fileupload");
const moment = require("moment-timezone");
const connectDatabase = require("./config/database");

// set the default timezone to West African Standard Time
moment.tz.setDefault("Africa/Lagos");

const port = process.env.PORT;

connectDatabase();
const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  expressFileUpload({
    limits: { fileSize: 5 * 1024 * 1024 },
    useTempFiles: true,
  })
);

app.get("/", (request, response) => {
  response.json({ message: "Welcome to Konectin!" });
});

app.use("/user", userRoutes);
app.use("/admin", adminRoutes);

const server = app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

module.exports = { app, server };
