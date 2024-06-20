import React, { useState } from "react";
import { Label } from "@/components/ui/label";

interface FilterProps {
  onFilterChange: (status: string) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedStatus(value); 
    onFilterChange(value);
  };

  return (
    <div className="mb-4">
      <Label htmlFor="status-filter" className="mr-2">
        Filter by Status:
      </Label>
      <select
        id="status-filter"
        value={selectedStatus}
        onChange={handleFilterChange}
        className="p-2 border border-gray-300 rounded"
      >
        <option value="">All</option>
        <option value="Delivered">Delivered</option>
        <option value="Processing">Processing</option>
        <option value="Delivering">Delivering</option>
        <option value="Refunded">Refunded</option>
        <option value="Canceled">Canceled</option>
      </select>
    </div>
  );
};

export default Filter;
