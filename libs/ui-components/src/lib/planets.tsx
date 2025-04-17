import { gql, useQuery } from '@apollo/client';
import { Planet } from '@nx-oidc-starter/api';

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
      <p>there are {data.planets.length} planets</p>
      <button className="btn btn-neutral">Neutral</button>
      <button className="btn btn-primary">Primary</button>
      <button className="btn btn-secondary">Secondary</button>
      <button className="btn btn-accent">Accent</button>
      <button className="btn btn-info">Info</button>
      <button className="btn btn-success">Success</button>
      <button className="btn btn-warning">Warning</button>
      <button className="btn btn-error">Error</button>
      <button className="btn btn-outline">Default</button>
      <button className="btn btn-outline btn-primary">Primary</button>
      <button className="btn btn-outline btn-secondary">Secondary</button>
      <button className="btn btn-outline btn-accent">Accent</button>
      <button className="btn btn-outline btn-info">Info</button>
      <button className="btn btn-outline btn-success">Success</button>
      <button className="btn btn-outline btn-warning">Warning</button>
      <button className="btn btn-outline btn-error">Error</button>
    </div>
  );
}
