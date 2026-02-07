type Slice = {
  label: string;
  value: number;
  color: "green" | "blue" | "yellow";
};

const colorMap = {
  green: "#22c55e",
  blue: "#3b82f6",
  yellow: "#facc15",
};

export default function DonutChart({ data }: { data: Slice[] }) {
  const total = data.reduce((a, b) => a + b.value, 0);
  let offset = 0;

  return (
    <div className="flex gap-6 items-center">
      <svg width="140" height="140" viewBox="0 0 36 36">
        {data.map((slice, i) => {
          const percent = (slice.value / total) * 100;
          const dash = `${percent} ${100 - percent}`;
          const circle = (
            <circle
              key={i}
              cx="18"
              cy="18"
              r="15.915"
              fill="transparent"
              stroke={colorMap[slice.color]}
              strokeWidth="3"
              strokeDasharray={dash}
              strokeDashoffset={offset}
            />
          );
          // eslint-disable-next-line react-hooks/immutability
          offset -= percent;
          return circle;
        })}
      </svg>

      <div className="space-y-2 text-xs">
        {data.map((d) => (
          <div key={d.label} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ background: colorMap[d.color] }}
            />
            {d.label}
          </div>
        ))}
      </div>
    </div>
  );
}
