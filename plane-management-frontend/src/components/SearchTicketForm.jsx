import { useState } from 'react';
import { searchTicket } from '../utils/api';
import LoadingSpinner from './LoadingSpinner.jsx';

function SearchTicketForm() {
  const [formData, setFormData] = useState({ row: '', seat: '' });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await searchTicket(formData.row, parseInt(formData.seat));
      setResult(response);
    } catch (error) {
      setResult(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <LoadingSpinner />}
      <div className="p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <h2 className="mb-4 text-xl font-bold dark:text-white">Search Ticket</h2>
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
            Search Ticket
          </button>
        </form>
        {result && (
          <div className="mt-4 dark:text-white">
            <p>{result}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default SearchTicketForm;