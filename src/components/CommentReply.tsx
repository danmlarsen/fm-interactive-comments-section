import { useState } from "react";
import { useUser } from "../context/UserContext";
import Avatar from "../ui/Avatar";
import Button from "../ui/Button";
import Card from "../ui/Card";
import Textarea from "../ui/Textarea";
import { useComments } from "../context/CommentContext";

export default function CommentReply({
  replyId,
  onReplySuccess,
}: {
  replyId?: string;
  onReplySuccess?: () => void;
}) {
  const { currentUser } = useUser();

  const { handleNewComment, handleNewReply } = useComments();

  const [commentText, setCommentText] = useState("");

  return (
    <Card className="grid grid-cols-[min-content_1fr] gap-4">
      <Avatar username={currentUser.username} image={currentUser.image.webp} />
      <div className="grid grid-cols-[1fr_min-content] gap-4">
        <div>
          <Textarea
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
        </div>
        <div>
          <Button
            onClick={() => {
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
