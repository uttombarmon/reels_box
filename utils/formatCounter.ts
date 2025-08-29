export const formatCount = (num: number): string => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "k";
  }
  const numStr = num.toString();
  return numStr;
};
