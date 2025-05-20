import { useState } from 'react';
import { cancelSeat } from '../utils/api';
import LoadingSpinner from './LoadingSpinner.jsx';

function CancelSeatForm() {
  const [formData, setFormData] = useState({ row: '', seat: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await cancelSeat(formData.row, parseInt(formData.seat));
      setMessage(response);
      setFormData({ row: '', seat: '' });
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <LoadingSpinner />}
      <div className="p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <h2 className="mb-4 text-xl font-bold dark:text-white">Cancel a Seat</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block dark:text-white">Row (A-D):</label>
            <input
              type="text"
              value={formData.row}
              onChange={(e) => setFormData({ ...formData, row: e.target.value.toUpperCase() })}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
              maxLength="1"
              required
            />
          </div>
          <div>
            <label className="block dark:text-white">Seat Number:</label>
            <input
              type="number"
              value={formData.seat}
              onChange={(e) => setFormData({ ...formData, seat: e.target.value })}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
              min="1"
              required
            />
          </div>
          <button
            type="submit"
            className="p-2 text-white transition rounded bg-secondary hover:bg-accent disabled:bg-gray-400"
            disabled={loading}
          >
            Cancel Seat
          </button>
        </form>
        {message && <p className="mt-4 text-red-500 dark:text-red-400">{message}</p>}
      </div>
    </>
  );
}

export default CancelSeatForm;