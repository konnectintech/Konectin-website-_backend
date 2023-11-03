const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
require('dotenv').config();
const logger = require('morgan');
const userRoutes = require("./routes");
const adminRoutes = require("./routes/admin")
const expressFileUpload = require('express-fileupload');
const moment = require("moment-timezone")

// set the default timezone to West African Standard Time
moment.tz.setDefault("Africa/Lagos");

const port = process.env.PORT;

const app = express();

process.env.NODE_ENV === 'development'
  ? mongoose
    .connect(process.env.MONGO_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log('Local DB connected successfully'))
    .catch((err) => {
      console.log(err);
    })
  : mongoose
    .connect(process.env.MONGO_DB_URI_CLOUD)
    .then(() => {
      console.log('Cloud DB connected successfully');
    })
    .catch((err) => {
      console.log({ err });
    });

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressFileUpload({ limits: { fileSize: 5 * 1024 * 1024 },useTempFiles: true }));

app.get('/', (request, response) => {
  response.json({ message: 'Welcome to Konectin!' });
});

app.use('/user', userRoutes);
app.use('/admin',adminRoutes);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
