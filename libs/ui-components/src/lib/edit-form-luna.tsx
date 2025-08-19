import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAxios } from './useAxios';

import { BoatAPI } from '@nautica/api';

export const EditBoatFormLuna: React.FC = () => {
  const axios = useAxios();
  const { boatId } = useParams();
  const [boat, setBoat] = useState<BoatAPI | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    axios
      .get<BoatAPI>(`/api/boats/${boatId}`)
      .then((res) => {
        setBoat(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [boatId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!boat) return;
    const { name, value } = e.target;
    setBoat({ ...boat, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!boat) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/boats/${boatId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(boat),
      });
      if (!res.ok) throw new Error('Failed to save boat');
      alert('Boat updated successfully!');
    } catch (err) {
      console.error('Error saving boat:', err);
      alert('Failed to update boat.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading boat...</div>;
  if (error) return <div>{error}</div>;
  if (!boat) return <div>Boat not found.</div>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Boat</h2>

      {Object.keys(boat).map(
        (key) =>
          key !== 'id' && (
            <div className="form-control" key={key}>
              <label className="label">
                <span className="label-text">{key}</span>
              </label>
              {key === 'descripcion' ? (
                <textarea
                  name={key}
                  value={(boat as any)[key] || ''}
                  onChange={handleChange}
                  className="textarea textarea-bordered w-full"
                />
              ) : (
                <input
                  type="text"
                  name={key}
                  value={(boat as any)[key] || ''}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              )}
            </div>
          )
      )}

      <button
        type="submit"
        disabled={saving}
        className="btn btn-primary w-full"
      >
        {saving ? 'Saving...' : 'Save Changes'}
      </button>
    </form>
  );
};
