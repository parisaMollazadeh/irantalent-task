import React from 'react';
import styles from './selectBoxInput.module.css';
import Image from 'next/image';

interface SelectBoxInputProps {
  title: string;
  selectedItems: { id: string; name: string }[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const SelectBoxInput: React.FC<SelectBoxInputProps> = ({
  title,
  selectedItems,
  isOpen,
  setIsOpen,
}) => {
  const hasMultipleSelections = selectedItems.length > 1;
  const hasNoSelection = selectedItems.length === 0;

  return (
    <div
      className={`${styles.inputWrapper} ${
        hasNoSelection ? styles.noSelection : ''
      }`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <input
        type="text"
        value={
          hasNoSelection || hasMultipleSelections
            ? title
            : selectedItems[0]?.name
        }
        readOnly
      />
      {hasMultipleSelections && (
        <span className={`${styles.countBadge} ${styles.visible}`}>
          {selectedItems.length}
        </span>
      )}

      <Image
        src={`svg/ic-arrow${hasNoSelection ? '' : '-white'}.svg`}
        width={24}
        height={16}
        alt="dropdown"
        className={isOpen ? styles.arrow : ''}
      />
    </div>
  );
};

export default SelectBoxInput;
