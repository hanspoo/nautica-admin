# full-stack-starter

This is a project about going back to basics—with style. We’re building a super minimal full stack setup, with the freedom to evolve it however we want. The only rule? Use cool tech and free software. Always.

A minimal modern starter for your new full stack app: start putting the code you are paid for.

## So what do we really need?

Let’s keep it simple. A modern full stack setup usually boils down to:

- The Browser  
   Where your frontend lives and runs.
- The Server  
   Mostly just sending JSON and talking to a database.
- The Auth Broker  
   Handles user logins using OIDC (OpenID Connect).

That’s the core—we build everything else on top.

## Stack

- nx
- react
- express
- graphql
- prisma
- react-oidc-context
- tailwind & daisyui
- apollo client and server
- keycloak || zitadel
- postgresql

Grapqhl and REST ready.

## Quick start

[view youtube video - in spanish](https://youtu.be/d9CUBPas-qk)

```
git clone https://github.com/hanspoo/nx-oidc-starter
cd nx-oidc-starter/
npm install

npm run generate
```

to start the server you must copy environment of keycloak or zitadel, for example:

```
cp .env.sample.keycloak .env
npm run start:server
```

in other terminal

```
npm run start:front
```

Use credentials:

With keycloak

`user alice:, password: alice`

With zitadel

`user: alice, password: Password2!`

finally, start the identity broker (keycloak in this case) and postgres from a docker compose:

```
cd docker-dev-keycloak
docker compose up
```

## Dev mode

Install nx globally

`npm i -g nx@latest`

run the docker compose and

`nx serve front`
`nx serve server`

## Why ?

### Why bother reinventing the wheel?

Because sometimes you really need to know how that wheel turns.

Modern frameworks are great, but they hide a lot. If you want to understand what’s actually happening under the hood—or even just tweak something—you need to dig deeper.

How deep? That’s up to you. As always: it depends.

### We need to ship stuff now

Yeah, we get it. Deadlines, clients, bills. But wouldn’t it be nice if the stuff we built today could also help us level up tomorrow?

This project is about doing both: delivering real software while building a foundation we actually understand—and can grow with.

### “Don’t think, just do it this way!”

That kind of thinking kills creativity. Our brains want to think—it’s what they’re built for. Let's lean into that, not fight it.

### “But X/Y/Z already does everything!”

Sure, it might. But you didn’t build it. And until you understand it, it’s just magic.

We’re here to break that magic down and put it back together, piece by piece.

## Our Tech Stack

### 🧠 Language: TypeScript

The browser speaks JavaScript, but we’re using TypeScript because it makes life better. Types = sanity. We’re using it everywhere—frontend and backend.

### ⚙️ Workspace: Nx + VSCode

Nx gives us a nice monorepo setup. Organize apps, share code, run builds, debug—it’s all in one place. VSCode ties it all together.

### 🎨 Frontend: React + Tailwind + DaisyUI

Good ol’ React, styled with Tailwind for utility-first CSS, and DaisyUI for prebuilt, good-looking components out of the box.

### 🧩 Backend: Express + Prisma

Express is simple and proven. Prisma gives us a modern, type-safe ORM. Together, they make backend dev way less painful.

### 🔁 Front ↔ Back: REST or GraphQL

Why choose? We’re doing both. REST for the classics, and its evolution: GraphQL.

### 🔐 Auth: OpenID Connect, Keycloak or Zitadel

The standard. We're using Keycloak and Zitadel—both open source, both awesome.

## What we’ve got so far

- Login + logout working, with test users set up in the identity provider
- After login, go to the “Planets” page
- You’ll see a nice DaisyUI card, filled with data pulled via GraphQL

That’s the starting point. From here, it's your playground. Add features, swap tools, build your own flavor of full stack.

Let’s roll. 🚀
