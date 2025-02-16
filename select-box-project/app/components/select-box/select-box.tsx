import React, { useState, useEffect, useRef } from "react";
import SelectBoxOption from "./SelectBoxOption";
import styles from './SelectBox.module.css';

interface SelectBoxProps {
title: string;
  options: SelectOption[];
  onChange: (selectedItems: SelectOption[]) => void;
  multiSelect: boolean;
  showSearch: boolean;
}

const SelectBox: React.FC<SelectBoxProps> = ({title, options, onChange, multiSelect , showSearch}) => {
  const [selectedItems, setSelectedItems] = useState<SelectOption[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const selectRef = useRef<HTMLDivElement | null>(null);

  const handleItemSelect = (item: SelectOption) => {
    if (multiSelect) {
      const updatedSelectedItems = selectedItems.includes(item)
        ? selectedItems.filter(i => i.id !== item.id)
        : [...selectedItems, item];
      setSelectedItems(updatedSelectedItems);
      onChange(updatedSelectedItems);
    } else {
      setSelectedItems([item]);
      onChange([item]);
      setIsOpen(false);
    }
  };

  const filteredOptions = options.filter(option =>
    option.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // close options when user click any where of page
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    //remove side effects
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

return (
  <div ref={selectRef} className={`${styles.selectBox} ${isOpen ? styles.open : ""}`}>
    <div
      className={`${styles.inputWrapper} ${
        selectedItems.length > 0 ? styles.selected : ""
      }`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <input
        type="text"
        value={
          selectedItems.length === 0
            ? title
            : selectedItems.length === 1
            ? selectedItems[0].name
            : `${title} ${selectedItems.length}`
        }
        readOnly
      />
      <span className={styles.arrow}>{isOpen ? "˄" : "˅"}</span>
    </div>

    {isOpen && (
      <div className={styles.dropdown}>
        <SelectBoxOption
          options={filteredOptions}
          selectedItems={selectedItems}
          onItemSelect={handleItemSelect}
        />
      </div>
    )}
  </div>
)
};

export default SelectBox;
