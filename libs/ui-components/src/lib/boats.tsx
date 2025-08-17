import { Link } from 'react-router-dom';
import BoatsMain from './boats-main';

export function Boats() {
  return (
    <div className="min-h-screen bg-base-200">
      <h1 className="text-3xl font-bold text-center py-6">Boats</h1>
      <Link to="/boats/new" className="btn btn-primary mb-4 ml-6">
        Add New Boat
      </Link>
      <BoatsMain />
    </div>
  );
}
