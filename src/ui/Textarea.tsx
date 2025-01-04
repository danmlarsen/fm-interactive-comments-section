import { twMerge } from "tailwind-merge";

export default function Textarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <textarea
      rows={3}
      className={twMerge(
        "w-full resize-none rounded-lg border border-gray-200 px-6 py-3 placeholder:text-gray-500",
        className,
      )}
      {...props}
    />
  );
}
