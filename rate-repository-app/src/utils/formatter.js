export const formatNumber = (number) => {
  if (number >= 1000) {
    const formattedNumber = (number / 1000).toFixed(1);
    return `${formattedNumber}k`;
  }
  return number.toString();
};

export const formatDateString = (inputDateString) => {
  const inputDate = new Date(inputDateString);

  const formattedDate = inputDate.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  return formattedDate;
};
