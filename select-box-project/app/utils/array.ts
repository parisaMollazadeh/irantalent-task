export const flattenAndPick = <T>(nestedArray: T[][], joinLevel:number ,limit: number = 200 ): T[] => {
      
      try{
        return (nestedArray.flat(joinLevel) as T[]).slice(0, limit);
      }catch{
        throw('Failed to flaat or pick ');
      }
      
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
  

  