import React, { ChangeEvent } from "react";

interface RateFilterProps {
  selectedRate: string | null;
  onChange: (value: string) => void;
}

export const RateFilter: React.FC<RateFilterProps> = ({
  selectedRate,
  onChange,
}) => {
  const handleRateChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="mb-4 flex justify-end">
      <select
        title="rate"
        onChange={handleRateChange}
        className="rounded-full border bg-blue-400 p-2 text-white outline-none"
        value={selectedRate || "All"}
      >
        <option value="All">All</option>
        <option className="bg-white text-red-500" value="1">
          1
        </option>
        <option className="bg-white text-yellow-500" value="2">
          2
        </option>
        <option className="bg-white text-green-500" value="3">
          3
        </option>
        <option className="bg-white text-blue-500" value="4">
          4
        </option>
        <option className="bg-white text-gray-500" value="5">
          5
        </option>
      </select>
    </div>
  );
};
