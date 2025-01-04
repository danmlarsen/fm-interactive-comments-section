import { useUser } from "../context/UserContext";
import { TComment } from "../types/Comment";
import Avatar from "../ui/Avatar";
import Card from "../ui/Card";
import CommentAction from "./CommentActionButton";

export default function Comment({ data }: { data: TComment }) {
  const { content, createdAt, score, user, replies } = data;

  const currentUser = useUser();

  return (
    <div className="space-y-5">
      <Card className="grid grid-cols-[auto_1fr] gap-6">
        <div className="text-blue font flex min-w-10 flex-col gap-4 rounded-xl bg-gray-100 py-3 text-center font-medium">
          <button>+</button>
          {score}
          <button>-</button>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between">
            <div className="flex items-center gap-4">
              <Avatar username={user.username} image={user.image.webp} />
              <div className="flex items-center gap-2 font-medium text-gray-800">
                <span>{user.username}</span>
                {user.username === currentUser.username && (
                  <span className="bg-blue rounded-sm p-1 px-2 text-white">
                    you
                  </span>
                )}
              </div>
              <div>{createdAt}</div>
            </div>
            <div className="flex gap-6">
              {user.username === currentUser.username && (
                <>
                  <CommentAction variant="Delete" />
                  <CommentAction variant="Edit" />
                </>
              )}

              {user.username !== currentUser.username && (
                <CommentAction variant="Reply" />
              )}
            </div>
          </div>
          <div>{content}</div>
        </div>
      </Card>

      {replies && replies.length > 0 && (
        <div className="grid grid-cols-[88px_auto]">
          <div>
            <div className="mx-auto h-full w-[2px] bg-gray-200" />
          </div>
          <div className="space-y-6">
            {replies.map((reply) => (
              <Comment data={reply} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
