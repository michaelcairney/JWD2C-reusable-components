const selectFieldValue = async (app, fieldName, value) => {
  try {
    const field = await app.getField(fieldName);
    const select = await field.selectValues([{ qText: value }], true);
  } catch (error) {
    throw new Error(`Could not select field: ${error}`);
  }
};

export default selectFieldValue;
