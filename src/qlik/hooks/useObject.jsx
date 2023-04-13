import { useEffect, useState } from 'react';
import getData from '../functions/getData';
import getObject from '../functions/getObject';

const useObject = (app, objectId, pageSpec = null) => {
  const [model, setModel] = useState();
  const [data, setData] = useState();
  const [layout, setLayout] = useState();
  // === Get the object model === //
  useEffect(() => {
    const fetchModel = async () => {
      const newModel = await getObject(app, objectId);
      setModel(newModel);
    };

    if (app) {
      fetchModel();
    }
  }, [app]);
  // === Fetch for object data === //
  useEffect(() => {
    const fetchLayoutAndData = async () => {
      const newLayout = await model.getLayout();
      const newData = await getData(model, pageSpec);
      setLayout(newLayout);
      setData(newData);
    };

    if (model) {
      model.on('changed', fetchLayoutAndData);
      fetchLayoutAndData();
    }

    return () => {
      if (model) {
        model.removeListener('changed', fetchLayoutAndData);
      }
    };
  }, [model, pageSpec]);

  return { data, model, layout };
};

export default useObject;
