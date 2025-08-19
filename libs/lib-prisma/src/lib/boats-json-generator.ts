import fs from 'fs';
import { prisma } from './lib-prisma';

import { Boat } from '@prisma/client';
import { BoteJson } from './BoteJson';
export class BoatsJsonGenerator {
  async generate() {
    const boatsPath = process.env.VITE_NAUTICA_SITE + '/src/data/boats.json';
    const boats = (await prisma.boat.findMany()) as Array<Boat>;

    const list = boats.map((b) => {
      for (let index = 1; index <= 6; index++) {
        const fieldName = `detailImg${index}` as keyof Boat;
        if (Array.isArray(b[fieldName])) {
          throw Error();
        } else {
          b[fieldName] = `/Imgs/botes/${b.id}/${b[fieldName]}` as any;
        }
      }

      b.imagen = `/Imgs/botes/${b.id}/${b.imagen}`;

      const nuevo = {
        ...b,
        caracteristicas: toRecord(b.caracteristicas),
      } as BoteJson;
      return nuevo;
    });

    fs.writeFileSync(boatsPath, JSON.stringify(list, null, 2));
  }
}
function toRecord(caracteristicas: string[]): Record<string, string> {
  const chars: Record<string, string> = {};
  for (let index = 0; index < caracteristicas.length; index++) {
    const element = caracteristicas[index];
    chars[`carac${index + 1}`] = element;
  }
  return chars;
}
