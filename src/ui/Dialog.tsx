import { twMerge } from "tailwind-merge";
import { motion } from "motion/react";

import { createPortal } from "react-dom";
import { useEffect } from "react";

export default function Dialog({
  className,
  children,
  onClickOutside,
}: React.ComponentProps<"dialog"> & { onClickOutside?: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return createPortal(
    <>
      <motion.div
        key="backdrop"
        className="fixed inset-0 z-10 bg-black/50"
        onClick={onClickOutside}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <motion.dialog
        key="dialog"
        open
        className="fixed inset-0 z-50 grid place-items-center bg-transparent p-4"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
      >
        <div
          className={twMerge(
            "max-w-[25rem] rounded-lg bg-white p-8",
            className,
          )}
        >
          {children}
        </div>
      </motion.dialog>
    </>,
    document.body,
  );
}
