import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowUturnLeftIcon } from '@heroicons/react/20/solid';
import { BoatGeneralSection } from './boat-general-section';
import { BoatPhotosSection } from './boat-photos-section';
import { BoatCharsSection } from './boat-chars-section';

interface Boat {
  id: string;
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
  imagen: string;
  detailImg1?: string;
  detailImg2?: string;
  detailImg3?: string;
  detailImg4?: string;
  detailImg5?: string;
  detailImg6?: string;
}

enum Section {
  GENERAL,
  PHOTOS,
  CHARS,
}

export const BoatEditForm: React.FC = () => {
  const [section, setSection] = useState(Section.GENERAL);
  const { boatId } = useParams();
  const [boat, setBoat] = useState<Boat | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get<Boat>(`/api/boats/${boatId}`)
      .then((res) => setBoat(res.data))
      .catch(console.error);
  }, [boatId]);

  if (!boat) return <p>Loading boat...</p>;

  function cloneBoat() {
    setLoading(true);
    axios
      .post(`/api/boats/${boat?.id}/clone`)
      .then((response) => {
        const clon = response.data;
        navigate(`/boats/edit/${clon.id}`);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }

  function deleteBoat() {
    if (!confirm(`${boat?.tittle} will be remove permanently`)) {
      return;
    }
    setLoading(true);
    axios
      .delete(`/api/boats/${boat?.id}`)
      .then(() => {
        navigate(`/boats`);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }

  if (loading) return <p>Cloning...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <Link to="/boats">
        <ArrowUturnLeftIcon className="w-5 mb-4" />
      </Link>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">{boat.tittle}</h1>
        <div>
          <button onClick={cloneBoat} className="btn">
            Clone
          </button>
          <button onClick={deleteBoat} className="btn">
            Delete
          </button>
        </div>
      </div>

      <div role="tablist" className="tabs tabs-lift">
        <a
          role="tab"
          onClick={() => setSection(Section.GENERAL)}
          className={`tab ${section === Section.GENERAL ? 'tab-active' : ''}`}
        >
          General
        </a>
        <a
          role="tab"
          onClick={() => setSection(Section.PHOTOS)}
          className={`tab ${section === Section.PHOTOS ? 'tab-active' : ''}`}
        >
          Fotos
        </a>
        <a
          role="tab"
          onClick={() => setSection(Section.CHARS)}
          className={`tab ${section === Section.CHARS ? 'tab-active' : ''}`}
        >
          Características
        </a>
      </div>
      {section === Section.GENERAL && (
        <BoatGeneralSection boat={boat} setBoat={setBoat} />
      )}
      {section === Section.PHOTOS && (
        <BoatPhotosSection boat={boat} setBoat={setBoat} />
      )}
      {section === Section.CHARS && (
        <BoatCharsSection boat={boat} setBoat={setBoat} />
      )}
    </div>
  );
};
