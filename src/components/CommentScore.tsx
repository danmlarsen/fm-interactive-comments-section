import IconMinus from "../ui/icons/IconMinus";
import IconPlus from "../ui/icons/IconPlus";

export default function CommentScore({
  score,
  onClickPlus,
  onClickMinus,
}: {
  score: number;
  onClickPlus: () => void;
  onClickMinus: () => void;
}) {
  return (
    <div className="text-blue font flex min-w-10 flex-col gap-4 rounded-xl bg-gray-100 py-3 text-center font-medium">
      <button
        className="flex h-4 items-center justify-center transition duration-300 hover:text-gray-300"
        onClick={onClickPlus}
      >
        <IconPlus />
      </button>
      {score}
      <button
        className="flex h-4 items-center justify-center transition duration-300 hover:text-gray-300"
        onClick={onClickMinus}
      >
        <IconMinus />
      </button>
    </div>
  );
}
