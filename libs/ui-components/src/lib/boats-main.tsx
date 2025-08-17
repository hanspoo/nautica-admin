import React, { useEffect, useState } from 'react';
import axios from 'axios';

import BoatsGrid from './boats-grid';
import BoatsList from './boats-list';
import { ListBulletIcon, Squares2X2Icon } from '@heroicons/react/20/solid';

interface Boat {
  id: string;
  imagen: string;
  detailImg1?: string;
  detailImg2?: string;
  detailImg3?: string;
  detailImg4?: string;
  detailImg5?: string;
  detailImg6?: string;
  tittle: string;
  value: string;
  duracion: string;
  personas: string;
  bedrooms: string;
  largo: string;
  info: string;
  marca: string;
  materialCasco: string;
  año: string;
  modeloMotor: string;
  Horas: string;
  Carga: string;
  pasajeros: string;
  tipoDeCombustible: string;
  horasDeUso: string;
  descripcion: string;
  caracteristicas: string[];
}

enum ViewType {
  LIST,
  GRID,
}

const BoatsMain: React.FC = () => {
  const [boats, setBoats] = useState<Boat[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewType, setViewType] = useState(ViewType.LIST);

  useEffect(() => {
    const fetchBoats = async () => {
      try {
        const res = await axios.get<Boat[]>('/api/boats');
        setBoats(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBoats();
  }, []);

  if (loading) return <p className="text-center mt-4">Loading boats...</p>;
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
