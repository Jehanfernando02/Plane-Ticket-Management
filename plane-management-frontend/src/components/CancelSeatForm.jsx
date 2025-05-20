
import { useState } from 'react';
import { cancelSeat } from '../utils/api';

function CancelSeatForm() {
  const [formData, setFormData] = useState({ row: '', seat: '' });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await cancelSeat(formData.row, parseInt(formData.seat));
      setMessage(response);
      setFormData({ row: '', seat: '' });
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 dark:text-white">Cancel a Seat</h2>
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
          className="bg-secondary text-white p-2 rounded hover:bg-accent transition"
        >
          Cancel Seat
        </button>
      </form>
      {message && <p className="mt-4 text-red-500 dark:text-red-400">{message}</p>}
    </div>
  );
}

export default CancelSeatForm;