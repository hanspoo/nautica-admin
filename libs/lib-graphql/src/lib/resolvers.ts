import { Planet } from '@nx-oidc-starter/api';
import { BooksService } from './BooksService';
import { PlanetsService } from './PlanetsService';

export const resolvers = {
  Query: {
    books: () => BooksService.findAll(),
    planets: () => PlanetsService.findAll(),
  },
  Mutation: {
    createPlanet: (
      _: unknown,
      args: { name: string; diameter: number; description: string }
    ): Promise<Planet> => {
      return PlanetsService.addPlanet(
        args.name,
        args.diameter,
        args.description
      );
    },
  },
};
