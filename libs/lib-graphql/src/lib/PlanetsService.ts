import { Planet } from '@nx-oidc-starter/api';
import { prisma } from '@nx-oidc-starter/lib-prisma';
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

    return planetDTOToGraphql(planet);
  }
  static async findById(id: string) {
    const planet = await prisma.planetDAO.findFirst({
      where: {
        id,
      },
    });

    if (planet == null) throw Error(`Planet ${id} not found`);

    return planetDTOToGraphql(planet);
  }

  static async findAll() {
    const all = await prisma.planetDAO.findMany();
    return all.map((b) => planetDTOToGraphql(b as any));
  }
}

function planetDTOToGraphql(planet: PlanetDAO) {
  const b: Planet = {
    name: planet.name,
    diameter: planet.diameter,
    description: planet.description,
  };

  return b;
}
