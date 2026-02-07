type Props = {
  labels: string[];
  values: number[];
  horizontal?: boolean;
};

export default function BarChart({ labels, values, horizontal }: Props) {
  const max = Math.max(...values);

  return (
    <div className="space-y-3">
      {labels.map((label, i) => (
        <div key={label}>
          <div className="flex justify-between text-xs mb-1">
            <span>{label}</span>
            <span>{values[i]}</span>
          </div>

          <div className="w-full bg-gray-200 h-3 rounded">
            <div
              className="h-3 bg-blue-500 rounded"
              style={{
                width: `${(values[i] / max) * 100}%`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
