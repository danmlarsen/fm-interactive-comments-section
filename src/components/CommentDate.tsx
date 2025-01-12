import { formatDistanceToNowStrict } from "date-fns";
import { useEffect, useState } from "react";

const CommentDate: React.FC<{ createdAt: string }> = ({ createdAt }) => {
  const [formattedDate, setFormattedDate] = useState(
    formatDistanceToNowStrict(createdAt, { addSuffix: true }),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setFormattedDate(
        formatDistanceToNowStrict(createdAt, { addSuffix: true }),
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [createdAt]);

  return <div>{formattedDate}</div>;
};

export default CommentDate;
