import { twMerge } from "tailwind-merge";

export default function Textarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <textarea
      rows={3}
      className={twMerge(
        "focus-visible:ring-blue w-full resize-none rounded-lg border border-gray-200 px-6 py-3 ring-offset-transparent placeholder:text-gray-500 focus:outline-none focus-visible:ring-1",
        className,
      )}
      {...props}
    />
  );
}
