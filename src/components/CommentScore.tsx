import { useComments } from "../context/CommentContext";
import { useUser } from "../context/UserContext";
import { TComment } from "../types/Comment";
import IconMinus from "../ui/icons/IconMinus";
import IconPlus from "../ui/icons/IconPlus";

export default function CommentScore({ data }: { data: TComment }) {
  const { id, score } = data;
  const { votes } = useUser();

  const { handleScore } = useComments();

  return (
    <div className="text-blue font flex min-w-[100px] items-center justify-between gap-4 rounded-[10px] bg-gray-100 text-center font-medium md:min-w-10 md:flex-col">
      <CommentScoreButton
        onClick={() => handleScore(id, 1)}
        disabled={votes.includes(id)}
      >
        <IconPlus />
      </CommentScoreButton>
      {score}
      <CommentScoreButton
        onClick={() => handleScore(id, -1)}
        disabled={votes.includes(id)}
      >
        <IconMinus />
      </CommentScoreButton>
    </div>
  );
}

function CommentScoreButton({
  children,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button
      className="hover:text-blue flex h-4 items-center justify-center px-2 py-4 text-gray-300 transition duration-300 hover:disabled:text-gray-300"
      {...props}
    >
      {children}
    </button>
  );
}
