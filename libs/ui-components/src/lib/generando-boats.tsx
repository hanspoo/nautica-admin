import { ExclamationTriangleIcon } from '@heroicons/react/20/solid';
import { useState, useEffect } from 'react';
import { useAxios } from './useAxios';

export function GenerandoBoats() {
  const axios = useAxios();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [data, setData] = useState<string>();

  useEffect(() => {
    setLoading(true);
    axios
      .post(`/api/boats/sync`)
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
      <div role="alert" className="alert alert-success">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>Se ha actualizado el archivo!</span>
      </div>
    </div>
  );
}
