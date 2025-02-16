export const flattenAndPick = <T>(nestedArray: T[][], limit: number = 200): T[] => {
    return (nestedArray.flat(2) as T[]).slice(0, limit);
  };
  

export const sortObjectArray = <T>(array: T[], field: keyof T, ascending: boolean = true): T[] => {
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
  

  