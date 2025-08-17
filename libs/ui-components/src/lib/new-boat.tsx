import React, { useState } from 'react';
import { ArrowUturnLeftIcon } from '@heroicons/react/20/solid';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface BoatFormData {
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

export const NewBoat: React.FC = () => {
  const [form, setForm] = useState<BoatFormData>({
    tittle: '',
    value: '',
    duracion: '',
    personas: '',
    bedrooms: '',
    largo: '',
    info: '',
    marca: '',
    materialCasco: '',
    año: '',
    modeloMotor: '',
    Horas: '',
    Carga: '',
    pasajeros: '',
    tipoDeCombustible: '',
    horasDeUso: '',
    descripcion: '',
    caracteristicas: [''],
  });
  const [imagen, setImagen] = useState<File | null>(null);
  const [detailImages, setDetailImages] = useState<File[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFeatureChange = (index: number, value: string) => {
    const updated = [...form.caracteristicas];
    updated[index] = value;
    setForm({ ...form, caracteristicas: updated });
  };

  const addFeature = () =>
    setForm({ ...form, caracteristicas: [...form.caracteristicas, ''] });
  const removeFeature = (index: number) => {
    const updated = form.caracteristicas.filter((_, i) => i !== index);
    setForm({ ...form, caracteristicas: updated });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key === 'caracteristicas') {
        data.append(key, JSON.stringify(value));
      } else {
        data.append(key, value as string);
      }
    });
    if (imagen) data.append('imagen', imagen);
    detailImages.forEach((img) => data.append('detailImages', img));

    await axios.post('http://localhost:4000/api/boats', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    alert('Boat created!');
  };

  return (
    <div>
      <Link to="/boats">
        <ArrowUturnLeftIcon className="w-5 mb-4" />
      </Link>
      <h1 className="text-2xl font-bold mb-4">New Boat</h1>
      <form className="max-w-2xl space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="tittle"
          placeholder="Title"
          className="input input-bordered w-full"
          value={form.tittle}
          onChange={handleChange}
        />
        <input
          type="text"
          name="value"
          placeholder="Value"
          className="input input-bordered w-full"
          value={form.value}
          onChange={handleChange}
        />
        <input
          type="text"
          name="duracion"
          placeholder="Duration"
          className="input input-bordered w-full"
          value={form.duracion}
          onChange={handleChange}
        />
        <input
          type="text"
          name="personas"
          placeholder="Guests"
          className="input input-bordered w-full"
          value={form.personas}
          onChange={handleChange}
        />
        <input
          type="text"
          name="bedrooms"
          placeholder="Bedrooms"
          className="input input-bordered w-full"
          value={form.bedrooms}
          onChange={handleChange}
        />
        <input
          type="text"
          name="largo"
          placeholder="Length"
          className="input input-bordered w-full"
          value={form.largo}
          onChange={handleChange}
        />
        <input
          type="text"
          name="info"
          placeholder="Info"
          className="input input-bordered w-full"
          value={form.info}
          onChange={handleChange}
        />
        <input
          type="text"
          name="marca"
          placeholder="Marca"
          className="input input-bordered w-full"
          value={form.marca}
          onChange={handleChange}
        />
        <input
          type="text"
          name="materialCasco"
          placeholder="Material del casco"
          className="input input-bordered w-full"
          value={form.materialCasco}
          onChange={handleChange}
        />
        <input
          type="text"
          name="año"
          placeholder="Año"
          className="input input-bordered w-full"
          value={form.año}
          onChange={handleChange}
        />
        <input
          type="text"
          name="modeloMotor"
          placeholder="Modelo Motor"
          className="input input-bordered w-full"
          value={form.modeloMotor}
          onChange={handleChange}
        />
        <input
          type="text"
          name="Horas"
          placeholder="Horas"
          className="input input-bordered w-full"
          value={form.Horas}
          onChange={handleChange}
        />
        <input
          type="text"
          name="Carga"
          placeholder="Carga"
          className="input input-bordered w-full"
          value={form.Carga}
          onChange={handleChange}
        />
        <input
          type="text"
          name="pasajeros"
          placeholder="Pasajeros"
          className="input input-bordered w-full"
          value={form.pasajeros}
          onChange={handleChange}
        />
        <input
          type="text"
          name="tipoDeCombustible"
          placeholder="Combustible"
          className="input input-bordered w-full"
          value={form.tipoDeCombustible}
          onChange={handleChange}
        />
        <input
          type="text"
          name="horasDeUso"
          placeholder="Horas de uso"
          className="input input-bordered w-full"
          value={form.horasDeUso}
          onChange={handleChange}
        />
        <textarea
          name="descripcion"
          placeholder="Descripción"
          className="textarea textarea-bordered w-full"
          value={form.descripcion}
          onChange={handleChange}
        ></textarea>
        {/* Dynamic features */}
        <div>
          <label className="block font-semibold mb-2">Características</label>
          {form.caracteristicas.map((feature, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input
                type="text"
                value={feature}
                onChange={(e) => handleFeatureChange(i, e.target.value)}
                className="input input-bordered flex-1"
                placeholder={`Característica ${i + 1}`}
              />
              <button
                type="button"
                className="btn btn-error"
                onClick={() => removeFeature(i)}
              >
                X
              </button>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-secondary"
            onClick={addFeature}
          >
            Add Feature
          </button>
        </div>
        {/* File uploads */}
        <input
          type="file"
          onChange={(e) => setImagen(e.target.files?.[0] || null)}
        />
        <input
          type="file"
          multiple
          onChange={(e) => setDetailImages(Array.from(e.target.files || []))}
        />
        <button type="submit" className="btn btn-primary w-full">
          Create Boat
        </button>
      </form>
    </div>
  );
};
