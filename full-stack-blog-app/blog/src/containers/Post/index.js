import React from "react";
import "./style.css";
import BlogPost from "../../components/BlogPost";
import Sidebar from "../../components/Sidebar";
import Layout from "../../components/Layout";
import blogPosts from "../../data/blog.json";


const Post = (props) => {
  return (
    <section className="container">
      <Layout>
        <BlogPost {...props} />
      </Layout>
    </section>
  );
};

export default Post;
