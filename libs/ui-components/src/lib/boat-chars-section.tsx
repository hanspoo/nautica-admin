import React, { useState } from 'react';

import { useAxios } from './useAxios';
import { BoatAPI } from '@nautica/api';

export const BoatCharsSection: React.FC<{
  boat: BoatAPI;
  setBoat: (boat: BoatAPI) => void;
}> = ({ boat, setBoat }) => {
  const axios = useAxios();
  const [imagen, setImagen] = useState<File | null>(null);
  const [detailImages, setDetailImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFeatureChange = (index: number, value: string) => {
    const updated = [...boat.caracteristicas];
    updated[index] = value;
    setBoat({ ...boat, caracteristicas: updated });
  };

  const addFeature = () => {
    if (!boat) return;
    setBoat({ ...boat, caracteristicas: [...boat.caracteristicas, ''] });
  };

  const removeFeature = (index: number) => {
    if (!boat) return;
    setBoat({
      ...boat,
      caracteristicas: boat.caracteristicas.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!boat) return;

    const data = new FormData();
    Object.entries(boat).forEach(([key, value]) => {
      if (key === 'caracteristicas') data.append(key, JSON.stringify(value));
      else if (typeof value !== 'undefined') data.append(key, value as string);
    });

    if (imagen) data.append('imagen', imagen);
    detailImages.forEach((img) => data.append('detailImages', img));

    await axios.put(`/api/boats/${boat.id}`, data, {
      headers: { 'Content-Type': 'muBoatCharsSectionltipart/form-data' },
    });

    alert('Boat updated!');
  };

  if (!boat) return <p>Loading...</p>;

  if (loading) return <p>Cloning...</p>;
  if (error) return <p>{error}</p>;

  return (
    <form className="p-4 space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-2 mb-6">
        {boat.caracteristicas.map((c, i) => (
          <div key={i} className="flex space-x-2">
            <input
              type="text"
              value={c}
              onChange={(e) => handleFeatureChange(i, e.target.value)}
              className="input input-bordered flex-grow"
              placeholder={`Característica ${i + 1}`}
            />
            <button
              type="button"
              className="btn btn-error"
              onClick={() => removeFeature(i)}
            >
              x
            </button>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-secondary"
          onClick={addFeature}
        >
          + Add
        </button>
      </div>

      <button type="submit" className="btn btn-primary w-full">
        Update Boat
      </button>
    </form>
  );
};
