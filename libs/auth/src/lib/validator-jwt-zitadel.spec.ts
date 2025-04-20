import { JWTValidator, ValidatorResponse } from './JWTValidator';

const expired = `eyJhbGciOiJSUzI1NiIsImtpZCI6IjMxNjUxMzAyOTg4MzY5MTAxMSIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODAiLCJzdWIiOiIzMTY1MTM1OTE5MzcyMDQyMjciLCJhdWQiOlsiMzE2NTEzNzA3NzY3MTY5MDI3IiwiMzE2NTEzNjMzODk3MDIxNDQzIl0sImV4cCI6MTc0NTE5ODUzMSwiaWF0IjoxNzQ1MTU1MzMxLCJuYmYiOjE3NDUxNTUzMzEsImNsaWVudF9pZCI6IjMxNjUxMzcwNzc2NzE2OTAyNyIsImp0aSI6IlYyXzMxNjUxNzgzNTIxMzg5NzczMS1hdF8zMTY1MTc4MzUyMTM5NjMyNjcifQ.eU1MOA13oM0nQhKK6XdjCuDH-sb8nH-JbLUvk6FYJkT4K6jpmPYWeYnArRpO2IZjMVKInojg2DXKgSF38WlBNFmOoWiGSTVWFJ6GQzE7pS8K_Xz8FfvMyy7NZP7byntGNg58BYASUsdR2hppnGOpR8ISljchq5nnyQbMrdwyz3TMA90HwONMmPWCXj5EOMxX3BKiVaPDwn0N_hxU-LdvOhFPsQxJHiP1jxXRlH7xIhmNpTse-fzaSojiNkc_1MZBQ6fmLZ-tMaILoIeDvEEkgoe7l6JfM6MEhUhC4bDwd9TLuO5wPnqd9qUW4V3d3Wmntzm5hnXnIaO_ZTnbPQQncQ`;
const valid =
  'eyJhbGciOiJSUzI1NiIsImtpZCI6IjMxNjUxMzAyOTg4MzY5MTAxMSIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODAiLCJzdWIiOiIzMTY1MTM1OTE5MzcyMDQyMjciLCJhdWQiOlsiMzE2NTEzNzA3NzY3MTY5MDI3IiwiMzE2NTEzNjMzODk3MDIxNDQzIl0sImV4cCI6MTc0NTE5ODUzMSwiaWF0IjoxNzQ1MTU1MzMxLCJuYmYiOjE3NDUxNTUzMzEsImNsaWVudF9pZCI6IjMxNjUxMzcwNzc2NzE2OTAyNyIsImp0aSI6IlYyXzMxNjUxNzgzNTIxMzg5NzczMS1hdF8zMTY1MTc4MzUyMTM5NjMyNjcifQ.eU1MOA13oM0nQhKK6XdjCuDH-sb8nH-JbLUvk6FYJkT4K6jpmPYWeYnArRpO2IZjMVKInojg2DXKgSF38WlBNFmOoWiGSTVWFJ6GQzE7pS8K_Xz8FfvMyy7NZP7byntGNg58BYASUsdR2hppnGOpR8ISljchq5nnyQbMrdwyz3TMA90HwONMmPWCXj5EOMxX3BKiVaPDwn0N_hxU-LdvOhFPsQxJHiP1jxXRlH7xIhmNpTse-fzaSojiNkc_1MZBQ6fmLZ-tMaILoIeDvEEkgoe7l6JfM6MEhUhC4bDwd9TLuO5wPnqd9qUW4V3d3Wmntzm5hnXnIaO_ZTnbPQQncQ';

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
  it.skip(
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
