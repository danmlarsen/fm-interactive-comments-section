import { memo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
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
    <>
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

      <motion.li className="space-y-5" layout>
        <LayoutGroup>
          <Card
            className="grid gap-6 md:grid-cols-[auto_1fr]"
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div className="hidden md:block" layout>
              <CommentScore data={data} />
            </motion.div>

            <motion.div className="space-y-4" layout>
              <motion.div className="flex justify-between" layout>
                <div className="flex items-center gap-4">
                  <Avatar username={user.username} image={user.image.webp} />
                  <div className="flex items-center gap-2 font-medium text-gray-800">
                    <span>{user.username}</span>
                    {user.username === currentUser.username && (
                      <span className="bg-blue rounded-sm px-2 py-1 text-xs text-white">
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
              </motion.div>
              <motion.div layout>
                {!isEditing && (
                  <motion.div
                    layout
                    key="content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {replyingTo ? (
                      <span className="text-blue font-medium">
                        @{replyingTo}{" "}
                      </span>
                    ) : (
                      ""
                    )}
                    <span>{content}</span>
                  </motion.div>
                )}
                {isEditing && (
                  <CommentEdit
                    key="content-edit"
                    comment={content}
                    commentId={id}
                    onEdit={() => setIsEditing(false)}
                    replyTo={replyingTo}
                  />
                )}
              </motion.div>

              <div className="flex justify-between md:hidden">
                <CommentScore data={data} />
                <CommentActions
                  data={data}
                  onClickReply={() => setReplyIsOpen((prev) => !prev)}
                  onClickEdit={() => setIsEditing((prev) => !prev)}
                  onClickDelete={() => setDeleteDialogOpen(true)}
                />
              </div>
            </motion.div>
          </Card>

          <AnimatePresence>
            {replyIsOpen && (
              <CommentReply
                replyId={id}
                replyTo={user.username}
                onReplySuccess={() => setReplyIsOpen(false)}
              />
            )}
          </AnimatePresence>

          {replies && replies.length > 0 && (
            <CommentRepliesList replies={replies} />
          )}
        </LayoutGroup>
      </motion.li>
    </>
  );
});

export default Comment;
