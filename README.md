# NxOidcStarter

A modern classical project to just start putting the code you are paid for.

Stack

- nx
- react
- express
- graphql
- prisma
- tailwind & daisyui
- react-oidc-context
- keycloak
- postgresql

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
