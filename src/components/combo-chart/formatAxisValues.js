const formatAxisValues = (data) => {
  const dataAbs = Math.abs(data);
  if (dataAbs >= 1000000000) {
    return `${data / 1000000000}B`;
  } else if (dataAbs >= 1000000) {
    return `${data / 1000000}M`;
  } else if (dataAbs >= 1000) {
    return `${data / 1000}K`;
  } else if (data === 0) {
    return '0';
  } else {
    return `${data}`;
  }
};

export default formatAxisValues;
