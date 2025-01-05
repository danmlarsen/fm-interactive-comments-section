import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { useUser } from "../context/UserContext";
import { TComment } from "../types/Comment";
import Avatar from "../ui/Avatar";
import Card from "../ui/Card";

import CommentActions from "./CommentActions";
import CommentRepliesList from "./CommentRepliesList";
import CommentReply from "./CommentReply";
import CommentScore from "./CommentScore";
import { useComments } from "./Comments";

export default function Comment({ data }: { data: TComment }) {
  const { id, content, createdAt, user, replies } = data;

  const [replyIsOpen, setReplyIsOpen] = useState(false);

  const { currentUser } = useUser();
  const { handleScore } = useComments();

  return (
    <div className="space-y-5">
      <Card className="grid grid-cols-[auto_1fr] gap-6">
        <CommentScore
          data={data}
          onClickMinus={() => handleScore(id, -1)}
          onClickPlus={() => handleScore(id, 1)}
        />
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
              <div>{formatDistanceToNow(createdAt, { addSuffix: true })}</div>
            </div>
            <CommentActions
              data={data}
              onClickReply={() => setReplyIsOpen((prev) => !prev)}
            />
          </div>
          <div>{content}</div>
        </div>
      </Card>

      {replyIsOpen && <CommentReply replyId={id} />}

      {replies && replies.length > 0 && (
        <CommentRepliesList replies={replies} />
      )}
    </div>
  );
}
