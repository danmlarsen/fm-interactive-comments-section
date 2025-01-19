import Textarea from "../ui/Textarea";

export default function CommentTextInput({
  value,
  setValue,
  replyTo,
}: {
  value: string;
  setValue: (value: string) => void;
  replyTo?: string;
}) {
  const combinedText = `${replyTo ? `@${replyTo} ` : ""}${value}`;

  return (
    <Textarea
      placeholder="Add a comment..."
      aria-label="Post content"
      spellCheck={false}
      name="content"
      value={combinedText}
      onChange={(e) => {
        const value = e.target.value;

        if (replyTo && !value.startsWith(`@${replyTo} `)) return;

        const newInput = replyTo ? value.replace(`@${replyTo} `, "") : value;
        setValue(newInput);
      }}
    />
  );
}
