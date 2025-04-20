declare global {
  namespace NodeJS {
    interface ProcessEnv {
      VITE_BASE_URL: string;
      VITE_CLIENT_ID: string;
      VITE_AUTHORITY: string;
      OIDC_ISSUER: string;
      JWKS_SUFFIX: string;
      DEBUG: string;
      AUDIENCE: string;
    }
  }
}

export {};
