type Props = {
  status: "Active" | "Inactive" | "New";
};

export default function StatusBadge({ status }: Props) {
  const styles =
    status === "Active"
      ? "bg-green-100 text-green-700"
      : status === "Inactive"
        ? "bg-orange-100 text-orange-700"
        : "bg-blue-100 text-blue-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-medium ${styles}`}>
      {status}
    </span>
  );
}
