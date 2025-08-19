import React, { useEffect, useState } from 'react';

import BoatsGrid from './boats-grid';
import BoatsList from './boats-list';
import {
  ExclamationTriangleIcon,
  ListBulletIcon,
  Squares2X2Icon,
} from '@heroicons/react/20/solid';
import { useAxios } from './useAxios';

import { BoatAPI } from '@nautica/api';

enum ViewType {
  LIST,
  GRID,
}

const BoatsMain: React.FC = () => {
  const axios = useAxios();
  const [boats, setBoats] = useState<BoatAPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [viewType, setViewType] = useState(ViewType.LIST);

  useEffect(() => {
    const fetchBoats = async () => {
      try {
        const res = await axios.get<BoatAPI[]>('/api/boats');
        setBoats(res.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBoats();
  }, []);

  if (loading) return <p className="text-center mt-4">Loading boats...</p>;
  if (error)
    return (
      <div role="alert" className="alert alert-error">
        <ExclamationTriangleIcon />
        <span>{error}.</span>
      </div>
    );
  if (!boats.length)
    return <p className="text-center mt-4">No boats available.</p>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          marginBottom: '2em',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div
          className="column"
          style={{ opacity: 0.5, fontStyle: 'italic', fontSize: '.9em' }}
        >
          hay {boats.length} {boats.length === 1 ? 'bote' : 'botes'}{' '}
        </div>
        <div style={{ display: 'flex' }}>
          <div className="btn-group">
            <button
              onClick={() => setViewType(ViewType.LIST)}
              className={`btn ${viewType === ViewType.LIST ? 'active' : ''}`}
            >
              <ListBulletIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewType(ViewType.GRID)}
              className={`btn ${viewType === ViewType.GRID ? 'active' : ''}`}
            >
              <Squares2X2Icon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      {viewType === ViewType.GRID ? (
        <BoatsGrid boats={boats} />
      ) : (
        <BoatsList boats={boats} />
      )}
    </div>
  );
};

export default BoatsMain;
