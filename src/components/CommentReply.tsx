import { useState } from "react";
import { useUser } from "../context/UserContext";
import Avatar from "../ui/Avatar";
import Button from "../ui/Button";
import Card from "../ui/Card";
import Textarea from "../ui/Textarea";
import { useComments } from "../context/CommentContext";

export default function CommentReply({
  replyId,
  replyTo,
  onReplySuccess,
}: {
  replyId?: string;
  replyTo?: string;
  onReplySuccess?: () => void;
}) {
  const { currentUser } = useUser();

  const { handleNewComment, handleNewReply } = useComments();

  const [commentText, setCommentText] = useState("");

  const combinedText = `${replyTo ? `@${replyTo} ` : ""}${commentText}`;

  return (
    <Card>
      <div className="grid grid-cols-[1fr_min-content] gap-4 md:grid-cols-[min-content_1fr_min-content]">
        <div className="col-span-2 md:col-span-1 md:col-start-2">
          <Textarea
            placeholder="Add a comment..."
            spellCheck={false}
            value={combinedText}
            onChange={(e) => {
              const value = e.target.value;
              const newInput = replyTo
                ? value.replace(`@${replyTo} `, "")
                : value;
              setCommentText(newInput);
            }}
          />
        </div>
        <div className="md:col-start-1 md:row-start-1">
          <Avatar
            username={currentUser.username}
            image={currentUser.image.webp}
          />
        </div>
        <div className="">
          <Button
            onClick={() => {
              if (commentText.trim().length === 0) return;

              if (replyId) {
                handleNewReply(commentText, replyId);
                onReplySuccess?.();
              } else handleNewComment(commentText);
            }}
          >
            Reply
          </Button>
        </div>
      </div>
    </Card>
  );
}
