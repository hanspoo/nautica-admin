import { JWTValidator, ValidatorResponse } from './JWTValidator';

const expired = `eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJydm9BMlR5SHg2VEUtam1ZRHdORl9CQllIX0U4LWhEb3R3M2Z2VFFWa3QwIn0.eyJleHAiOjE3NDUwMjcwODQsImlhdCI6MTc0NTAyNjc4NCwiYXV0aF90aW1lIjoxNzQ1MDI2NzgzLCJqdGkiOiIxMTFmMWI4MS1kNjc4LTQxYTAtYjAwNy01NWJlYjY4YmQ5NDMiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODAvcmVhbG1zL3F1aWNrc3RhcnQiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiNDlmYTFmZTUtOGViMy00NmQxLTlhNmQtZjg1YWFkN2Y1MzZiIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicmVhY3QtY2xpZW50Iiwic2Vzc2lvbl9zdGF0ZSI6IjA2ODc1YTYyLTUxZDUtNDk1YS04NGZmLTNkZTBiZDRjZTA5NCIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIl19fSwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsInNpZCI6IjA2ODc1YTYyLTUxZDUtNDk1YS04NGZmLTNkZTBiZDRjZTA5NCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6IkFsaWNlIExpZGRlbCIsInByZWZlcnJlZF91c2VybmFtZSI6ImFsaWNlIiwiZ2l2ZW5fbmFtZSI6IkFsaWNlIiwiZmFtaWx5X25hbWUiOiJMaWRkZWwiLCJlbWFpbCI6ImFsaWNlQGtleWNsb2FrLm9yZyJ9.DpMzklceTwFdDpUFt7o4zkC96hAnvb10b2EyvB7NJFk6pKLqkZ4ubQlT0mHiVDrBXeWy7fdId2EKbAjbEiET4TxoXPMNVZw2zsVypoAB2QiNQHwJ3sNC20GyEkf_e5gJmALzKx55au4m0_swSSGxNfl8SOkkc44J74M2n1oqBmyvaKzZTelhkePZjxnJvegt0oScYOuW0cSZDciwHDQovj9Oo8ITePuSDFCIn1p_MYkMwgrt4x_MXzSbe2f2VP5rStoBzqeEQ8kP3O4jHp8RULGcwo34fonIABUes8gZCGMrHrSwZwBV2sGvVMT5zYW0eykOgf5cNMDuVhl4wx_Jzw`;
const valid =
  'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJydm9BMlR5SHg2VEUtam1ZRHdORl9CQllIX0U4LWhEb3R3M2Z2VFFWa3QwIn0.eyJleHAiOjE3NDUwNzAyNDUsImlhdCI6MTc0NTA2OTk0NSwiYXV0aF90aW1lIjoxNzQ1MDY4NDQyLCJqdGkiOiJmMzAyZjRiNS0xOWQ4LTQ2YzAtOTRjNi1kYjA0ZDMxMTEwMGYiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODAvcmVhbG1zL3F1aWNrc3RhcnQiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiNDlmYTFmZTUtOGViMy00NmQxLTlhNmQtZjg1YWFkN2Y1MzZiIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicmVhY3QtY2xpZW50Iiwic2Vzc2lvbl9zdGF0ZSI6IjUxOWU0Y2YwLTJkNWMtNDI4MC04OTdmLWRmMjJkMWJmNDMzNiIsImFjciI6IjAiLCJhbGxvd2VkLW9yaWdpbnMiOlsiKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIl19fSwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsInNpZCI6IjUxOWU0Y2YwLTJkNWMtNDI4MC04OTdmLWRmMjJkMWJmNDMzNiIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6IkFsaWNlIExpZGRlbCIsInByZWZlcnJlZF91c2VybmFtZSI6ImFsaWNlIiwiZ2l2ZW5fbmFtZSI6IkFsaWNlIiwiZmFtaWx5X25hbWUiOiJMaWRkZWwiLCJlbWFpbCI6ImFsaWNlQGtleWNsb2FrLm9yZyJ9.obKKOv4DTNjKE-ntNkHQ1_w3l92ZWmqQ_HJP5iTjY2DA1fNEF53F4Dz9KigXViOD8LubX0E36pqRka4Ynq61FBps_ILMxVrxT9-k1Q4Cukt47ZqN1ajUqy8tfyxDwFnLHKFmD56WUiAo2S9Q3LDXEP8Oh5Fu_w33GimCBboR_ODorJmopNrRsmYG9c3nTSuNriXeKX2knOli7060NrzLmLFjpxmdcCwepsjhlroJ1g1zkiptJWc7EUMchZNbODaTqprf1nhyq5BMccuH6TFMSJ67h_T7f1oY-x0jsgAnA2-PEIOBJ58trWr2YSb7SXKnItGgxyXzbXorJyQvQPbXmQ';

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
  azp: 'react-client',
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
