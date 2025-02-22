import React from 'react';

interface SelectBoxOptionProps {
  options: SelectOption[];
  selectedItems: SelectOption[];
  onItemSelect: (item: SelectOption) => void;
  multiSelect?: boolean;
}

const SelectBoxOption: React.FC<SelectBoxOptionProps> = ({
  options,
  selectedItems,
  onItemSelect,
  multiSelect,
}) => {
  //check all if has all select option
  const isAllSelected = selectedItems.length === options.length - 1;

  return (
    <ul>
      {multiSelect && options.some((option) => option.id === 'all') && (
        <li key="all" onClick={() => onItemSelect({ id: 'all', name: 'All' })}>
          <input type="checkbox" checked={isAllSelected} readOnly />
          All
        </li>
      )}

      {/* Render other options */}
      {options.map((option) =>
        option.id !== 'all' ? (
          <li key={option.id} onClick={() => onItemSelect(option)}>
            {multiSelect && (
              <input
                type="checkbox"
                checked={selectedItems.some((item) => item.id === option.id)}
                readOnly
              />
            )}
            {option.name}
          </li>
        ) : null
      )}
    </ul>
  );
};

export default SelectBoxOption;
