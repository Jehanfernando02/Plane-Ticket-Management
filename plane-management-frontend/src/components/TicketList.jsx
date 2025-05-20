import { useEffect, useState } from 'react';
import { getTickets } from '../utils/api';
import LoadingSpinner from './LoadingSpinner.jsx';

function TicketList() {
  const [tickets, setTickets] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);
        const data = await getTickets();
        setTickets(data);
        setTotalPrice(data.reduce((sum, ticket) => sum + ticket.price, 0));
      } catch (error) {
        console.error('Error fetching tickets:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
      <h2 className="mb-4 text-xl font-bold dark:text-white">Tickets Information</h2>
      {tickets.length === 0 ? (
        <p className="dark:text-white">No tickets sold.</p>
      ) : (
        <>
          {tickets.map((ticket, index) => (
            <div key={index} className="py-2 border-b dark:border-gray-700">
              <p className="dark:text-white">Row: {ticket.row}</p>
              <p className="dark:text-white">Seat: {ticket.seat + 1}</p>
              <p className="dark:text-white">Price: £{ticket.price}</p>
              <p className="dark:text-white">Name: {ticket.person.name}</p>
              <p className="dark:text-white">Surname: {ticket.person.surname}</p>
              <p className="dark:text-white">Email: {ticket.person.email}</p>
            </div>
          ))}
          <p className="mt-4 font-bold dark:text-white">Total Price: £{totalPrice}</p>
        </>
      )}
    </div>
  );
}

export default TicketList;