import { Dimensions } from "react-native";

export const formatDateConvertToDat = (dateStr: string) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short", // Thu
    month: "short", // Sep
    day: "numeric", // 24
  };
  return date.toLocaleDateString("en-US", options);
};

export const formatDateConvertToStringDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    month: "short", // Sep
    day: "numeric", // 24
  };
  return date.toLocaleDateString("en-US", options);
};

export const timeFormateInstragram = (timestamp: any) => {
  const now: any = new Date();
  const postedDate: any = new Date(timestamp);
  const diffInSeconds = Math.floor((now - postedDate) / 1000);

  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800)
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  if (diffInSeconds < 2592000)
    return `${Math.floor(diffInSeconds / 604800)}w ago`;
  if (diffInSeconds < 31536000)
    return `${Math.floor(diffInSeconds / 2592000)}mo ago`;

  return `${Math.floor(diffInSeconds / 31536000)}y ago`;
};

const { height, width, fontScale } = Dimensions.get("window");

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;
export const _width = width;

export const dynamicWidth = (size: number) =>
  (width / guidelineBaseWidth) * size;
export const dynamicHeight = (size: number) =>
  (height / guidelineBaseHeight) * size;
export const scaleFont = (size: number) => {
  if (width < 400) return size * 0.9; // Small screen
  if (width < 600) return size * 1.0; // Medium screen
  return size * 1.2;
};
