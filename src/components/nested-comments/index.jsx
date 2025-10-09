import { useState } from "react";
import Comment from "./comment";

function NestedComments() {
  const [inputValue, setInputValue] = useState("");
  const [comments, setComments] = useState([
    {
      id: 1,
      title: "This is the first comment",
      children: [
        {
          id: 2,
          title: "This is a reply to the first comment",
          children: [],
        },
        {
          id: 3,
          title: "This is a reply to the second comment",
          children: [],
        },
        {
          id: 4,
          title: "This is a reply to the third comment",
          children: [],
        },
      ],
    },
  ]);

  function newComment(text) {
    return {
      id: new Date().getTime(),
      title: text,
      children: [],
    };
  }

  function addReply(commentId, reply) {
    console.log(commentId, reply);
    let updatedComments = [...comments];
    addNewComment(updatedComments, commentId, reply);
    setComments(updatedComments);
  }

  function addNewComment(comments, commentId, reply) {}

  return (
    <div className="nested-comments">
      <h1>Nested Comments</h1>
      <div className="comment-wrapper">
        <textarea
          name=""
          rows={5}
          cols={100}
          id=""
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        ></textarea>
        <br />
        <button>Add Comment</button>
      </div>
      <ul>
        {comments.map((comment) => (
          <Comment addReply={addReply} key={comment.id} comment={comment} />
        ))}
      </ul>
    </div>
  );
}

export default NestedComments;
