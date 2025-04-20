# NxOidcStarter

A minimal modern starter for your new full stack app: start putting the code you are paid for.

Stack

- nx
- react
- express
- graphql
- apollo client and server
- prisma
- tailwind & daisyui
- react-oidc-context
- keycloak
- postgresql

Grapqhl and REST ready.

## Quick start

```
git clone https://github.com/hanspoo/nx-oidc-starter
cd nx-oidc-starter/
npm install
cp .env.sample .env
npm run generate
npm run start:server
```

in other terminal

```
npm run start:front
```

Use credentials:

`user alice password alice`

finally, start keycloak and postgres in a docker compose

```
cd docker-dev/
docker compose up
```

## Dev mode

Install nx globally

`npm i -g nx@latest`

run the docker compose and

`nx serve front`
`nx serve server`
