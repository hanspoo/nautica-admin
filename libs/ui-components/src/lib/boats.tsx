import { Link } from 'react-router-dom';
import BoatsMain from './boats-main';

export function Boats() {
  return (
    <div className="min-h-screen">
      <h1 className="mb-2 text-3xl font-bold">Boats</h1>
      <Link to="/boats/new" className="hidden btn btn-primary mb-4 ml-6">
        New Boat
      </Link>
      <p className="opacity-50 text-sm mb-6">
        To create new boats, select the most similar and use the clone option.
      </p>
      <BoatsMain />
    </div>
  );
}
