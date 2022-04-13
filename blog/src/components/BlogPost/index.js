import React, { useState, useEffect } from "react";
import "./style.css";
import Card from "../UI/Card";
import blogPost from "../../data/blog.json";

const BlogPost = (props) => {
  const [post, setPost] = useState({
    id: "",
    blogCategory: "",
    blogTitle: "",
    slug: "",
    postedOn: "",
    author: "",
    blogImage: "",
    blogText: "",
  });

  /*eslint eqeqeq: "off"*/
  useEffect(() => {
    const postId = props.match.params.postId;
    const post = blogPost.data.find((post) => post.id == postId);
    setPost(post);
    console.log(`../../assets/images/posts/${post.blogImage}`);
  }, [props.match.params.postId]);

  if (post.blogImage == "") return null

  return (
    <div className="blogPostContainer">
      <Card>
        <div className="blogHeader">
          <span className="blogCategory">{post.blogCategory}</span>
          <h1 className="postTitle">{post.blogTitle}</h1>
          <span className="postBy">
            posted on {post.postedOn} by {post.author}
          </span>
        </div>
        <div className="postImageContainer">
          <img
            src={require(`../../assets/images/posts/${post.blogImage}`)}
            alt="Post"
          />
        </div>

        <div className="postContent">
          <h3>Post Title</h3>
          <p>{post.blogText}</p>
        </div>
      </Card>
    </div>
  );
};

export default BlogPost;
