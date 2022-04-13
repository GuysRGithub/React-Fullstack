import React from "react";
import "./style.css";
import Card from "../../components/UI/Card";
import Sidebar from "../../components/Sidebar";
import RecentPost from "./RecentPost";
import blogData from "../../data/blog.json";
import Layout from "../../components/Layout";

const Home = (props) => {
  const ImageGallargy = (props) => (
    <div className="gallaryPost" style={props.gallaryStyle}>
      <section className="postGallaryImage" style={{ width: "70%" }}>
        <div>
          <img
            src={require("../../assets/images/posts/" + props.imagesArray[2])}
            alt="Home"
          />
        </div>
      </section>
      <section className="sideImageWrapper" style={{ width: "30%" }}>
        <SideImage
          height={sideImageHeight}
          source={require("../../assets/images/posts/" + props.imagesArray[1])}
        />
        <SideImage
          height={sideImageHeight}
          source={require("../../assets/images/posts/" + props.imagesArray[2])}
        />
        <SideImage
          height={sideImageHeight}
          source={require("../../assets/images/posts/" + props.imagesArray[4])}
        />
      </section>
    </div>
  );

  const SideImage = (props) => {
    return (
      <div style={{ height: `${props.height}px` }}>
        <img src={props.source} alt="Home" />
      </div>
    );
  };

  const gallaryHeight = 450;

  const gallaryStyle = {
    height: gallaryHeight + "px",
    overflow: "hidden",
  };

  const sideImageHeight = gallaryHeight / 3;

  const imgArray = blogData.data.map((post) => post.blogImage);

  return (
    <div>
      <Card>
        <ImageGallargy
          largeWidth="70%"
          smallWidth="30%"
          sideImageHeight={sideImageHeight}
          gallaryStyle={gallaryStyle}
          imagesArray={imgArray}
        />
      </Card>
      <section className="homeContainer">
        <Layout>
          <RecentPost style={{ width: "70%" }} />
        </Layout>
      </section>
    </div>
  );
};

export default Home;
