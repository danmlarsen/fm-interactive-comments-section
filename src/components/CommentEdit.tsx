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
    <div className="space-y-4">
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
    </div>
  );
}
