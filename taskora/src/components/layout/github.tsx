"use client";

import { X } from "lucide-react";

interface GenerateAppModalProps {
  open: boolean;
  onClose: () => void;
}

export default function GenerateAppModal({
  open,
  onClose,
}: GenerateAppModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      {/* Modal */}
      <div className="relative w-[420px] rounded-xl bg-white p-6 shadow-xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="mb-4 flex items-center gap-2">
          <h2 className="text-lg font-semibold text-gray-900">Generate App</h2>
          <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
            BLAZOR
          </span>
        </div>

        {/* GitHub Connect Box */}
        <button className="flex w-full items-center gap-4 rounded-lg border border-gray-200 p-4 text-left transition hover:bg-gray-50">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5 text-gray-700"
            >
              <path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.1 3.29 9.43 7.86 10.96.58.11.79-.25.79-.56v-2.02c-3.2.7-3.87-1.54-3.87-1.54-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.72-1.55-2.55-.29-5.23-1.29-5.23-5.73 0-1.27.45-2.3 1.19-3.11-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.19a11 11 0 0 1 5.79 0c2.21-1.5 3.18-1.19 3.18-1.19.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.11 0 4.45-2.69 5.44-5.25 5.72.41.35.77 1.04.77 2.1v3.12c0 .31.21.68.8.56A11.52 11.52 0 0 0 23.5 12C23.5 5.74 18.27.5 12 .5Z" />
            </svg>
          </div>

          <div>
            <p className="font-medium text-gray-900">CONNECT TO GITHUB</p>
            <p className="text-sm text-gray-500">
              Publish generated app to a GitHub repository
            </p>
          </div>
        </button>

        {/* Footer */}
        <p className="mt-4 text-sm text-gray-500">
          Want to compile and run your app locally?{" "}
          <span className="cursor-pointer font-medium text-blue-600 hover:underline">
            Download ZIP
          </span>
        </p>
      </div>
    </div>
  );
}
