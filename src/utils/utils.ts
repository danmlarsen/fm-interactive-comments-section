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

export function trimReplyTo(text: string, replyTo: string) {
  return text.replace(`@${replyTo} `, "");
}
