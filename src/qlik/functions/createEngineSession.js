import enigma from 'enigma.js';
import schema from 'enigma.js/schemas/12.20.0.json';

const createEngineSession = (webSocketUrl) => {
  const session = enigma.create({
    schema,
    url: webSocketUrl,
  });

  const urlSplit = webSocketUrl.split(/[/,?]/);
  const appIdIndex = urlSplit.indexOf('app') + 1;
  const appId = urlSplit[appIdIndex];

  session.on('opened', () => console.log(`Session opened for app ${appId}`));
  session.on('closed', () => console.log(`Session closed for app ${appId}`));

  return session;
};

export default createEngineSession;
