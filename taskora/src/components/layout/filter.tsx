const filters = ["All", "Feature", "Bug", "High", "Due Soon"];

export default function FilterChips() {
  return (
    <div className="flex gap-2 overflow-x-auto">
      {filters.map((f) => (
        <button
          key={f}
          className="px-4 py-1.5 rounded-full text-xs border bg-white whitespace-nowrap"
        >
          {f}
        </button>
      ))}
    </div>
  );
}
