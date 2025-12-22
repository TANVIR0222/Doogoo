export const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // month is 0-indexed
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const formatDateReword = (dateStr: Date) => {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // month is 0-indexed
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};
export const updatedDateReword = (dateStr: Date) => {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // month is 0-indexed
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};
