import React from "react";
import { Card, Avatar, Col, Typography, Row } from "antd";
import { useEffect } from "react";
import Axios from "axios";
import { useState } from "react";
import moment from "moment";

const { Title } = Typography;
const { Meta } = Card;

Number.prototype.pad = function (size) {
  let s = String(this);
  while (s.length < (size || 2)) {
    s = "0" + s;
  }
  return s;
};

String.prototype.pad = function (size) {
  let s = String(this);
  while (s.length < (size || 2)) {
    s = "0" + s;
  }
  return s;
};
function LandingPage() {
  const [Videos, setVideos] = useState([]);
  useEffect(() => {
    Axios.get("/api/video/getVideos").then((response) => {
      if (response.data.success) {
        console.log("====================================");
        console.log(response.data.videos);
        console.log("====================================");
        setVideos(response.data.videos);
      } else {
        alert("Failed to load Videos");
      }
    });
  }, []);

  const renderVideos = () =>
    Videos.map((video, index) => {
      let minutes = Math.floor(video.duration / 60);
      let seconds = Math.floor(video.duration - minutes * 60);
      return (
        <Col lg={6} md={12} xs={24}>
          <div style={{ position: "relative" }}>
            <a href={`/video/${video._id}`}>
              <img
                src={`http://localhost:5000/${video.thumbnail}`}
                alt="Thumbnail Video"
                style={{ width: "100%" }}
              />
              <div
                className="duration"
                style={{
                  bottom: "0",
                  right: "0",
                  position: "absolute",
                  margin: "4px",
                  color: "#fff",
                  backgroundColor: "",
                  padding: "2px 4px",
                  borderRadius: "2px",
                  letterSpacing: "0.5px",
                  fontSize: "16px",
                  lineHeight: "16px",
                  fontWeight: "600",
                }}
              >
                <span>{`${minutes.pad()}:${seconds.pad()}`}</span>
              </div>
            </a>
          </div>
          <Meta
            style={{ marginTop: "3px" }}
            avatar={video.writer && <Avatar src={video.writer.image} />}
            title={video.title}
          />
          <h4 style={{fontWeight: "300 !important", marginTop: "6px"}}>{video.writer.name}</h4>
          <span>
            {video.views} views - {moment(video.createdAt).format("MM Do YYYY")}
          </span>
        </Col>
      );
    });

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <Title level={2}>Recommended</Title>
      <hr />
      <Row>{renderVideos()}</Row>
    </div>
  );
}

export default LandingPage;
