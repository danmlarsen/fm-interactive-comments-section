import { TComment } from "../types/Comment";

export function convertToTimestamp(relativeTime: string) {
  const now = new Date();
  const [amount, unit] = relativeTime.split(" ");

  switch (unit) {
    case "month":
    case "months":
      now.setMonth(now.getMonth() - parseInt(amount));
      break;
    case "week":
    case "weeks":
      now.setDate(now.getDate() - parseInt(amount) * 7);
      break;
    case "day":
    case "days":
      now.setDate(now.getDate() - parseInt(amount));
      break;
    case "hour":
    case "hours":
      now.setHours(now.getHours() - parseInt(amount));
      break;
    case "minute":
    case "minutes":
      now.setMinutes(now.getMinutes() - parseInt(amount));
      break;
    case "second":
    case "seconds":
      now.setSeconds(now.getSeconds() - parseInt(amount));
      break;
  }

  return now.toISOString();
}

export function getCommentsLength(commentsArray: TComment[]) {
  return commentsArray.reduce((acc, val) => {
    if (val.replies) return acc + val.replies.length + 1;
    else return acc + 1;
  }, 0);
}
