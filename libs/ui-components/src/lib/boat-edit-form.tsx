import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowUturnLeftIcon } from '@heroicons/react/20/solid';

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

export const BoatEditForm: React.FC = () => {
  const { boatId } = useParams();
  const [boat, setBoat] = useState<Boat | null>(null);
  const [imagen, setImagen] = useState<File | null>(null);
  const [detailImages, setDetailImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get<Boat>(`http://localhost:4000/api/boats/${boatId}`)
      .then((res) => setBoat(res.data))
      .catch(console.error);
  }, [boatId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!boat) return;
    setBoat({ ...boat, [e.target.name]: e.target.value });
  };

  const handleFeatureChange = (index: number, value: string) => {
    if (!boat) return;
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

    await axios.put(`http://localhost:4000/api/boats/${boatId}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    alert('Boat updated!');
  };

  if (!boat) return <p>Loading...</p>;

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
      .then((response) => {
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
              <input
                key={key}
                type="text"
                name={key}
                value={(boat as any)[key]}
                onChange={handleChange}
                placeholder={key}
                className="input input-bordered w-full"
              />
            </fieldset>
          );
        })}
        {/* Caracteristicas */}
        <div className="space-y-2">
          <label className="font-semibold">Características</label>
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
        {/* Images */}
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
    </div>
  );
};
