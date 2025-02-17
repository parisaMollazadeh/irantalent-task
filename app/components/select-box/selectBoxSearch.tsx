import React from 'react';

interface SelectBoxSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  placeHolder?: string;
}

const SelectBoxSearch: React.FC<SelectBoxSearchProps> = ({
  searchQuery,
  setSearchQuery,
  placeHolder,
}) => {
  return (
    <input
      type="text"
      placeholder={placeHolder || 'Search'}
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  );
};

export default SelectBoxSearch;
