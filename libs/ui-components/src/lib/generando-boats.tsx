import { ExclamationTriangleIcon } from '@heroicons/react/20/solid';
import axios from 'axios';
import { useState, useEffect } from 'react';

export function GenerandoBoats() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [data, setData] = useState<string>();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/boats`)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <span className="spin" />;
  if (error)
    return (
      <div role="alert" className="alert alert-error">
        <ExclamationTriangleIcon className="w-5" />
        <span>{error}.</span>
      </div>
    );

  if (!data) return <p>Error interno</p>;

  return (
    <div>
      <textarea rows={20} className="textarea w-full mb-6">
        {JSON.stringify(data)}
      </textarea>

      <p className="mb-2">
        Las imágenes están en: <b>{import.meta.env.VITE_IMAGES_DIR}</b>
      </p>
      <p className="mb-2">
        El contenido de esta carpeta debe ser copiado a la carpeta{' '}
        <b>public/Imgs/botes</b> del proyecto de Náutica Calderon.
      </p>
      <p className="mb-2">Ejemplo</p>
      <b className="mb-2">
        cp {import.meta.env.VITE_IMAGES_DIR}/*
        /home/julian/lucas/NauticaCalderon/public/Imgs/botes
      </b>
    </div>
  );
}
