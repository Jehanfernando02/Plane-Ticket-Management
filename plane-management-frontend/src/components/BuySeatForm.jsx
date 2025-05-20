import { useState } from 'react';
import { bookSeat } from '../utils/api';

function BuySeatForm() {
  const [formData, setFormData] = useState({
    row: '',
    seat: '',
    name: '',
    surname: '',
    email: '',
  });
  const [errors, setErrors] = useState({
    row: '',
    seat: '',
    email: '',
  });
  const [submitMessage, setSubmitMessage] = useState('');

  const validateRow = (row) => {
    if (!row) return 'Row is required.';
    if (!/^[A-D]$/i.test(row)) return 'Row must be A, B, C, or D.';
    return '';
  };

  const validateSeat = (seat) => {
    if (!seat) return 'Seat number is required.';
    const seatNum = parseInt(seat);
    if (isNaN(seatNum) || seatNum < 1) return 'Seat number must be a positive integer.';
    const maxSeats = formData.row.toUpperCase() === 'A' || formData.row.toUpperCase() === 'D' ? 14 : 12;
    if (seatNum > maxSeats) return `Seat number must be between 1 and ${maxSeats}.`;
    return '';
  };

  const validateEmail = (email) => {
    if (!email) return 'Email is required.';
    if (!email.includes('@') || !email.includes('.')) return 'Invalid email address.';
    return '';
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (field === 'row') {
      setErrors({
        ...errors,
        row: validateRow(value),
        seat: formData.seat ? validateSeat(formData.seat) : errors.seat,
      });
    } else if (field === 'seat') {
      setErrors({ ...errors, seat: validateSeat(value) });
    } else if (field === 'email') {
      setErrors({ ...errors, email: validateEmail(value) });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const rowError = validateRow(formData.row);
    const seatError = validateSeat(formData.seat);
    const emailError = validateEmail(formData.email);

    if (rowError || seatError || emailError || !formData.name || !formData.surname) {
      setErrors({
        row: rowError,
        seat: seatError,
        email: emailError,
        name: !formData.name ? 'Name is required.' : '',
        surname: !formData.surname ? 'Surname is required.' : '',
      });
      setSubmitMessage('Please fix the errors above.');
      return;
    }

    try {
      const response = await bookSeat(formData.row, parseInt(formData.seat), {
        name: formData.name,
        surname: formData.surname,
        email: formData.email,
      });
      setSubmitMessage(response);
      setFormData({ row: '', seat: '', name: '', surname: '', email: '' });
      setErrors({ row: '', seat: '', email: '', name: '', surname: '' });
    } catch (error) {
      setSubmitMessage(error.message);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 dark:text-white">Buy a Seat</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block dark:text-white">Row (A-D):</label>
          <input
            type="text"
            value={formData.row}
            onChange={(e) => handleChange('row', e.target.value.toUpperCase())}
            className={`w-full p-2 border rounded dark:bg-gray-700 dark:text-white ${errors.row ? 'border-red-500' : ''}`}
            maxLength="1"
            required
          />
          {errors.row && <p className="text-red-500 text-sm mt-1">{errors.row}</p>}
        </div>
        <div>
          <label className="block dark:text-white">Seat Number:</label>
          <input
            type="number"
            value={formData.seat}
            onChange={(e) => handleChange('seat', e.target.value)}
            className={`w-full p-2 border rounded dark:bg-gray-700 dark:text-white ${errors.seat ? 'border-red-500' : ''}`}
            min="1"
            required
          />
          {errors.seat && <p className="text-red-500 text-sm mt-1">{errors.seat}</p>}
        </div>
        <div>
          <label className="block dark:text-white">Name:</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className={`w-full p-2 border rounded dark:bg-gray-700 dark:text-white ${errors.name ? 'border-red-500' : ''}`}
            required
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>
        <div>
          <label className="block dark:text-white">Surname:</label>
          <input
            type="text"
            value={formData.surname}
            onChange={(e) => handleChange('surname', e.target.value)}
            className={`w-full p-2 border rounded dark:bg-gray-700 dark:text-white ${errors.surname ? 'border-red-500' : ''}`}
            required
          />
          {errors.surname && <p className="text-red-500 text-sm mt-1">{errors.surname}</p>}
        </div>
        <div>
          <label className="block dark:text-white">Email:</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className={`w-full p-2 border rounded dark:bg-gray-700 dark:text-white ${errors.email ? 'border-red-500' : ''}`}
            required
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        <button
          type="submit"
          className="bg-secondary text-white p-2 rounded hover:bg-accent transition disabled:bg-gray-400"
          disabled={errors.row || errors.seat || errors.email || !formData.name || !formData.surname}
        >
          Buy Seat
        </button>
      </form>
      {submitMessage && <p className="mt-4 text-red-500 dark:text-red-400">{submitMessage}</p>}
    </div>
  );
}

export default BuySeatForm;
