export const flattenAndPick = <T>(nestedArray: T[][], joinLevel:number ,limit: number = 200 ): T[] => {
      
      try{
        return (nestedArray.flat(joinLevel) as T[]).slice(0, limit);
      }catch{
        throw('Failed to flaat or pick ');
      }
      
  };
  

export const sortArray = <T>(array: T[], field: keyof T, ascending: boolean = true): T[] => {
    return array.sort((a, b) => {
      const aValue = a[field];
      const bValue = b[field];
  
      // Handle strings
      if (typeof aValue === "string" && typeof bValue === "string") {
        return ascending ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      }
  
      // Handle numbers
      if (typeof aValue === "number" && typeof bValue === "number") {
        return ascending ? aValue - bValue : bValue - aValue;
      }
  
      return 0;
    });
  }
  
  export const sortArrayBySelection = <T>(
    array: T[],               // to be sorted
    selectedItems: T[],       // containing selected items
    field: keyof T            // compair field
  ): T[] => {
    try{
      return array.sort((fItemA, fItemB) => {
        const firstSelected = selectedItems.some((item) => item[field] === fItemA[field]);
        const secondSelected = selectedItems.some((item) => item[field] === fItemB[field]);
        //  chgange order of selected item use timSort
        return secondSelected ? 1 : firstSelected ? -1 : 0; 
      });
    }catch{
      throw('Failed to sort! ');
    }

  };
  

  export const filterArrayWithStringField = <T>(
    options: T[],                    
    searchQuery: string,            
    field: keyof T  
  ): T[] => {
    return options.filter((option) => {
      const value = option[field];
      if (typeof value === "string") {
        return value.toLowerCase().includes(searchQuery.toLowerCase());
      }
      return false; 
    });
  };
  