import React from 'react';

interface RateFilterProps {
  selectedRate: string;
  handleRateChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const RateFilter: React.FC<RateFilterProps> = ({ selectedRate, handleRateChange }) => {
  return (
    <div className='flex items-center'>
      <span>Rate</span>
      <select
        id='rate-filter'
        value={selectedRate}
        onChange={handleRateChange}
        className='border border-gray-300 rounded-md p-1 ml-2'
      >
        <option value='All'>All</option>
        <option value='3'>Very Happy</option>
        <option value='2'>Happy</option>
        <option value='1'>Unhappy</option>
      </select>
    </div>
  );
};

export default RateFilter;
