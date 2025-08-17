import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  EllipsisVerticalIcon,
  HeartIcon,
  MusicalNoteIcon,
} from '@heroicons/react/20/solid';

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

const BoatsList: React.FC<{ boats: Array<Boat> }> = ({ boats }) => {
  return (
    <div className="bg-base-200 w-full ">
      <ul className="divide-y divide-base-300">
        {boats.map((boat) => (
          <li
            key={boat.id}
            className="flex items-center justify-between p-3 hover:bg-base-300 rounded-lg transition "
          >
            <Link
              to={`/boats/edit/${boat.id}`}
              key={boat.id}
              className="w-full"
            >
              <div className="flex items-center gap-4">
                <figure>
                  <img
                    src={`http://localhost:4000${boat.imagen}`}
                    alt={boat.tittle}
                    className="h-12 w-full object-cover"
                  />
                </figure>

                {/* Title + description */}
                <div>
                  <div className="font-semibold text-base">{boat.tittle}</div>
                  <div className="text-sm text-base-content/70">
                    {boat.marca} | {boat.value}
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BoatsList;
