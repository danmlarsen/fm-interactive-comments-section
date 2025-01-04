import { useUser } from "../context/UserContext";
import Avatar from "../ui/Avatar";
import Button from "../ui/Button";
import Card from "../ui/Card";
import Textarea from "../ui/Textarea";

export default function CommentReply() {
  const currentUser = useUser();

  return (
    <Card className="grid grid-cols-[min-content_1fr] gap-4">
      <Avatar username={currentUser.username} image={currentUser.image.webp} />
      <div className="grid grid-cols-[1fr_min-content] gap-4">
        <div>
          <Textarea placeholder="Add a comment..." />
        </div>
        <div>
          <Button>Reply</Button>
        </div>
      </div>
    </Card>
  );
}
