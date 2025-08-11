export const currency = (value: string): string => {
  const numericValue = parseFloat(value);
  if (isNaN(numericValue)) return "Rp 0";
  if (numericValue === 0) return "Rp 0";
  return (
    "Rp " +
    Number(numericValue).toLocaleString("id-ID", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
  );
};
