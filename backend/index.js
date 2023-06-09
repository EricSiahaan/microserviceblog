const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
require('dotenv').config()
const multer = require('multer');
const path = require('path');
const cors = require('cors')

const app = express();

const blogRoutes = require("./src/routes/blog");
const userRoutes = require('./src/routes/user.js')

//untuk menentukan lokasi penyimpanan
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + '-' + file.originalname)
  }
})

// validasi untuk create photo
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/jpg') {

    cb(null, true)
  } else {
    cb(null, false)
  }
}

//middleware
app.use(cors())
app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'))

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE,PATCH,OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Header", "Content-Type, Authorization");
  next();
});

// app.use("/v1/customer", productRoutes);
// app.use("/v1/auth", authRoutes);
app.use("/v1/blog", blogRoutes);
app.use("/v1/", userRoutes);

app.use((error, req, res, next) => {
  const status = error.errorStatus || 400;
  const message = error.message;
  const data = error.data

  res.status(status).json({ message: message, data: data })
});


// connect dengan database
mongoose.connect(`${process.env.MONGO_URI}`, { useNewUrlParser: true })
  .then(() => {
    app.listen(4000, () => console.log('Connection Succes'));

  })
  .catch(err => console.log(err))

