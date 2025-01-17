import { motion, HTMLMotionProps } from "motion/react";
import { twMerge } from "tailwind-merge";

export default function Card({
  className,
  children,
  ...props
}: HTMLMotionProps<"div"> & { children: React.ReactNode }) {
  return (
    <motion.div
      className={twMerge("rounded-lg bg-white p-4 md:p-6", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
