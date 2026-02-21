"use client";

export default function DashboardPreview() {
  return (
    <div className="bg-blue-50 rounded-2xl p-4 sm:p-6 w-full shadow-lg">
      <div className="bg-white rounded-xl p-4 sm:p-6">
        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4">
            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
              In Progress
            </span>
            <p className="mt-4 text-sm text-gray-500">Due Tomorrow</p>
          </div>

          <div className="border rounded-lg p-4">
            <span className="text-xs bg-gray-100 px-2 py-1 rounded">
              Review
            </span>
          </div>
        </div>

        {/* Chart */}
        <div className="mt-6 flex items-end gap-3 sm:gap-4 h-28 sm:h-32">
          <div className="w-5 sm:w-6 bg-blue-100 h-10 sm:h-12 rounded" />
          <div className="w-5 sm:w-6 bg-blue-200 h-16 sm:h-20 rounded" />
          <div className="w-5 sm:w-6 bg-blue-400 h-24 sm:h-28 rounded" />
          <div className="w-5 sm:w-6 bg-blue-200 h-14 sm:h-16 rounded" />
          <div className="w-5 sm:w-6 bg-blue-500 h-28 sm:h-32 rounded" />
        </div>
      </div>
    </div>
  );
}
