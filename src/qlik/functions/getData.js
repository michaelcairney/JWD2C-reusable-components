import getFullObjectDimensions from './getFullObjectDimension';

const getData = async (model) => {
  const layout = await model.getLayout();
  const pageDimensions = getFullObjectDimensions(layout);

  if (model.genericType === 'table' || model.genericType === 'kpi') {
    const data = await model.getHyperCubeData('/qHyperCubeDef', pageDimensions);
    return data;
  }

  if (model.genericType === 'listbox') {
    const data = await model.getListObjectData('/qListObjectDef', pageDimensions);
    return data;
  }
};

export default getData;
