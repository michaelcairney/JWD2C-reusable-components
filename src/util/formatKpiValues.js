const formatKpiValues = (data) => {
  if (Math.abs(data) >= 1000000000) {
    return `$${Math.round(data / 1000000000).toLocaleString()}b`;
  } else if (Math.abs(data) >= 1000000) {
    return `$${Math.round(data / 1000000).toLocaleString()}m`;
  } else if (Math.abs(data) >= 1000) {
    return `$${Math.round(data / 1000)}k`;
  } else {
    return `$${data}`;
  }
};

export default formatKpiValues;
