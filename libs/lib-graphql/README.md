# lib-graphql

## Crete new Planet

start server

`npm run start:server`

Go to:

[http://localhost:3333/graphql](http://localhost:3333/graphql)

Enter this operation

```
mutation CreatePlanet($name: String!, $diameter: Int!, $description: String!) {
  createPlanet(name:$name, diameter:$diameter,description: $description, ) {
name
diameter
description
}
}
```

Add this in variables:

```json
{
  "name": "Earth",
  "diameter": 12756,
  "description": "The blue planet, our only home"
}
```

```json
{
  "name": "Mars",
  "diameter": 6779,
  "description": "The red planet"
}
```

```json
{
  "name": "Venus",
  "diameter": 12104,
  "description": "The planet of love"
}
```

copy of postgresql:

```sql
COPY public.planet (id, name, diameter, description, "createdAt", "modifiedAt") FROM stdin;
a2a2c58e-8c19-4288-8949-d3e7e5d7de8e	Mars	6779	The red planet	2025-04-17 09:22:45.748-04	\N
c87d56ce-1286-4a05-bc28-47d84779f609	Venus	12104	The planet of love	2025-04-17 09:28:55.139-04	\N
07a0f817-bee2-45ff-82ca-5a8141c99440	Earth	12756	Best planet	2025-04-17 08:38:24.783-04	\N
\.
```
