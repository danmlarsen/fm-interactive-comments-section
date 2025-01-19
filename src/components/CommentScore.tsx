import { AnimatePresence, motion } from "motion/react";
import { useComments } from "../context/CommentContext";
import { TComment } from "../types/Comment";
import IconMinus from "../ui/icons/IconMinus";
import IconPlus from "../ui/icons/IconPlus";

export default function CommentScore({ data }: { data: TComment }) {
  const { id, score } = data;

  const { handleScore, scoreVotes } = useComments();

  return (
    <motion.div
      className="text-blue flex min-w-[6.26rem] items-center justify-between rounded-[0.625rem] bg-gray-100 text-center font-medium md:min-h-[6.25rem] md:min-w-10 md:flex-col"
      layout
    >
      <CommentScoreButton
        onClick={() => handleScore(id, 1)}
        disabled={scoreVotes.includes(id)}
        aria-label="Upvote"
      >
        <IconPlus />
      </CommentScoreButton>

      <AnimatePresence mode="wait">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          key={score}
          aria-label="Comment Score"
        >
          {score}
        </motion.span>
      </AnimatePresence>

      <CommentScoreButton
        onClick={() => handleScore(id, -1)}
        disabled={scoreVotes.includes(id)}
        aria-label="Downvote"
      >
        <IconMinus />
      </CommentScoreButton>
    </motion.div>
  );
}

function CommentScoreButton({
  children,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button
      className="hover:text-blue flex items-center justify-center p-3 text-gray-300 transition duration-300 hover:disabled:text-gray-300"
      {...props}
    >
      {children}
    </button>
  );
}
