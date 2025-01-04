import { useState } from "react";
import Comment from "./Comment";
import CommentReply from "./CommentReply";

import { comments as commentsJson } from "../assets/data.json";

export default function Comments() {
  const [comments] = useState(commentsJson);

  return (
    <div className="space-y-5">
      {comments.map((comment) => (
        <Comment key={comment.id} data={comment} />
      ))}
      <CommentReply />
    </div>
  );
}
