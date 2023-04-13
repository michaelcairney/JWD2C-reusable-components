import { useEffect, useState } from 'react';
import authenticateUser from '../functions/authenticateUser';
import createEngineSession from '../functions/createEngineSession';

const useApp = (host, appId, webIntegrationId = '') => {
  const [app, setApp] = useState(null);
  const [global, setGlobal] = useState(null);

  useEffect(() => {
    async function openSession() {
      try {
        // log in
        const webSocketUrl = await authenticateUser(host, appId, webIntegrationId);

        // create session
        const session = createEngineSession(webSocketUrl);

        // open session
        const globalObject = await session.open();

        setGlobal(globalObject);
      } catch (error) {
        throw new Error(
          `Session from ${host} could not be opened. Reason: ${error.message}`,
        );
      }
    }

    openSession();
  }, []);

  useEffect(() => {
    async function openApp() {
      try {
        // open app
        const doc = await global.openDoc(appId);

        // set app to state
        setApp(doc);
      } catch (error) {
        throw new Error(
          `App ${appId} could not be opened. Reason: ${error.message}`,
        );
      }
    }
    if (global) {
      openApp();
    }
  }, [global]);

  return app;
};

export default useApp;
