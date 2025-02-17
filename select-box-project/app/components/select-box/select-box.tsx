import React, { useState, useEffect, useRef } from 'react';
import {
  filterArrayWithStringField,
  sortArrayBySelection,
} from '@/app/utils/array';
import styles from './selectBox.module.css';
import SelectBoxInput from './select-box-input/selectBoxInput';
import SelectBoxOption from './selectBoxOption';
import SelectBoxSearch from './selectBoxSearch';

interface SelectBoxProps {
  title: string;
  options: SelectOption[];
  onChange: (selectedItems: SelectOption[]) => void;
  multiSelect?: boolean;
  showSearch?: boolean;
  allOption?: boolean;
}

const SelectBox: React.FC<SelectBoxProps> = ({
  title,
  options,
  onChange,
  multiSelect,
  showSearch,
  allOption,
}) => {
  const [selectedItems, setSelectedItems] = useState<SelectOption[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const selectRef = useRef<HTMLDivElement | null>(null);

  // close options when user click any where of page
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    //remove side effects
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleItemSelect = (option: SelectOption) => {
    if (option.id === 'all') {
      const newSelection =
        selectedItems.length === options.length ? [] : options;
      setSelectedItems(newSelection);
      onChange(newSelection); // Pass only selected items
      return;
    }

    if (multiSelect) {
      const isAlreadySelected = selectedItems.some(
        (sItem) => sItem.id === option.id
      );
      const updatedSelectedItems = isAlreadySelected
        ? selectedItems.filter((sItem) => sItem.id !== option.id)
        : [...selectedItems, option];

      setSelectedItems(updatedSelectedItems);
      onChange(updatedSelectedItems); // Pass only selected items
      return;
    }

    setSelectedItems([option]);
    onChange([option]); // Pass only selected item
    setIsOpen(false);
  };

  const displayedOptions = allOption
    ? [{ id: 'all', name: 'All' }, ...options]
    : options;

  // first sort selected Data and filter sorted list with search key
  const filteredOptions = sortArrayBySelection(
    filterArrayWithStringField(displayedOptions, searchQuery, 'name'),
    selectedItems,
    'id'
  );

  return (
    <div
      ref={selectRef}
      className={`${styles.selectBox} ${isOpen ? styles.open : ''}`}
    >
      <SelectBoxInput
        title={title}
        selectedItems={selectedItems}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

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
              multiSelect={multiSelect}
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default SelectBox;
