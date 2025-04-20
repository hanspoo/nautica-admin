import { JWTValidator, ValidatorResponse } from './JWTValidator';

const expired = `eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJPMEJ3NGpwYnNCYjV5aVBfNVdPeTQ4U2VVdWRNeGt6bTlDcGdtM2h5cWdjIn0.eyJleHAiOjE3NDUxNjQwMTEsImlhdCI6MTc0NTE2MzcxMSwiYXV0aF90aW1lIjoxNzQ1MTYzNDcxLCJqdGkiOiJlNTA2NGMzYy05YWUyLTQ1NjQtYmVlZC1hY2VmNTdkYmNmMWEiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODAvcmVhbG1zL3F1aWNrc3RhcnQiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiZjI1M2NmNmMtYWUzZS00MWFmLTg5ZTItZTcxMGQ4M2RmNjY4IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiZWFydGgiLCJzZXNzaW9uX3N0YXRlIjoiY2Y1ZmE0M2EtZWVlMS00YTM1LWJlNWUtODBmMjhlZTc3MjhjIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIqIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVzZXIiXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiXX19LCJzY29wZSI6Im9wZW5pZCBlbWFpbCBwcm9maWxlIiwic2lkIjoiY2Y1ZmE0M2EtZWVlMS00YTM1LWJlNWUtODBmMjhlZTc3MjhjIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoiQWxpY2UgTGlkZGVsIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiYWxpY2UiLCJnaXZlbl9uYW1lIjoiQWxpY2UiLCJmYW1pbHlfbmFtZSI6IkxpZGRlbCIsImVtYWlsIjoiYWxpY2VAa2V5Y2xvYWsub3JnIn0.H8V_ZWVCGLcQDcgydFqMv7FsM73XFmNrpM64iJIsKw2i0lwT9fsMYL_ZCWA6ZBcMw4lP1w_L-16ygr-RHkN7BXGZLIJX2_6CRwDWnwJxAodtn4AO5qZBhAUTwxPnlGVKzYYDm8ByVHOJFDBtkRu3G_asyq70W5GzG5NNLx5KbLpDn17sVFWCGD4sWeJ4gbp3EitCidPXfzxfZLS-aeUxB2s1G1KmzWweZINO8LEMk_JYJYWWUE6Ps-djj1UGHQbImm1MS1WPsqVCWFGxD9zprDnH4AvGl9YT4eu9cR5smQ2k6192f0n7uZ7gzKyDeDS7e40MCrNL4HWmo9IJLXfFeQ`;
const valid =
  'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJPMEJ3NGpwYnNCYjV5aVBfNVdPeTQ4U2VVdWRNeGt6bTlDcGdtM2h5cWdjIn0.eyJleHAiOjE3NDUxNjQwMTEsImlhdCI6MTc0NTE2MzcxMSwiYXV0aF90aW1lIjoxNzQ1MTYzNDcxLCJqdGkiOiJlNTA2NGMzYy05YWUyLTQ1NjQtYmVlZC1hY2VmNTdkYmNmMWEiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODAvcmVhbG1zL3F1aWNrc3RhcnQiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiZjI1M2NmNmMtYWUzZS00MWFmLTg5ZTItZTcxMGQ4M2RmNjY4IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiZWFydGgiLCJzZXNzaW9uX3N0YXRlIjoiY2Y1ZmE0M2EtZWVlMS00YTM1LWJlNWUtODBmMjhlZTc3MjhjIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIqIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVzZXIiXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiXX19LCJzY29wZSI6Im9wZW5pZCBlbWFpbCBwcm9maWxlIiwic2lkIjoiY2Y1ZmE0M2EtZWVlMS00YTM1LWJlNWUtODBmMjhlZTc3MjhjIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoiQWxpY2UgTGlkZGVsIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiYWxpY2UiLCJnaXZlbl9uYW1lIjoiQWxpY2UiLCJmYW1pbHlfbmFtZSI6IkxpZGRlbCIsImVtYWlsIjoiYWxpY2VAa2V5Y2xvYWsub3JnIn0.H8V_ZWVCGLcQDcgydFqMv7FsM73XFmNrpM64iJIsKw2i0lwT9fsMYL_ZCWA6ZBcMw4lP1w_L-16ygr-RHkN7BXGZLIJX2_6CRwDWnwJxAodtn4AO5qZBhAUTwxPnlGVKzYYDm8ByVHOJFDBtkRu3G_asyq70W5GzG5NNLx5KbLpDn17sVFWCGD4sWeJ4gbp3EitCidPXfzxfZLS-aeUxB2s1G1KmzWweZINO8LEMk_JYJYWWUE6Ps-djj1UGHQbImm1MS1WPsqVCWFGxD9zprDnH4AvGl9YT4eu9cR5smQ2k6192f0n7uZ7gzKyDeDS7e40MCrNL4HWmo9IJLXfFeQ';

const FIVETEEEN_SECONDS = 15 * 1000;
const issuer = process.env.VITE_AUTHORITY;

describe('validate token jwt', () => {
  it('null token must throw', async () => {
    const f = async () => {
      await new JWTValidator(issuer).validateToken('');
    };
    expect(f()).rejects.toThrow();
  });
  it(
    'token valid but expired',
    async () => {
      const f = async () =>
        await new JWTValidator(issuer).validateToken(expired);

      expect(f()).rejects.toThrow('jwt expired');
    },
    FIVETEEEN_SECONDS
  );
  it(
    'valid token but invalid must give status rejected',
    async () => {
      const res: ValidatorResponse = await new JWTValidator(
        issuer
      ).validateToken(valid);
      console.log(res);

      expect(res.email).toBeTruthy();
    },
    FIVETEEEN_SECONDS
  );
});

const sample = {
  exp: 1745070245,
  iat: 1745069945,
  auth_time: 1745068442,
  jti: 'f302f4b5-19d8-46c0-94c6-db04d311100f',
  iss: 'http://localhost:8080/realms/quickstart',
  aud: 'account',
  sub: '49fa1fe5-8eb3-46d1-9a6d-f85aad7f536b',
  typ: 'Bearer',
  azp: 'earth',
  session_state: '519e4cf0-2d5c-4280-897f-df22d1bf4336',
  acr: '0',
  'allowed-origins': ['*'],
  realm_access: { roles: ['offline_access', 'user'] },
  resource_access: { account: { roles: [Array] } },
  scope: 'openid profile email',
  sid: '519e4cf0-2d5c-4280-897f-df22d1bf4336',
  email_verified: false,
  name: 'Alice Liddel',
  preferred_username: 'alice',
  given_name: 'Alice',
  family_name: 'Liddel',
  email: 'alice@keycloak.org',
};
