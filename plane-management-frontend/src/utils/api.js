const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080/api/seats';

export const getSeats = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Failed to fetch seats');
  return await response.json();
};

export const bookSeat = async (row, seat, person) => {
  const response = await fetch(`${API_URL}/book`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ row, seat, person }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to book seat');
  return data.message;
};

export const cancelSeat = async (row, seat) => {
  const response = await fetch(`${API_URL}/cancel`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ row, seat }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to cancel seat');
  return data.message;
};

export const findFirstAvailable = async () => {
  const response = await fetch(`${API_URL}/first-available`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to find first available seat');
  return data.message;
};

export const getTickets = async () => {
  const response = await fetch(`${API_URL}/tickets`);
  if (!response.ok) throw new Error('Failed to fetch tickets');
  return await response.json();
};

export const searchTicket = async (row, seat) => {
  const response = await fetch(`${API_URL}/search?row=${row}&seat=${seat}`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to search ticket');
  return data.message;
};
