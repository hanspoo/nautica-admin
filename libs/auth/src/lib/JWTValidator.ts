import jwksClient from 'jwks-rsa';
import jwt from 'jsonwebtoken';

// const issuer = process.env.VITE_AUTHORITY;
// if (!issuer) throw Error('OIDC Issuer not defined');

//
// VITE_AUTHORITY format: 'https://<your-keycloak-domain>/realms/<your-realm>';
//

export class JWTValidator {
  constructor(public issuer: string) {}

  getKey = async (header: jwt.JwtHeader, callback: jwt.SigningKeyCallback) => {
    console.log({
      jwksUri: `${this.issuer}/${process.env.JWKS_SUFFIX}`,
    });
    const client = jwksClient({
      jwksUri: `${this.issuer}/${process.env.JWKS_SUFFIX}`,
    });
    client.getSigningKey(header.kid, (err: any, key: any) => {
      if (err) {
        return callback(err, undefined);
      }

      const signingKey = key?.getPublicKey();
      callback(null, signingKey);
    });
  };

  validateToken(token: string) {
    return new Promise((resolve: (x: ValidatorResponse) => void, reject) => {
      const args: any = {
        audience: process.env.AUDIENCE,
        issuer: this.issuer,
        algorithms: ['RS256'],
      };
      console.log({ args });
      jwt.verify(token, this.getKey, args, (err: any, decoded: any) => {
        if (err) return reject(err);
        resolve(decoded);
      });
    });
  }
}

export interface ValidatorResponse {
  acr: string;
  'allowed-origins': string[];
  aud: string;
  auth_time: number;
  azp: string;
  email: string;
  email_verified: boolean;
  exp: number;
  family_name: string;
  given_name: string;
  iat: number;
  iss: string;
  jti: string;
  name: string;
  preferred_username: string;
  realm_access: {
    roles: string[];
  };
  resource_access: {
    account: {
      roles: string[];
    };
  };
  scope: string;
  session_state: string;
  sid: string;
  sub: string;
  typ: string;
}
