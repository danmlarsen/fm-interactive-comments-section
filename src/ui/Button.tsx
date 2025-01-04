import { twMerge } from "tailwind-merge";

export default function Button({
  className,
  children,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button
      className={twMerge(
        "bg-blue rounded-lg px-8 py-3 font-medium uppercase text-white transition duration-300 hover:bg-gray-300",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
