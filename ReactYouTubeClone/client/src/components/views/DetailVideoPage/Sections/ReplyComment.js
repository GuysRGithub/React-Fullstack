import React, { useEffect, useState } from "react";
import SingleComment from "./SingleComment";

function ReplyComment(props) {
  const [CommentCount, setCommentCount] = useState(0);
  const [ToggleReplyCommentOpen, setToggleReplyCommentOpen] = useState(false);
  useEffect(() => {
    let commentCount = 0;
    props.CommentLists.map((comment) => {
      if (comment && comment.responseTo === props.parentCommentId) {
        commentCount++;
      }
    });
    setCommentCount(commentCount);
  }, [props.CommentLists, props.parentCommentId]);

  const onViewMoreCommentClick = (e) => {
    setToggleReplyCommentOpen(!ToggleReplyCommentOpen);
  };

  const renderReplyComments = () => {
    return (
      props.CommentLists &&
      props.CommentLists.map((comment, index) => (
        <>
          {comment.responseTo === props.parentCommentId && (
            <div style={{ marginLeft: "50px", width: "80%" }}>
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
            </div>
          )}
        </>
      ))
    );
  };

  return (
    <div>
      {CommentCount > 0 && (
        <p
          style={{
            fontSize: "14px",
            margin: "16px",
            color: "grey",
            cursor: "pointer",
          }}
          onClick={onViewMoreCommentClick}
        >
          {ToggleReplyCommentOpen
            ? `Hide comment(s)`
            : `View ${CommentCount} more comment(s)`}
        </p>
      )}

      {ToggleReplyCommentOpen && renderReplyComments()}
    </div>
  );
}

export default ReplyComment;
