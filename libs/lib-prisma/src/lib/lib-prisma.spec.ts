import { Boat } from '@prisma/client';
import { prisma } from './lib-prisma';
import fs from 'fs';

describe('libPrisma', () => {
  it('should work', async () => {
    const boats = JSON.parse(
      fs
        .readFileSync('/home/julian/lucas/NauticaCalderon/src/data/boats.json')
        .toString()
    ) as Array<Boat>;

    await prisma.boat.deleteMany();
    const newboats = await prisma.boat.createMany({
      data: boats.map((b) => {
        b.imagen = extractFile(b.imagen);
        for (let index = 1; index <= 6; index++) {
          const fname = `detailImg${index}` as keyof Boat;

          if (Array.isArray(b[fname])) {
            throw Error();
          } else {
            b[fname] = extractFile(b[fname] as string) as any;
          }
        }

        return b;
      }),
    });

    expect(newboats.count).toEqual(9);
  });
});
const re = /\/(\w+\.\w+)$/;
function extractFile(imagen: string): string {
  const match = re.exec(imagen);
  if (!match) throw Error();
  return match[1];
}
