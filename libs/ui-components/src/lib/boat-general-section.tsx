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

  const onChange = (field: string, value: string) => {
    if (!boat) return;
    setBoat({ ...boat, [field]: value });
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
      <section className="card bg-base-100 shadow-md p-4 space-y-3">
        <h2 className="card-title">Basic Information</h2>
        <label className="form-control">
          <div className="label-text">Title</div>
          <input
            className="input input-bordered w-full"
            value={boat.tittle}
            onChange={(e) => onChange('tittle', e.target.value)}
          />
        </label>
        <label className="form-control">
          <div className="label-text">Value</div>
          <input
            className="input input-bordered w-full"
            value={boat.value}
            onChange={(e) => onChange('value', e.target.value)}
          />
        </label>
        <label className="form-control">
          <div className="label-text">Year</div>
          <input
            className="input input-bordered w-full"
            value={boat.año}
            onChange={(e) => onChange('año', e.target.value)}
          />
        </label>
        <label className="form-control">
          <div className="label-text">Brand</div>
          <input
            className="input input-bordered w-full"
            value={boat.marca}
            onChange={(e) => onChange('marca', e.target.value)}
          />
        </label>
      </section>

      {/* Engine Section */}
      <section className="card bg-base-100 shadow-md p-4 space-y-3">
        <h2 className="card-title">Engine</h2>
        <label className="form-control">
          <div className="label-text">Motor Model</div>
          <input
            className="input input-bordered w-full"
            value={boat.modeloMotor}
            onChange={(e) => onChange('modeloMotor', e.target.value)}
          />
        </label>
        <label className="form-control">
          <div className="label-text">Fuel Type</div>
          <input
            className="input input-bordered w-full"
            value={boat.tipoDeCombustible}
            onChange={(e) => onChange('tipoDeCombustible', e.target.value)}
          />
        </label>
        <label className="form-control">
          <div className="label-text">Engine Hours</div>
          <input
            className="input input-bordered w-full"
            value={boat.horasDeUso}
            onChange={(e) => onChange('horasDeUso', e.target.value)}
          />
        </label>
      </section>

      {/* Size & Hull */}
      <section className="card bg-base-100 shadow-md p-4 space-y-3">
        <h2 className="card-title">Size & Hull</h2>
        <label className="form-control">
          <div className="label-text">Length</div>
          <input
            className="input input-bordered w-full"
            value={boat.largo}
            onChange={(e) => onChange('largo', e.target.value)}
          />
        </label>
        <label className="form-control">
          <div className="label-text">Hull Material</div>
          <input
            className="input input-bordered w-full"
            value={boat.materialCasco}
            onChange={(e) => onChange('materialCasco', e.target.value)}
          />
        </label>
      </section>

      {/* Capacity */}
      <section className="card bg-base-100 shadow-md p-4 space-y-3">
        <h2 className="card-title">Capacity</h2>
        <label className="form-control">
          <div className="label-text">Persons</div>
          <input
            className="input input-bordered w-full"
            value={boat.personas}
            onChange={(e) => onChange('personas', e.target.value)}
          />
        </label>
        <label className="form-control">
          <div className="label-text">Passengers</div>
          <input
            className="input input-bordered w-full"
            value={boat.pasajeros}
            onChange={(e) => onChange('pasajeros', e.target.value)}
          />
        </label>
        <label className="form-control">
          <div className="label-text">Load Capacity</div>
          <input
            className="input input-bordered w-full"
            value={boat.Carga}
            onChange={(e) => onChange('Carga', e.target.value)}
          />
        </label>
      </section>

      {/* Description */}
      <section className="card bg-base-100 shadow-md p-4 space-y-3">
        <h2 className="card-title">Description & Features</h2>
        <label className="form-control">
          <div className="label-text">Description</div>
          <textarea
            className="textarea textarea-bordered w-full "
            rows={6}
            value={boat.descripcion}
            onChange={(e) => onChange('descripcion', e.target.value)}
          />
        </label>
      </section>
      <button type="submit" className="btn btn-primary w-full">
        Update Boat
      </button>
    </form>
  );
};
