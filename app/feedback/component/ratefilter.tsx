import React, { ChangeEvent } from 'react';

interface RateFilterProps {
  selectedRate: string | null;
  onChange: (value: string) => void;
}

export const RateFilter: React.FC<RateFilterProps> = ({ selectedRate, onChange }) => {
  const handleRateChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="mb-4 flex justify-end">
      <select
        onChange={handleRateChange}
        className="p-2 border outline-none rounded-full bg-blue-400 text-white"
        value={selectedRate || 'All'}
      >
        <option className='' value="All">All</option>
        <option className='text-red-500 bg-white' value="1">Unhappy</option>
        <option className='text-yellow-500 bg-white' value="2">Normal</option>
        <option className='text-green-500 bg-white' value="3">Happy</option>
        <option className='text-blue-500 bg-white' value="4">Very Happy</option>
      </select>
    </div>
  );
};
