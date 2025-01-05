import { useUser } from "../context/UserContext";
import { TComment } from "../types/Comment";
import IconMinus from "../ui/icons/IconMinus";
import IconPlus from "../ui/icons/IconPlus";

export default function CommentScore({
  data,
  onClickPlus,
  onClickMinus,
}: {
  data: TComment;
  onClickPlus: () => void;
  onClickMinus: () => void;
}) {
  const { id, score } = data;
  const { votes } = useUser();

  return (
    <div className="text-blue font flex min-w-10 flex-col gap-4 rounded-xl bg-gray-100 py-3 text-center font-medium">
      <CommentScoreButton onClick={onClickPlus} disabled={votes.includes(id)}>
        <IconPlus />
      </CommentScoreButton>
      {score}
      <CommentScoreButton onClick={onClickMinus} disabled={votes.includes(id)}>
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
      className="hover:text-blue flex h-4 items-center justify-center text-gray-300 transition duration-300 hover:disabled:text-gray-300"
      {...props}
    >
      {children}
    </button>
  );
}
