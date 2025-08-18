import axios from 'axios';
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

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [randomData, setRandomData] = useState(new Date().getTime());

  if (loading)
    return <span className="m-4 loading loading-spinner loading-sm"></span>;
  if (error) return <p>{error}</p>;

  const updateMainImage = (file?: File) => {
    if (!file) {
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append('image', file);

    axios
      .post<Boat>(`/api/boats/${boat.id}/main-image`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((response) => {
        // setBoat(response.data);
        setRandomData(new Date().getTime());
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const uploadDetailImages = (n: number, file?: File) => {
    if (!file) {
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append('image', file);

    axios
      .post<Boat>(`/api/boats/${boat.id}/detail-image/${n}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((response) => {
        // setBoat(response.data);
        setRandomData(new Date().getTime());
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  if (loading) return <p>wait...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div className="mb-4">
        <div className="font-bold mb-2">Main Image</div>
        <figure>
          <img
            src={`/api/boats/${boat.id}/main-image?random=${randomData}`}
            alt={boat.tittle}
            className="md:max-w-64 object-cover"
          />
        </figure>

        <input
          type="file"
          className="my-2 bg-base-300 p-2 text-sm cursor-pointer"
          onChange={(e) => updateMainImage(e.target.files?.[0])}
        />
      </div>
      <div className="grid md:grid-cols-4 gap-2">
        {[1, 2, 3, 4, 5, 6].map((n) => {
          return (
            <div className="mb-4" key={n}>
              <div className="font-bold mb-2">Detail Image {n}</div>
              <figure>
                <img
                  src={`/api/boats/${boat.id}/detail-image/${n}?random=${randomData}`}
                  alt={boat.tittle}
                  className="md:max-w-64 object-cover"
                />
              </figure>

              <input
                type="file"
                className="my-2 bg-base-300 p-2 text-sm cursor-pointer"
                onChange={(e) => uploadDetailImages(n, e.target.files?.[0])}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
