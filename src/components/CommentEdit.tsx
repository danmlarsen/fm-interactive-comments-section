import { motion } from "motion/react";
import { useComments } from "../context/CommentContext";
import Button from "../ui/Button";
import CommentTextInput from "./CommentTextInput";
import { trimReplyTo } from "../utils/utils";
import { useState } from "react";

export default function CommentEdit({
  comment,
  commentId,
  onEdit,
  replyTo,
}: {
  comment: string;
  commentId: string;
  onEdit: () => void;
  replyTo?: string;
}) {
  const { handleEditComment } = useComments();

  const [content, setContent] = useState(comment);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        const contentReplyTrimmed = replyTo
          ? trimReplyTo(content, replyTo)
          : content;

        if (!contentReplyTrimmed.trim()) return;

        handleEditComment(commentId, contentReplyTrimmed);
        onEdit();
      }}
    >
      <motion.div
        className="space-y-4"
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <CommentTextInput
          value={content}
          setValue={setContent}
          replyTo={replyTo}
        />
        <div className="flex justify-end">
          <Button type="submit">Update</Button>
        </div>
      </motion.div>
    </form>
  );
}
