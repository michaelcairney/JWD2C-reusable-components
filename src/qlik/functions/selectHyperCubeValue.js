const selectHyperCubeValue = async (model, dimIndex, elemNums) => {
  try {
    const result = await model.selectHyperCubeValues(
      '/qHyperCubeDef',
      dimIndex,
      [elemNums],
      true,
    );
    return result;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export default selectHyperCubeValue;
