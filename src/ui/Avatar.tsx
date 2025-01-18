import { twMerge } from "tailwind-merge";

export default function Avatar({
  image,
  username,
  className,
}: React.ComponentProps<"div"> & {
  image: string;
  username: string;
}) {
  return (
    <div className={twMerge("size-8", className)}>
      <img src={image} alt={username} />
    </div>
  );
}
