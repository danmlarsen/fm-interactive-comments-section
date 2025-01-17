import { useState } from "react";
import { motion } from "motion/react";
import { useComments } from "../context/CommentContext";
import Button from "../ui/Button";
import Textarea from "../ui/Textarea";

export default function CommentEdit({
  comment,
  commentId,
  onEdit,
}: {
  comment: string;
  commentId: string;
  onEdit: () => void;
}) {
  const { handleEditComment } = useComments();

  const [contentEdit, setContentEdit] = useState(comment);

  return (
    <motion.div
      className="space-y-4"
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Textarea
        value={contentEdit}
        onChange={(e) => setContentEdit(e.target.value)}
      />
      <div className="flex justify-end">
        <Button
          onClick={() => {
            handleEditComment(commentId, contentEdit);
            onEdit();
          }}
        >
          Update
        </Button>
      </div>
    </motion.div>
  );
}
