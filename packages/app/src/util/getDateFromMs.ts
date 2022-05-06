const getDateFromMs = (timestamp: number) => {
  const date = new Date(timestamp);

  return date.toLocaleString('en-US');
};

export default getDateFromMs;
