import React from "react";
import { Comment, Avatar } from "antd";
import { Form, Button, Input } from "antd";
import { useState } from "react";
import Axios from "axios";
import LikeFeature from "./LikeFeature";
import {useSelector} from "react-redux"
const { TextArea } = Input;

function SingleComment(props) {
  const [ReplyCommentValue, setReplyCommentValue] = useState("");
  const [isReply, setIsReply] = useState(false);

  const replyComment = () => {
    setIsReply(!isReply);
  };

  const action = [
    <LikeFeature comment commentId={props.comment._id} userId={localStorage.getItem("user_id")}/>,
    <span style={{marginLeft: "8px"}} onClick={replyComment} key="comment-reply">
      Reply To
    </span>,

  ];


  const user = useSelector((state) => state.user);

  const handleInputChange = (e) => {
    setReplyCommentValue(e.currentTarget.value)
  };

  const onSubmit = (e) => {

    e.preventDefault();

    const args = {
      writer: user.userData._id,
      postId: props.postId,
      responseTo: props.comment._id,
      content: ReplyCommentValue,
    };

    console.log('====================================');
    console.log("POST.....");
    console.log('====================================');
    Axios.post("/api/comment/saveComment", args).then((res) => {
        if (res.data.success) {
          console.log('====================================');
          console.log(res.data);
          console.log('====================================');
            setReplyCommentValue("")
            setIsReply(!isReply)
            props.refreshFunction(res.comment)
        } else {
            alert("Error")
        }
    });
  };

  return (
    <div>
      <Comment
        actions={action}
        author={props.comment.writer.name}
        avatar={<Avatar src={props.comment.writer.image} alt="Avatar" />}
        content={<p>{props.comment.content}</p>}
      ></Comment>

      {isReply && (
        <Form>
          <TextArea
            style={{ width: "80%", borderRadius: "5px" }}
            onChange={handleInputChange}
            placeholder="Write some comments"
            value={ReplyCommentValue}
          />
          <Button onClick={onSubmit} style={{ width: "20%", height: "52px" }}>
            Submit
          </Button>
        </Form>
      )}
    </div>
  );
}

export default SingleComment;
