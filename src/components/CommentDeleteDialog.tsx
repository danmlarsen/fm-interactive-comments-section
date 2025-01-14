import Button from "../ui/Button";
import Dialog from "../ui/Dialog";

export default function CommentDeleteDialog({
  onConfirm,
  onCancel,
}: {
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <Dialog className="space-y-5" onClickOutside={onCancel}>
      <h2 className="text-xl font-medium md:text-2xl">Delete comment</h2>
      <p className="text-gray-800">
        Are you sure you want to delete this comment? This will remove the
        comment and can’t be undone.
      </p>
      <div className="grid grid-cols-2 gap-3 md:gap-4">
        <Button
          className="bg-gray-500 px-0 hover:bg-gray-500/75"
          onClick={onCancel}
        >
          No, Cancel
        </Button>
        <Button
          className="bg-red-500 px-0 hover:bg-red-500/75"
          onClick={onConfirm}
        >
          Yes, delete
        </Button>
      </div>
    </Dialog>
  );
}
