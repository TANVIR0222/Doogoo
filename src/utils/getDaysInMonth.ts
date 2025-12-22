export const getDaysInMonth = (year: number, month: number) => {
  const total = new Date(year, month + 1, 0).getDate();
  return Array.from({ length: total }, (_, i) => i + 1);
};
