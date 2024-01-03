const formatNumber = (number) => {
  if (number >= 1000) {
    const formattedNumber = (number / 1000).toFixed(1);
    return `${formattedNumber}k`;
  }
  return number.toString();
};

export default formatNumber;