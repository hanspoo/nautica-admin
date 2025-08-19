import React from 'react';
import { Link } from 'react-router-dom';
import { BoatAPI } from '@nautica/api';

const BoatsList: React.FC<{ boats: Array<BoatAPI> }> = ({ boats }) => {
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
                    src={`/api/images/${boat.id}/main-image`}
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
