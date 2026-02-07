type Props = {
  title: string;
  actual: string;
  planned: string;
  percent: number;
  color: "green" | "blue" | "yellow" | "purple";
};

const colorMap = {
  green: "bg-green-500",
  blue: "bg-blue-500",
  yellow: "bg-yellow-400",
  purple: "bg-purple-500",
};

export default function StatCard({
  title,
  actual,
  planned,
  percent,
  color,
}: Props) {
  return (
    <div className="bg-white rounded-xl p-4 shadow">
      <h3 className="text-sm font-medium mb-2">{title}</h3>

      <div className="flex justify-between text-sm mb-1">
        <span>{actual} Actual</span>
        <span>{planned} Planned</span>
      </div>

      <div className="w-full bg-gray-200 h-2 rounded-full">
        <div
          className={`h-2 rounded-full ${colorMap[color]}`}
          style={{ width: `${percent}%` }}
        />
      </div>

      <p className="text-right text-xs mt-1">{percent}%</p>
    </div>
  );
}
