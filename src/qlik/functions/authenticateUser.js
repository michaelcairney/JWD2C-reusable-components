const authenticateUser = async (host, appId, webIntegrationId) => {
  const tenantUri = `https://${host}`;

  // If connecting to qlik enterprise:
  if (!webIntegrationId) {
    try {
      await fetch(tenantUri, { credentials: 'include' });
      const webSocketUrl = `${tenantUri.replace('https', 'wss')}/app/${appId}`;
      return webSocketUrl;
    } catch (error) {
      throw new Error(`Could not authenticate ${tenantUri}: ${error}`);
    }
    // If connecting to qlik cloud:
  } else {
    // Create request function
    const request = async (path, returnJson = true) => {
      const res = await fetch(`${tenantUri}${path}`, {
        credentials: 'include',
        redirect: 'follow',
        headers: {
          'qlik-web-integration-id': webIntegrationId,
        },
      });

      if (res.status < 200 || res.status >= 400) throw res;
      return returnJson ? res.json() : res;
    };

    // Redirect user to the tenant (host) log in screen if not already logged in
    // Once they're signed in, return to the web app
    try {
      await request('/api/v1/users/me', true);
    } catch (error) {
      const returnTo = encodeURIComponent(window.location.href);
      window.location.href = `https://${host}/login?returnto=${returnTo}&qlik-web-integration-id=${webIntegrationId}`;
    }

    // Fetch and return the CSRF token
    try {
      const csrfRes = await request('/api/v1/csrf-token', false);
      const csrfToken = csrfRes.headers.get('qlik-csrf-token');

      const webSocketUrl = `${tenantUri.replace(
        'https',
        'wss',
      )}/app/${appId}?qlik-web-integration-id=${webIntegrationId}&qlik-csrf-token=${csrfToken}`;

      return webSocketUrl;
    } catch (error) {
      throw new Error(
        `Could not get CSRF Token from ${tenantUri}/api/v1/csrf-token: ${error}`,
      );
    }
  }
};

export default authenticateUser;
