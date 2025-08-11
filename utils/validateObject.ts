export const validateObject = (obj: Record<string, any>): boolean => {
  if (typeof obj !== "object" || obj === null) {
    return false; // Not an object or is null
  }

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      if (value === undefined || value === null || value === "") {
        return false; // Invalid value found
      }
    }
  }

  return true; // All values are valid
};
