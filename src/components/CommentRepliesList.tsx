import { AnimatePresence, motion } from "motion/react";

import { TComment } from "../types/Comment";
import Comment from "./Comment";

export default function CommentRepliesList({
  replies,
}: {
  replies: TComment[];
}) {
  return (
    <motion.div className="grid grid-cols-[auto_1fr]" layout>
      <div className="pr-4 sm:px-[2.6875rem]">
        <div className="mx-auto h-full w-[2px] bg-gray-200" />
      </div>
      <motion.ul className="space-y-6" layout>
        <AnimatePresence>
          {replies
            .sort(
              (a, b) =>
                new Date(a.createdAt).getTime() -
                new Date(b.createdAt).getTime(),
            )
            .map((reply) => (
              <Comment key={reply.id} data={reply} />
            ))}
        </AnimatePresence>
      </motion.ul>
    </motion.div>
  );
}
