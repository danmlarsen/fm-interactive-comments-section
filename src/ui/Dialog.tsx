import { twMerge } from "tailwind-merge";

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
      <div
        className="fixed inset-0 z-10 bg-black/50"
        onClick={onClickOutside}
      />
      <dialog
        open
        className="fixed inset-0 z-50 grid place-items-center bg-transparent p-4"
      >
        <div
          className={twMerge(
            "max-w-[25rem] rounded-lg bg-white p-8",
            className,
          )}
        >
          {children}
        </div>
      </dialog>
    </>,
    document.querySelector("#root")!,
  );
}
