import React, { useState } from "react";
import { Form, Button, Input } from "antd";
import Axios from "axios";
import SingleComment from "./SingleComment";
import ReplyComment from "./ReplyComment";
import { useSelector } from "react-redux";
const { TextArea } = Input;

function Comments(props) {
  const user = useSelector((state) => state.user);

  const [CommentContent, setCommentContent] = useState("");
  const handleInputChange = (e) => {
    setCommentContent(e.currentTarget.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const args = {
      content: CommentContent,
      writer: user.userData._id,
      postId: props.postId,
    };
    Axios.post("/api/comment/saveComment", args).then((res) => {
      if (res.data.success) {
        setCommentContent("");
        console.log('====================================');
        console.log(res.data);
        console.log('====================================');
        props.refreshFunction(res.data.comment);
      } else {
        alert("Failed to submit comment");
      }
    });
  };

  return (
    <div>
      <br />
      {/* {props.CommentLists && <p>{props.CommentLists.length} Replies</p>} */}
      {/* Comment here */}

      {props.CommentLists &&
        props.CommentLists.map(
          (comment, index) =>
            (comment && comment.responseTo === undefined) && (
              <>
                <SingleComment
                  postId={props.postId}
                  refreshFunction={props.refreshFunction}
                  comment={comment}
                />
                <ReplyComment
                  CommentLists={props.CommentLists}
                  postId={props.postId}
                  refreshFunction={props.refreshFunction}
                  parentCommentId={comment._id}
                />
              </>
            )
        )}

      <hr />
      {/* Form */}
      <Form onSubmit={onSubmit}>
        <TextArea
          style={{ width: "80%", borderRadius: "5px" }}
          onChange={handleInputChange}
          placeholder="Write some comments"
          value={CommentContent}
        />
        <Button onClick={onSubmit} style={{ width: "20%", height: "52px" }}>
          Submit Comment
        </Button>
      </Form>
    </div>
  );
}

export default Comments;
