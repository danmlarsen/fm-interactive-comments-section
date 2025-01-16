import { memo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useUser } from "../context/UserContext";
import { TComment } from "../types/Comment";
import Avatar from "../ui/Avatar";
import Card from "../ui/Card";

import CommentActions from "./CommentActions";
import CommentRepliesList from "./CommentRepliesList";
import CommentReply from "./CommentReply";
import CommentScore from "./CommentScore";

import CommentEdit from "./CommentEdit";
import CommentDate from "./CommentDate";
import CommentDeleteDialog from "./CommentDeleteDialog";
import { useComments } from "../context/CommentContext";

const Comment = memo(function Comment({ data }: { data: TComment }) {
  const { id, content, createdAt, user, replies, replyingTo } = data;

  const [replyIsOpen, setReplyIsOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { currentUser } = useUser();
  const { handleDeleteComment } = useComments();

  return (
    <motion.li layout>
      <AnimatePresence>
        {deleteDialogOpen && (
          <CommentDeleteDialog
            onConfirm={() => {
              handleDeleteComment(id);
              setDeleteDialogOpen(false);
            }}
            onCancel={() => setDeleteDialogOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.div
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Card className="grid gap-6 md:grid-cols-[auto_1fr]">
          <div className="hidden md:block">
            <CommentScore data={data} />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <div className="flex items-center gap-4">
                <Avatar username={user.username} image={user.image.webp} />
                <div className="flex items-center gap-2 font-medium text-gray-800">
                  <span>{user.username}</span>
                  {user.username === currentUser.username && (
                    <span className="bg-blue rounded-sm p-1 px-2 text-xs text-white">
                      you
                    </span>
                  )}
                </div>
                <CommentDate createdAt={createdAt} />
              </div>
              <div className="hidden md:block">
                <CommentActions
                  data={data}
                  onClickReply={() => setReplyIsOpen((prev) => !prev)}
                  onClickEdit={() => setIsEditing((prev) => !prev)}
                  onClickDelete={() => setDeleteDialogOpen(true)}
                />
              </div>
            </div>
            {!isEditing && (
              <div>
                {replyingTo && (
                  <>
                    <span className="text-blue font-medium">@{replyingTo}</span>{" "}
                  </>
                )}
                <span>{content}</span>
              </div>
            )}
            {isEditing && (
              <CommentEdit
                comment={content}
                commentId={id}
                onEdit={() => setIsEditing(false)}
              />
            )}

            <div className="flex justify-between md:hidden">
              <CommentScore data={data} />
              <CommentActions
                data={data}
                onClickReply={() => setReplyIsOpen((prev) => !prev)}
                onClickEdit={() => setIsEditing((prev) => !prev)}
                onClickDelete={() => setDeleteDialogOpen(true)}
              />
            </div>
          </div>
        </Card>
      </motion.div>

      <AnimatePresence>
        {replyIsOpen && (
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <CommentReply
              replyId={id}
              replyTo={user.username}
              onReplySuccess={() => setReplyIsOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {replies && replies.length > 0 && (
        <CommentRepliesList replies={replies} />
      )}
    </motion.li>
  );
});

export default Comment;
