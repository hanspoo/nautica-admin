import { Planet } from '@nx-oidc-starter/api';

export function PlanetComponent({
  planet: { name, diameter, description },
}: {
  planet: Planet;
}) {
  return (
    <div className="card card-border w-96 mb-2">
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p className="mb-2">{description}</p>
        <p>
          {diameter} km<sup>2</sup>
        </p>
      </div>
    </div>
  );
}
