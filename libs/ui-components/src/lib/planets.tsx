import { gql, useQuery } from '@apollo/client';
import { Planet } from '@nx-oidc-starter/api';
import { PlanetComponent } from './planet-component';

const GET_PLANET_PHOTO = gql`
  query Planet {
    planets {
      id
      name
      description
      diameter
    }
  }
`;

export function Planets() {
  const { loading, error, data } = useQuery<{ planets: Array<Planet> }>(
    GET_PLANET_PHOTO,
    {}
  );

  if (loading) return null;
  if (error) return `Error! ${error}`;
  if (!data) return `A real error`;

  return (
    <div>
      <p className="mb-2">there are {data.planets.length} planets</p>
      {data.planets.map((p) => (
        <PlanetComponent planet={p} />
      ))}
    </div>
  );
}
