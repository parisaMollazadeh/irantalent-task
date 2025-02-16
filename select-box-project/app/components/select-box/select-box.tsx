import React, { useState, useEffect, useRef } from "react";
import SelectBoxOption from "./SelectBoxOption";
import styles from './SelectBox.module.css';
import SelectBoxSearch from "./SelectBoxSearch";
import { filterArrayWithStringField, sortArrayBySelection } from "@/app/utils/array";

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

  const handleItemSelect = (option: SelectOption) => {
    if (multiSelect) {
      const isAlreadySelected = selectedItems.some((sItem) => sItem.id === option.id);
      const updatedSelectedItems = isAlreadySelected
        ? selectedItems.filter((sItem) => sItem.id !== option.id)
        : [...selectedItems, option];
  
      setSelectedItems(updatedSelectedItems);
  
      // Move selected items to the top of array
      const reorderedOptions = [
        ...updatedSelectedItems,
        ...options.filter((opt) => !updatedSelectedItems.some((sel) => sel.id === opt.id)),
      ];
      onChange(reorderedOptions); 
      return
    }  
    
     setSelectedItems([option]);
      // Move the selected item to the top
      const reorderedOptions = [option, ...options.filter((opt) => opt.id !== option.id)];
      onChange(reorderedOptions); 
      setIsOpen(false);
    
  };
  
  // first sort selected Data and filter sorted list with search key
  const filteredOptions = sortArrayBySelection (filterArrayWithStringField(options, searchQuery, 'name'), selectedItems, 'id')


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
      <span className={styles.arrow}>˅</span>
    </div>

    {isOpen && (
      <div className={styles.dropdown}>
        {showSearch && <SelectBoxSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} placeHolder={`Search ${title}`}/>}

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
