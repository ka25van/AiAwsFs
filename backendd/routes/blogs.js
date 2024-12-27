const express = require("express");
const multer = require("multer");
const Blog = require("../models/blogsModel");
const fetchSentiment =require('../utils/fetchSentiment');
const dotenv = require("dotenv");
// const uploadToS3 = require("../utils/awsUploader");

dotenv.config();
const router = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, content } = req.body;

    const sentiment = await fetchSentiment(content);

    // Upload the file to AWS S3
    // const s3UploadResult = await uploadToS3(req.file.path, req.file.filename);

    // // Create a new blog post in the database
    const blog = new Blog({
      title,
      content,
      imageUrl: req.file.path.replace(/\\/g, "/"),
      sentiment,
    });

    await blog.save();

    res.status(201).json({ message: "Blog created successfully!", blog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating blog post" });
  }
});

router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching blogs" });
  }
});

module.exports = router;
