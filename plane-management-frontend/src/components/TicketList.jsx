
import { useEffect, useState } from 'react';
import { getTickets } from '../utils/api';

function TicketList() {
  const [tickets, setTickets] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const data = await getTickets();
        setTickets(data);
        setTotalPrice(data.reduce((sum, ticket) => sum + ticket.price, 0));
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };
    fetchTickets();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 dark:text-white">Tickets Information</h2>
      {tickets.length === 0 ? (
        <p className="dark:text-white">No tickets sold.</p>
      ) : (
        <>
          {tickets.map((ticket, index) => (
            <div key={index} className="border-b py-2 dark:border-gray-700">
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