require("dotenv").config();
const express = require("express");
const cors = require("cors");
const volleyball = require("volleyball");
const multer = require("multer");
const fs = require("fs");
const clc = require("cli-color");
const responseHandler = require("./src/helpers/responseHandler");
const app = express();

app.use(volleyball);
//* Define the PORT & API version based on environment variable
const adminRoute = require("./src/routes/admin");
const careerRoute = require("./src/routes/career");
const eventRoute = require("./src/routes/event");
const newsRoute = require("./src/routes/news");
const reportRoute = require("./src/routes/report");
const userRoute = require("./src/routes/user");
const galleryRoute = require("./src/routes/gallery");
const { PORT, API_VERSION, NODE_ENV } = process.env;
//* Enable Cross-Origin Resource Sharing (CORS) middleware
app.use(cors());
//* Parse JSON request bodies
app.use(express.json());
//* Set the base path for API routes
const BASE_PATH = `/api/${API_VERSION}`;
//* Import database connection module

app.use(`${BASE_PATH}/admin`, adminRoute);
app.use(`${BASE_PATH}/career`, careerRoute);
app.use(`${BASE_PATH}/event`, eventRoute);
app.use(`${BASE_PATH}/news`, newsRoute);
app.use(`${BASE_PATH}/gallery`, galleryRoute);
app.use(`${BASE_PATH}/report`, reportRoute);
app.use(`${BASE_PATH}/user`, userRoute);
require("./src/helpers/connection");

//? Define the directory where the files will be uploaded
const uploadDir = "./upload";
//? Serve static files from the oman folder
app.use("/images", express.static(uploadDir));

//? Ensure the directory exists, if not, create it
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

//? Set up multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

//? Set up multer middleware
const upload = multer({ storage });

//? Create a simple POST route for file upload
app.post(`${BASE_PATH}/upload`, upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  return responseHandler(
    res,
    200,
    "File uploaded successfully",
    req.file.filename
  );
});

//? Define a route for the API root
app.get(BASE_PATH, (req, res) => {
  return responseHandler(
    res,
    200,
    "🛡️ Welcome! All endpoints are fortified. Do you possess the master 🗝️?"
  );
});

app.all("*", (req, res) => {
  return responseHandler(res, 404, "No API Found..!");
});

//! Start the server and listen on the specified port from environment variable
app.listen(PORT, () => {
  const portMessage = clc.redBright(`✓ App is running on port: ${PORT}`);
  const envMessage = clc.yellowBright(
    `✓ Environment: ${NODE_ENV || "development"}`
  );
  console.log(`${portMessage}\n${envMessage}`);
});
