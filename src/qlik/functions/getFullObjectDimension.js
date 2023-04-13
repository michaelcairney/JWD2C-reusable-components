const getFullObjectDimension = (layout) => {
  const [objectHeight, objectWidth] = [
    layout?.qHyperCube?.qSize?.qcy,
    layout?.qHyperCube?.qSize?.qcx,
  ];
  const pageDimension = [
    {
      qLeft: 0,
      qTop: 0,
      qWidth: objectWidth,
      qHeight: objectHeight,
    },
  ];

  return pageDimension;
};

export default getFullObjectDimension;
