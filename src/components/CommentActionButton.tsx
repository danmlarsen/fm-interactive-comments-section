import Button from "../ui/Button";

import IconReply from "../assets/images/icon-reply.svg";
import IconEdit from "../assets/images/icon-edit.svg";
import IconDelete from "../assets/images/icon-delete.svg";

export default function CommentActionButton({
  variant,
  ...props
}: React.ComponentProps<"button"> & { variant: "Reply" | "Edit" | "Delete" }) {
  return (
    <Button
      className={`flex items-center gap-2 bg-transparent p-0 normal-case hover:bg-transparent hover:opacity-50 ${variant === "Delete" ? "text-red-500" : "text-blue"}`}
      {...props}
    >
      <img
        src={
          (variant === "Edit" && IconEdit) ||
          (variant === "Delete" && IconDelete) ||
          IconReply
        }
        alt={`${variant} icon`}
        aria-hidden={true}
      />
      <span>{variant}</span>
    </Button>
  );
}
