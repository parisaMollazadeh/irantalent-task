import React, { useState, useEffect, useRef } from "react";
import SelectBoxOption from "./selectBoxOption";
import SelectBoxSearch from "./selectBoxSearch";
import { filterArrayWithStringField, sortArrayBySelection } from "@/app/utils/array";
import styles from './SelectBox.module.css';


interface SelectBoxProps {
  title: string;
  options: SelectOption[];
  onChange: (selectedItems: SelectOption[]) => void;
  multiSelect?: boolean;
  showSearch?: boolean;
  allOption?: boolean;
}

const SelectBox: React.FC<SelectBoxProps> = ({title, options, onChange, multiSelect , showSearch, allOption}) => {
  const [selectedItems, setSelectedItems] = useState<SelectOption[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const selectRef = useRef<HTMLDivElement | null>(null);
  const handleItemSelect = (option: SelectOption) => {
    if (option.id === "all") { 
      if (selectedItems.length === options.length) {
        setSelectedItems([]); 
        onChange([]); 
      } else {
        setSelectedItems(options); 
        onChange(options); 
      }
      return;
    }
  
    if (multiSelect) {
      const isAlreadySelected = selectedItems.some((sItem) => sItem.id === option.id);
      const updatedSelectedItems = isAlreadySelected
        ? selectedItems.filter((sItem) => sItem.id !== option.id)
        : [...selectedItems, option];
  
      setSelectedItems(updatedSelectedItems);
  
      const reorderedOptions = [
        ...updatedSelectedItems,
        ...options.filter((opt) => !updatedSelectedItems.some((sel) => sel.id === opt.id)),
      ];
      onChange(reorderedOptions);
      return;
    }
  
    setSelectedItems([option]);
    const reorderedOptions = [option, ...options.filter((opt) => opt.id !== option.id)];
    onChange(reorderedOptions);
    setIsOpen(false);
  };
  
  const displayedOptions = allOption ? [{ id: "all", name: "All" }, ...options] : options;
  
  // first sort selected Data and filter sorted list with search key
  const filteredOptions = sortArrayBySelection(
    filterArrayWithStringField(displayedOptions, searchQuery, 'name'),
    selectedItems,
    'id'
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
    selectedItems.length === 0 ? styles.noSelection : ""
  }`}
  onClick={() => setIsOpen(!isOpen)}
>
  <input
    type="text"
    value={
      selectedItems.length === 0 || selectedItems.length > 1
        ? title
        : selectedItems[0].name
    }
    readOnly
  />
  <span
    className={`${styles.countBadge} ${
      selectedItems.length > 1 ? styles.visible : ""
    }`}
  >
    {selectedItems.length > 1 ? selectedItems.length : ""}
  </span>
  <span className={styles.arrow}>˅</span>
</div>


{isOpen && (
  <div className={styles.dropdown}>
    {showSearch && (
      <div className={styles.searchBoxContainer}>
        <SelectBoxSearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          placeHolder={`Search ${title}`}
        />
      </div>
    )}
    <div className={styles.optionsContainer}>
      <SelectBoxOption
        options={filteredOptions}
        selectedItems={selectedItems}
        onItemSelect={handleItemSelect}
      />
    </div>
  </div>
)}

</div>

)
};
export default SelectBox;
