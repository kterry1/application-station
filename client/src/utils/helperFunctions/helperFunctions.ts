const capitalizeText = (text: string): string => {
  return `${text.charAt(0).toUpperCase()}${text.slice(1).toLowerCase()}`;
};

const truncateString = (str: string, maxLength: number = 20) => {
  if (str.length <= maxLength) {
    return str;
  }

  return `${str.slice(0, maxLength)}...`;
};

export { capitalizeText, truncateString };
