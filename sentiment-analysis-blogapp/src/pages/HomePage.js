import React, { useState, useEffect }  from "react";
import BlogForm from "../components/BlogForm";
import BlogList from "../components/BlogList";
import axios from "axios";

const HomePage = () => {
    const [blogs, setBlogs] = useState([]);
  
    useEffect(() => {
      const fetchBlogs = async () => {
        const res = await axios.get("http://localhost:5000/blogs");
        setBlogs(res.data);
      };
      fetchBlogs();
    }, []);

    const headerStyle = {
      textAlign: "center",
      margin: "20px 0"
    };
  
    return (
      <div>
        <h1 style={headerStyle}>My Blog Platform</h1>
        <BlogForm setBlogs={setBlogs} />
        <BlogList blogs={blogs} />
      </div>
    );
  };
  
  export default HomePage;