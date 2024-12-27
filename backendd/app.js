const express = require('express');
const mongoose =require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv')

const blogRoutes = require('./routes/blogs');
const authRoutes = require('./routes/auth')

dotenv.config()
const port = process.env.PORT || 5000;

const app =express();

app.use(cors());
app.use(express.json());
app.get("/", ()=> console.log("Hi Backend"))
app.use('/blogs', blogRoutes);
app.use('/auth', authRoutes);
app.use("/uploads", express.static("uploads")); // Serve files in the 'uploads' folder


mongoose.connect(process.env.MONGODB_URL)
        .then(()=> console.log("Mongoose Connected"))
        .catch((err)=> console.log(err))

app.listen(port, ()=> console.log("Server Running"))