import React from "react";

export default function UsersKPIDisplay({
  subtitle,
  kpiIcon,
  total,
  backgroundColour,
}: {
  title?: string;
  subtitle?: string;
  kpiIcon?: React.ReactNode;
  total: string;
  bottomItem?: React.ReactNode;
  backgroundColour?: string;
}) {
  return (
    <div
      style={{ backgroundColor: backgroundColour || "#fff" }}
      className="w-full flex flex-col justify-center items-center  overflow-hidden hover:cursor-pointer hover:shadow-lg transition-all duration-300 ease-in-out p-4"
    >
      {/* KPI Header */}
      <div className="flex items-center w-full mb-2">
        {/* Icon */}
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
          {kpiIcon}
        </div>

        {/* Title and Subtitle */}
        <div className="flex flex-col ml-3">
          <span className="text-lg font-semibold text-gray-800">{total}</span>
          {subtitle && (
            <span className="text-sm text-gray-500 mt-1">{subtitle}</span>
          )}
        </div>
      </div>

    </div>

  );
}
