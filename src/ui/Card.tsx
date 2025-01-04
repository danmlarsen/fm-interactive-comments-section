import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export default function Card({
  className,
  children,
  ...props
}: ComponentProps<"div">) {
  return (
    <div className={twMerge("rounded-lg bg-white p-6", className)} {...props}>
      {children}
    </div>
  );
}
