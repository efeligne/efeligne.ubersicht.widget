export const getCurrentWidth = (percentage: string) => {
  if (percentage !== 'N/A') {
    return percentage;
  }

  return '0%';
};
