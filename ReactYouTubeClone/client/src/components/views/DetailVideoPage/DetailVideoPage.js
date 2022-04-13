import React, { useEffect } from "react";
import { List, Avatar, Typography, Row, Col } from "antd";
import { useState } from "react";
import Axios from "axios";
import SideBar from "./Sections/SideBar";
import Subscriber from "./Sections/Subscriber";
import Comments from "./Sections/Comments";
import LikeFeature from "./Sections/LikeFeature";

function DetailVideoPage(props) {
  const videoId = props.match.params.videoId;
  const [Video, setVideo] = useState({});
  const [CommentLists, setCommentLists] = useState([]);

  useEffect(() => {
    let data = {
      videoId: videoId,
    };
    Axios.post("/api/video/getVideo", data).then((response) => {
      if (response.data.success) {
        setVideo(response.data.video);
      } else {
        alert("Failed to get Video");
      }
    });

    Axios.post("/api/comment/getComments", data).then((response) => {
      if (response.data.success) {
        setCommentLists(response.data.comments);
      } else {
        alert("Failed to get Video");
      }
    });
  }, []);

  const updateComment = (newComment) => {
    const comments = CommentLists.concat(newComment);
    setCommentLists(comments);

  };
  if (Video.writer) {
    return (
      <Row style={{margin: "0 3rem"}}>
        <Col lg={16} xs={24}>
          <div
            className="postPage"
            style={{
              width: "100%",
              padding: "3rem 1rem",
            }}
          >
            <video
              style={{ width: "100%" }}
              src={`http://localhost:5000/${Video.filePath}`}
              controls
            ></video>

            <List.Item
              actions={[
                <LikeFeature video={Video} videoId={videoId} userId={localStorage.getItem("user_id")} />,
                <Subscriber
                  userTo={Video.writer._id}
                  userFrom={localStorage.getItem("userId")}
                />,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={Video.writer && Video.writer.image} />}
                title={Video.title}
                description={Video.description}
              ></List.Item.Meta>
            </List.Item>

            {/* Comments */}

            <Comments
              CommentLists={CommentLists}
              postId={Video._id}
              refreshFunction={updateComment}
            />
          </div>
        </Col>

        <Col lg={8} xs={24}>
          <SideBar />
        </Col>
      </Row>
    );
  } else {
    return <div>Loading ...</div>;
  }
}

export default DetailVideoPage;
