import { useState } from 'react';
import { GenerandoBoats } from './generando-boats';

export function GenBoatsJson() {
  const [generando, setGenerando] = useState(false);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Generar boats.json</h1>

      <p className="mb-4">
        El JSON generado debe ser colocado como boats.json en el proyecto
        NauticaCalderon en "src/data/boats.json".
      </p>
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
