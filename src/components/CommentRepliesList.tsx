import { TComment } from "../types/Comment";
import Comment from "./Comment";

export default function CommentRepliesList({
  replies,
}: {
  replies: TComment[];
}) {
  return (
    <div className="grid grid-cols-[88px_auto]">
      <div>
        <div className="mx-auto h-full w-[2px] bg-gray-200" />
      </div>
      <div className="space-y-6">
        {replies.map((reply) => (
          <Comment key={reply.id} data={reply} />
        ))}
      </div>
    </div>
  );
}
