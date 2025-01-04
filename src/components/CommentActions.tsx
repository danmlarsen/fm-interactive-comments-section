import { useUser } from "../context/UserContext";
import { TComment } from "../types/Comment";
import CommentActionButton from "./CommentActionButton";

export default function CommentActions({ data }: { data: TComment }) {
  const { user } = data;
  const currentUser = useUser();

  return (
    <div className="flex gap-6">
      {user.username === currentUser.username && (
        <>
          <CommentActionButton variant="Delete" />
          <CommentActionButton variant="Edit" />
        </>
      )}

      {user.username !== currentUser.username && (
        <CommentActionButton variant="Reply" />
      )}
    </div>
  );
}
