import React, { useEffect } from "react";
import { Tooltip, Icon } from "antd";
import Axios from "axios";
import { useState } from "react";

function LikeFeature(props) {
  const [LikesNumber, setLikesNumber] = useState(0);
  const [DisLikesNumber, setDisLikesNumber] = useState(0);
  const [LikeAction, setLikeAction] = useState(null);
  const [DislikeAction, setDislikeAction] = useState(null);

  let args = {};
    if (props.video) {
      args = { videoId: props.videoId, userId: props.userId };
    } else {
      args = {commentId: props.commentId, userId: props.userId}
    }

  useEffect(() => {
    
    Axios.post("/api/like/getLikes", args).then((res) => {
      if (res.data.success) {
        setLikesNumber(res.data.likes.length);
        res.data.likes.map((like) => {
          if (like.userId === props.userId) {
            setLikeAction("Liked");
          }
        });
      } else {
        alert("Failed to get likes");
      }
    });

    //
    Axios.post("/api/like/getDislikes", args).then((res) => {
      if (res.data.success) {
        setLikesNumber(res.data.dislikes.length);
        res.data.dislikes.map((dislike) => {
          if (dislike.userId === props.userId) {
            setDislikeAction("disliked");
          }
        });
      } else {
        alert("Failed to get dislikes");
      }
    });
  }, []);

  const onLike = (e) => {
    if (LikeAction !== null) {
      Axios.post("/api/like/upLike", args)
      .then(res => {
        if (res.success) {
          setLikesNumber(LikesNumber + 1);
          setLikeAction("liked")

          setDisLikesNumber(DisLikesNumber - 1)
          setDisLikesNumber(DisLikesNumber - 1)
        } else {
          alert("Failed")
        }
      })
    } else {
      Axios.post("/api/like/unLike", args)
      .then(res => {
        if (res.success) {
          setLikesNumber(LikesNumber - 1);
          setLikeAction(null)
        } else {
          
        }
      })
    }
  }

  const onDislike = (e) => {
    if (DislikeAction === null) {
      Axios.post("/api/like/upLike", args)
      .then(res => {
        if (res.success) {
          setLikesNumber(LikesNumber - 1);
          setLikeAction("liked")

          setDisLikesNumber(DisLikesNumber - 1)
          setDisLikesNumber(DisLikesNumber - 1)
        } else {
          alert("Failed")
        }
      })
    } else {
      Axios.post("/api/like/unLike", args)
      .then(res => {
        if (res.success) {
          setLikesNumber(LikesNumber - 1);
          setLikeAction(null)
        } else {
          
        }
      })
    }
  }

  return (
    <div>
      <span key="like-feature">
        <Tooltip title="Like">
          <Icon type="like" theme="filled" onClick={onLike} />
        </Tooltip>
        <span style={{ paddingLeft: "8px", cursor: "auto" }}>
          {LikesNumber}
        </span>
      </span>
      <span key="dislike-feature" style={{ paddingLeft: "8px" }}>
        <Tooltip title="DisLike">
          <Icon type="dislike" theme="outlined" onClick={onDislike} />
        </Tooltip>
        <span style={{ paddingLeft: "8px", cursor: "auto" }}>
          {DisLikesNumber}
        </span>
      </span>
    </div>
  );
}

export default LikeFeature;
