import { TComment } from "../types/Comment";
import Comment from "./Comment";

export default function CommentRepliesList({
  replies,
}: {
  replies: TComment[];
}) {
  return (
    <div className="grid grid-cols-[auto_1fr]">
      <div className="pr-4 sm:px-[43px]">
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
