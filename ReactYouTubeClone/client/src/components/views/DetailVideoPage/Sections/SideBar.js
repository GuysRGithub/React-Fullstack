import React from "react";
import { useEffect, useState } from "react";
import Axios from "axios";

function SideBar() {
  const [Videos, setVideos] = useState([]);

  useEffect(() => {
    Axios.get("/api/video/getVideos").then((response) => {
      if (response.data.success) {
        setVideos(response.data.videos);
      } else {
        alert("Failed to load Videos");
      }
    });
  }, []);

  const showSideVideos = Videos.map((video, index) => {
    let minutes = Math.floor(video.duration / 60)
      .pad(2)
      .toString();
    let seconds = Math.floor(video.duration - minutes * 60);
    return (
      <div style={{ display: "flex", marginTop: "1rem", padding: "0 1rem" }}>
        <div style={{ width: "60%", marginRight: "1rem", position: "relative" }}>
          <a href={`/video/${video._id}`}>
            <img src={`http://localhost:5000/${video.thumbnail}`} alt="Thumbnail" style={{ width: "100%", height: "80%" }}/>
          </a>
          <div
                className="duration"
                style={{
                  bottom: "20%",
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
        </div>
        <div style={{ width: "50%" }}>
          <a href={`/video/${video._id}`} style={{ color: "gray" }}>
            <span style={{ fontSize: "1rem", color: "black" }}>{video.title}</span> <br/>
            <span>{video.writer.name}</span><br />
            <span>{video.views} views</span><br />
            {/* <span>{minutes}:{seconds}</span><br /> */}
          </a>
        </div>
      </div>
    );
  });

  return (
    <>
      <div style={{ marginTop: "3rem" }}></div>
      {showSideVideos}
    </>
  );
}

export default SideBar;
