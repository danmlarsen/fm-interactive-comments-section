import Comment from "./Comment";
import CommentReply from "./CommentReply";

import { useComments } from "../context/CommentContext";

export default function Comments() {
  const { comments } = useComments();

  return (
    <div className="space-y-5">
      {comments.map((comment) => (
        <Comment key={comment.id} data={comment} />
      ))}
      <CommentReply />
    </div>
  );
}
