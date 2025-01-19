import { useState } from "react";
import { useUser } from "../context/UserContext";
import Avatar from "../ui/Avatar";
import Button from "../ui/Button";
import Card from "../ui/Card";
import { useComments } from "../context/CommentContext";
import { trimReplyTo } from "../utils/utils";
import CommentTextInput from "./CommentTextInput";

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

  const [content, setContent] = useState("");

  return (
    <Card
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();

          const contentReplyTrimmed = replyTo
            ? trimReplyTo(content, replyTo)
            : content;

          if (!contentReplyTrimmed.trim()) return;

          if (replyId) {
            handleNewReply(contentReplyTrimmed, replyId);
            onReplySuccess?.();
          } else handleNewComment(contentReplyTrimmed);

          setContent("");
        }}
      >
        <div className="grid grid-cols-[1fr_min-content] gap-4 md:grid-cols-[min-content_1fr_min-content]">
          <div className="col-span-2 md:col-span-1 md:col-start-2">
            <CommentTextInput
              value={content}
              setValue={setContent}
              replyTo={replyTo}
            />
          </div>
          <div className="md:col-start-1 md:row-start-1">
            <Avatar
              className={`${!replyId ? "md:size-10" : ""}`}
              username={currentUser.username}
              image={currentUser.image.webp}
            />
          </div>
          <div>
            <Button type="submit">
              {replyId && "Reply"}
              {!replyId && "Send"}
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
}
