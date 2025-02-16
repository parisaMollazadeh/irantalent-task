import React from "react";

interface SelectBoxOptionProps {
  options: SelectOption[];
  selectedItems: SelectOption[];
  onItemSelect: (item: SelectOption) => void;
}

const SelectBoxOption: React.FC<SelectBoxOptionProps> = ({
  options,
  selectedItems,
  onItemSelect,
}) => {
  return (
    <ul>
      {options.map((option) => (
        <li key={option.id} onClick={() => onItemSelect(option)}>
          <input
            type="checkbox"
            checked={selectedItems.includes(option)}
            readOnly
          />
          {option.name}
        </li>
      ))}
    </ul>
  );
};

export default SelectBoxOption;
