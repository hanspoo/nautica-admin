import { Boat } from '@prisma/client';
import fs from 'fs';
import { prisma } from './lib-prisma';
import { BoteJson } from './BoteJson';

const re = /\/?(\w+\.\w+)$/;

export function extractFile(fullPath: string): string {
  console.log(`extracting file name from ${fullPath}`);
  const match = re.exec(fullPath);
  if (!match) throw Error();
  return match[1];
}

export async function initBoatsDB() {
  const boatsPath = process.env.VITE_NAUTICA_SITE + '/src/data/boats.json';
  if (!fs.existsSync(boatsPath)) {
    console.error(`${boatsPath} no existe, saltando inicialización`);
    return;
  }

  const boats = JSON.parse(
    fs.readFileSync(boatsPath).toString()
  ) as Array<BoteJson>;

  await prisma.boat.deleteMany();

  const botes = boats.map((b) => {
    if (b['detailImg7'] !== undefined) {
      delete b['detailImg7'];
    }
    const nuevo: Boat = {
      ...b,
      caracteristicas: convertToArray(b.caracteristicas),
    };

    nuevo.imagen = extractFile(b.imagen);
    for (let index = 1; index <= 6; index++) {
      const fname = `detailImg${index}` as keyof Boat;

      if (Array.isArray(b[fname])) {
        throw Error();
      } else {
        nuevo[fname] = extractFile(b[fname] as string) as any;
      }
    }

    return nuevo;
  });
  try {
    const newboats = await prisma.boat.createMany({
      data: botes,
    });
    return newboats;
  } catch (error: any) {
    console.log(error.message);
    throw Error(error.message);
  }
}
function convertToArray(caracteristicas: Record<string, string>): string[] {
  return Object.values(caracteristicas);
}
