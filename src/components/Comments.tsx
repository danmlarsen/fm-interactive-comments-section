import { useState } from "react";
import Comment from "./Comment";
import CommentReply from "./CommentReply";

import { comments as commentsJson } from "../assets/data.json";
import { convertToTimestamp } from "../utils/utils";

export default function Comments() {
  // Convert relative createdAt strings to date strings
  const commentsData = commentsJson.map((comment) => {
    const replies = comment.replies.map((reply) => {
      return { ...reply, createdAt: convertToTimestamp(reply.createdAt) };
    });
    return {
      ...comment,
      createdAt: convertToTimestamp(comment.createdAt),
      replies,
    };
  });

  const [comments] = useState(commentsData);

  return (
    <div className="space-y-5">
      {comments.map((comment) => (
        <Comment key={comment.id} data={comment} />
      ))}
      <CommentReply />
    </div>
  );
}
