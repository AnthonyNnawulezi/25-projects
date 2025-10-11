import { useState } from "react";
import "./style.css";
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

  function addNewComment(comments, commentId, reply) {
    for (let i = 0; i < comments.length; i++) {
      let comment = comments[i];
      if (comment.id === commentId) {
        comment.children.unshift(newComment(reply));
        return true;
      }
      for (let j = 0; j < comment.children.length; j++) {
        let childComment = comment.children[j];
        addNewComment(childComment.children, commentId, reply);
      }
    }
  }

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
        <button
          onClick={() => {
            setComments([...comments, newComment(inputValue)]);
            setInputValue("");
          }}
        >
          Add Comment
        </button>
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
