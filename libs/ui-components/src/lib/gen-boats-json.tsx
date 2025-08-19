import { useState } from 'react';
import { GenerandoBoats } from './generando-boats';

export function GenBoatsJson() {
  const [generando, setGenerando] = useState(false);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Actualizar boats.json</h1>

      <div className="mb-6">
        <p className="mb-2">
          Con la información de la base de datos se actualizará el archivo:
        </p>
        <div className="mb-4">
          <b>{import.meta.env.VITE_NAUTICA_SITE + '/src/data/boats.json'}</b>
        </div>
      </div>
      {generando ? (
        <GenerandoBoats />
      ) : (
        <button onClick={() => setGenerando(true)} className="btn btn-primary">
          Generar
        </button>
      )}
    </div>
  );
}
