import { useState } from "react";
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
    <div>
      <Textarea
        value={contentEdit}
        onChange={(e) => setContentEdit(e.target.value)}
      />
      <Button
        onClick={() => {
          handleEditComment(commentId, contentEdit);
          onEdit();
        }}
      >
        Update
      </Button>
    </div>
  );
}
