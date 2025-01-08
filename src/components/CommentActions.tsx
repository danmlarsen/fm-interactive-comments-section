import { useComments } from "../context/CommentContext";
import { useUser } from "../context/UserContext";
import { TComment } from "../types/Comment";
import CommentActionButton from "./CommentActionButton";

export default function CommentActions({
  data,
  onClickReply,
  onClickEdit,
}: {
  data: TComment;
  onClickReply: (id: string) => void;
  onClickEdit: () => void;
}) {
  const { id, user } = data;
  const { currentUser } = useUser();
  const { handleDeleteComment } = useComments();

  return (
    <div className="flex gap-6">
      {user.username === currentUser.username && (
        <>
          <CommentActionButton
            variant="Delete"
            onClick={() => handleDeleteComment(id)}
          />
          <CommentActionButton variant="Edit" onClick={onClickEdit} />
        </>
      )}

      {user.username !== currentUser.username && (
        <CommentActionButton variant="Reply" onClick={() => onClickReply(id)} />
      )}
    </div>
  );
}
