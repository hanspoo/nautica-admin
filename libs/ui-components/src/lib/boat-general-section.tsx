import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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

export const BoatGeneralSection: React.FC<{
  boat: Boat;
  setBoat: (boat: Boat) => void;
}> = ({ boat, setBoat }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!boat) return;
    setBoat({ ...boat, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!boat) return;
    setLoading(true);

    const data = new FormData();
    Object.entries(boat).forEach(([key, value]) => {
      if (key === 'caracteristicas') data.append(key, JSON.stringify(value));
      else if (typeof value !== 'undefined') data.append(key, value as string);
    });

    await axios.put(`http://localhost:4000/api/boats/${boat.id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    alert('Boat updated!');
  };

  if (!boat) return <p>Loading...</p>;

  if (loading) return <p>Cloning...</p>;
  if (error) return <p>{error}</p>;

  return (
    <form className="p-4 space-y-4" onSubmit={handleSubmit}>
      {Object.keys(boat).map((key) => {
        if (
          [
            'id',
            'imagen',
            'detailImg1',
            'detailImg2',
            'detailImg3',
            'detailImg4',
            'detailImg5',
            'detailImg6',
            'caracteristicas',
          ].includes(key)
        )
          return null;
        return (
          <fieldset className="fieldset">
            <legend className="fieldset-legend">{key}</legend>
            {key === 'descripcion' ? (
              <textarea
                key={key}
                rows={6}
                name={key}
                value={(boat as any)[key]}
                onChange={handleChange}
                placeholder={key}
                className="textarea textarea-bordered w-full"
              />
            ) : (
              <input
                key={key}
                type="text"
                name={key}
                value={(boat as any)[key]}
                onChange={handleChange}
                placeholder={key}
                className="input input-bordered w-full"
              />
            )}
          </fieldset>
        );
      })}
      <button type="submit" className="btn btn-primary w-full">
        Update Boat
      </button>
    </form>
  );
};
