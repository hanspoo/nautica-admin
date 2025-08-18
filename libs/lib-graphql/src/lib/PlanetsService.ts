import { Planet } from '@nautica/api';
import { prisma } from '@nautica/lib-prisma';
import { PlanetDAO } from '@prisma/client';

export class PlanetsService {
  static async addPlanet(
    name: string,
    diameter: number,
    description: string
  ): Promise<Planet> {
    const planet = await prisma.planetDAO.create({
      data: {
        name,
        diameter,
        description,
      },
    });

    return toGraphql(planet);
  }
  static async findById(id: string) {
    const planet = await prisma.planetDAO.findFirst({
      where: {
        id,
      },
    });

    if (planet == null) throw Error(`Planet ${id} not found`);

    return toGraphql(planet);
  }

  static async findAll() {
    if (process.env.DEBUG) console.log('find all starting');

    const all = await prisma.planetDAO.findMany();
    const list = all.map((b) => toGraphql(b as any));

    if (process.env.DEBUG) console.log('find all ending');

    return list;
  }
}

function toGraphql(planet: PlanetDAO) {
  const b: Planet = {
    id: planet.id,
    name: planet.name,
    diameter: planet.diameter,
    description: planet.description,
  };

  return b;
}
