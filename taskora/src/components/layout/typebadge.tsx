type Props = {
  type: "Lead" | "Customer";
};

export default function TypeBadge({ type }: Props) {
  const styles =
    type === "Lead"
      ? "bg-blue-100 text-blue-700"
      : "bg-purple-100 text-purple-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-medium ${styles}`}>
      {type}
    </span>
  );
}
