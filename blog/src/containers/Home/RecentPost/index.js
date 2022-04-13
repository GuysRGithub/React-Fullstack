import React from "react";
import Card from "../../../components/UI/Card";
import "./style.css";
import blogPost from "../../../data/blog.json";

const RecentPost = (props) => {
  return (
    <div style={props.style}>
      {blogPost.data.map((post) => (
        <Card style={{ marginBottom: "20px" }}>
          <div className="postImageWrapper">
            <img
              src={require("../../../assets/images/posts/" + post.blogImage)}
              alt="Home Post"
            />
          </div>

          <div className="postContent">
            <span className="feature">{post.blogCategory}</span>
            <h2>{post.blogTitle}</h2>
            <span>
              posted on <strong>{post.postedOn}</strong> by
              <strong>{post.author}</strong>
            </span>
            <p>
              {post.blogText.slice(0, 200) + "..."}
            </p>

            <button>Read More</button>
          </div>
        </Card>
      ))}

      <Card style={{ marginBottom: "20px" }}>
        <div className="postImageWrapper">
          <img
            src={require("../../../assets/images/posts//cestovat-chladny-dno-jednoduchost-2868847.jpg")}
            alt="Home Post"
          />
        </div>

        <div className="postContent">
          <span className="feature">Featured</span>
          <h2>Fitness Mantra To Live Life</h2>
          <span>
            posted on <strong>July 21, 2018</strong> by{" "}
            <strong>Sora Blogging Tips</strong>
          </span>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
            adipisci temporibus voluptatum, veniam non, maxime architecto iste
            iure ipsam, molestiae illum tempore maiores est perferendis ullam
            quam. Similique, labore repellendus....
          </p>

          <button>Read More</button>
        </div>
      </Card>
    </div>
  );
};

export default RecentPost;
