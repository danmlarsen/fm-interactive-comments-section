import Comment from "./Comment";
import CommentReply from "./CommentReply";

import { comments } from "../assets/data.json";

export default function Comments() {
  return (
    <div className="space-y-5">
      {comments.map((comment) => (
        <Comment key={comment.id} data={comment} />
      ))}
      <CommentReply />
    </div>
  );
}
