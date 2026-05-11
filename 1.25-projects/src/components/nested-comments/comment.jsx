import { useState } from "react";
import "./style.css";

function Comment({ comment, key, addReply }) {
  const [reply, setReply] = useState("");
  const [showReply, setShowReply] = useState(false);

  return (
    <li key={key}>
      <span>{comment.title}</span>
      {!showReply ? (
        <button onClick={() => setShowReply(true)}>Add Reply</button>
      ) : null}
      {showReply ? (
        <div>
          <textarea
            rows={3}
            cols={20}
            value={reply}
            onChange={(e) => setReply(e.target.value)}
          ></textarea>
          <br />
          <div className="reply-button">
            <button
              onClick={() => {
                addReply(comment.id, reply);
                setReply("");
                setShowReply(false);
              }}
            >
              Submit Reply
            </button>
            <button
              onClick={() => {
                setShowReply(false);
                setReply("");
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : null}
      {comment?.children?.length > 0 ? (
        <ul>
          {comment.children.map((child) => (
            <Comment addReply={addReply} key={child.id} comment={child} />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

export default Comment;
