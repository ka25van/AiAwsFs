//title, content, if possible image

import React, {useState} from "react";
import axios from 'axios';
import "../styles/BlogForm.css";


const BlogForm = ({ setBlogs })=>{
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const [sentiment, setSentiment] = useState("");

    const handleSubmit= async(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append("content", content);
        formData.append("image", image);
    


        try {
            const response = await axios.post("http://localhost:5000/blogs", formData);
            const newBlog=response.data;
            setSentiment(newBlog.sentiment);

            // Fetch the updated list of blogsto show up in the Blog List
            const updatedBlogs = await axios.get("http://localhost:5000/blogs");
            setBlogs(updatedBlogs.data);

            //clear the form after submit
            setTitle("");
            setContent("");
            setImage(null);
          } catch (error) {
            console.error("Error submitting blog:", error);
          }
    }

    return (
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      );
    };
    
    export default BlogForm;
