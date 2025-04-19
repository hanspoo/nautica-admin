async function opaqueValidation(accessToken: string) {
  const response = await fetch(
    'https://your-auth-provider.com/oauth2/introspect',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ' + Buffer.from('client_id:client_secret').toString('base64'),
      },
      body: new URLSearchParams({
        token: accessToken,
      }),
    }
  );

  const introspection = await response.json();

  if (introspection.active) {
    // Token is valid
  } else {
    // Invalid token
  }
}
