const getColor = zscore => {
  const value = Math.abs(zscore);
  if (value >= 3) {
    return '#777777';
  }
  if (value >= 2) {
    return '#ff7070';
  }
  if (value >= 1) {
    return '#dede32';
  }
  return '#BADA55';
};

export default getColor;
