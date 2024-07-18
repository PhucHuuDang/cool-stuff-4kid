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
        title="a"
        id="status-filter"
        value={selectedStatus}
        onChange={handleFilterChange}
        className="rounded border border-gray-300 p-2"
      >
        <option value="">All</option>
        <option value="Delivered">UnPaid</option>
        <option value="Processing">Paid</option>
        <option value="Delivering">Processing</option>
        <option value="Refunded">Delivering</option>
        <option value="Canceled">Delivered</option>
      </select>
    </div>
  );
};

export default Filter;
