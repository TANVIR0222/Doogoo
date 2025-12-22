
export const makeImage = (url: any) => {
  if (!url) return "";

  const fullUrl = url.startsWith("https") ? url : `${ImageUrl}${url}`;

  return encodeURI(fullUrl);
};
