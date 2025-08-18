import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Boat {
  id: string;
  imagen: string;
  detailImg1?: string;
  detailImg2?: string;
  detailImg3?: string;
  detailImg4?: string;
  detailImg5?: string;
  detailImg6?: string;
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
}

const BoatsGrid: React.FC<{ boats: Array<Boat> }> = ({ boats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {boats.map((boat) => (
        <div className="card card-compact bg-base-100 shadow-xl">
          <Link to={`/boats/edit/${boat.id}`} key={boat.id}>
            <figure>
              <img
                src={`/api/boats/${boat.id}/main-image`}
                alt={boat.tittle}
                className="h-48 w-full object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{boat.tittle}</h2>
              <p className="text-sm text-gray-500">
                {boat.marca} - {boat.año}
              </p>
              <p className="font-semibold">
                {boat.value} / {boat.duracion}
              </p>
              <p>
                {boat.personas} guests | {boat.bedrooms} bedrooms | {boat.largo}
              </p>
              <p className="text-sm mt-2">{boat.descripcion}</p>
              {boat.caracteristicas.length > 0 && (
                <ul className="list-disc list-inside mt-2 text-sm">
                  {boat.caracteristicas.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              )}
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BoatsGrid;
