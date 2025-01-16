import { AnimatePresence, motion } from "motion/react";

import Comment from "./Comment";
import CommentReply from "./CommentReply";

import { useComments } from "../context/CommentContext";

export default function Comments() {
  const { comments } = useComments();

  return (
    <motion.ul className="space-y-5" layout>
      <AnimatePresence>
        {comments
          .sort((a, b) => b.score - a.score)
          .map((comment) => (
            <Comment key={comment.id} data={comment} />
          ))}
      </AnimatePresence>
      <CommentReply />
    </motion.ul>
  );
}
