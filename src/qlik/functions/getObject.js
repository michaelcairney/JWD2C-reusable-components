const getObject = async (app, objectId) => {
  try {
    const model = await app.getObject(objectId);
    return model;
  } catch (error) {
    throw new Error(
      `getObject function threw an error - could not fetch object with id ${objectId} from app ${app.id}: ${error}`,
    );
  }
};

export default getObject;
