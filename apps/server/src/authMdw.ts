import { JWTValidator } from '@nx-oidc-starter/auth';
import { NextFunction, Request, Response } from 'express';

export const authMdw = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const hostName = req.headers.host;
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  if (!hostName) {
    throw Error('Hostname no está definido');
  }
  const token = readAccessTokenFromRequest(req);
  if (token) {
    try {
      const validatorResponse = await new JWTValidator(
        process.env.VITE_AUTHORITY
      ).validateToken(token);
      if (process.env.DEBUG)
        console.log('Token validated ' + JSON.stringify(validatorResponse));

      if (validatorResponse && validatorResponse.email) {
        next();
      }
    } catch (error) {
      console.log(error);
      res.status(401).send('Authorization error');
    }
  } else {
    res.status(401).send('Authorization header not present');
  }
};

/**
 * Para permitir que el token venga en el query string en vez de en el
 * header de autenticación.
 *
 * In particular for get requests of media files where there is
 * complez to add the authorization header, we've chosen to put the
 * token in the url.
 *
 * @param req
 * @returns
 */
function readAccessTokenFromRequest(req: Request): string | undefined {
  const authorization = req.headers['authorization'];
  if (authorization) {
    const [, token] = authorization.trim().split(/ /);
    return token;
  }

  // Habilitamos token en url sólo para los archivos
  if (!/denuncias\/.*\/files/.test(req.url)) {
    return undefined;
  }

  const t = req.query.t as string;
  return t;
}
