import { twMerge } from "tailwind-merge";

export default function Dialog({
  className,
  children,
}: React.ComponentProps<"dialog">) {
  return (
    <>
      <div className="fixed inset-0 z-10 bg-black/50" />
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
    </>
  );
}
