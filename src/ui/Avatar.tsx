export default function Avatar({
  image,
  username,
}: {
  image: string;
  username: string;
}) {
  return (
    <div className="size-8">
      <img src={image} alt={username} />
    </div>
  );
}
