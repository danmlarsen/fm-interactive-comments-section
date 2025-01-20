import { formatDistanceToNowStrict } from "date-fns";
import { useEffect, useState } from "react";

const SECONDS_PER_MINUTE = 60;
const SECONDS_PER_DAY = 86400;
const SECONDS_PER_WEEK = 604800;
const SECONDS_PER_MONTH = 2592000;

function getSecondsFromNow(createdAtDate: string) {
  return (Date.now() - new Date(createdAtDate).getTime()) / 1000;
}

function secondsToWeeks(seconds: number): number {
  const SECONDS_IN_A_WEEK = 60 * 60 * 24 * 7;
  return Math.trunc(seconds / SECONDS_IN_A_WEEK);
}

function formatDate(createdAtDate: string) {
  const secondsFromNow = getSecondsFromNow(createdAtDate);

  if (secondsFromNow < SECONDS_PER_MINUTE) {
    return "A moment ago";
  }
  if (secondsFromNow < SECONDS_PER_WEEK) {
    return formatDistanceToNowStrict(createdAtDate, { addSuffix: true });
  }
  if (
    secondsFromNow >= SECONDS_PER_WEEK &&
    secondsFromNow < SECONDS_PER_MONTH
  ) {
    const weeks = secondsToWeeks(secondsFromNow);
    return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  }

  return formatDistanceToNowStrict(createdAtDate, { addSuffix: true });
}

const CommentDate: React.FC<{ createdAt: string }> = ({ createdAt }) => {
  const [formattedDate, setFormattedDate] = useState(formatDate(createdAt));

  useEffect(() => {
    const secondsAgo = getSecondsFromNow(createdAt);
    let intervalSeconds = SECONDS_PER_MINUTE;

    if (secondsAgo >= SECONDS_PER_DAY) {
      intervalSeconds = SECONDS_PER_DAY;
    }

    const interval = setInterval(() => {
      setFormattedDate(formatDate(createdAt));
    }, 1000 * intervalSeconds);

    return () => clearInterval(interval);
  }, [createdAt]);

  return <div>{formattedDate}</div>;
};

export default CommentDate;
