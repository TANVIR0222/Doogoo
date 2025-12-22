export const formatInternationalNumber = (number: string) => {
  if (!number) return "";

  let cleaned = number.trim().replace(/[^\d+]/g, "");

  if (cleaned.startsWith("+88")) {
    return cleaned.slice(3); // +880
  }

  if (cleaned.startsWith("88")) {
    return cleaned.slice(2);
  }

  if (cleaned.startsWith("+88")) {
    return cleaned.slice(3);
  }

  return cleaned;
};
