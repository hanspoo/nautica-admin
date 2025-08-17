import React, { useState, useEffect } from 'react';

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

export const BoatPhotosSection: React.FC<{
  boat: Boat;
  setBoat: (boat: Boat) => void;
}> = ({ boat, setBoat }) => {
  const [imagen, setImagen] = useState<File | null>(null);
  const [detailImages, setDetailImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (loading) return <p>Cloning...</p>;
  if (error) return <p>{error}</p>;

  return (
    <form>
      <div>
        <label>Main Image</label>
        <input
          type="file"
          onChange={(e) => setImagen(e.target.files?.[0] || null)}
        />
      </div>
      <div>
        <label>Detail Images</label>
        <input
          type="file"
          multiple
          onChange={(e) => setDetailImages(Array.from(e.target.files || []))}
        />
      </div>
      <button type="submit" className="btn btn-primary w-full">
        Update Boat
      </button>
    </form>
  );
};
