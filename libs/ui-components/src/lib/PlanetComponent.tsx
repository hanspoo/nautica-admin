import { Planet } from '@nx-oidc-starter/api';

export function PlanetComponent({
  planet: { name, diameter, description },
}: {
  planet: Planet;
}) {
  return (
    <div className="card card-border w-96">
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{diameter} km2</p>
        <p>{description}</p>
      </div>
    </div>
  );
}
