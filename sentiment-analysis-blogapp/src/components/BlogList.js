import React from "react";
import "../styles/BlogList.css"


const BlogList=({blogs})=>{
    const headerStyle = {
        textAlign: "center",
        margin: "20px 0"
      };
return(
    <div>
        <h2 style={headerStyle}>My Blog List</h2>
        <ul>
            {blogs.map((blog)=>(//don't use {} orelse you won't get the data
                <li key={blog._id}>
                    <p><b>Title:</b> {blog.title}</p>
                    <p><b>Content: </b>{blog.content}</p>
                    <p><b>Sentiment:</b> {blog.sentiment}</p>
                    <img src={`http://localhost:5000/${blog.imageUrl}`} alt="Blog" style={{ width: "200px", height: "auto" }}></img>
                </li>

            ))}
        </ul>
    </div>
)
}

export default BlogList;