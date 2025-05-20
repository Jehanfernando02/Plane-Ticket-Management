
import { useState } from 'react';
import Menu from '../components/Menu.jsx';
import SeatMap from '../components/SeatMap.jsx';
import BuySeatForm from '../components/BuySeatForm.jsx';
import CancelSeatForm from '../components/CancelSeatForm.jsx';
import TicketList from '../components/TicketList.jsx';
import SearchTicketForm from '../components/SearchTicketForm.jsx';
import { findFirstAvailable } from '../utils/api';

function Home() {
  const [activeSection, setActiveSection] = useState('seating');

  const handleFindFirst = async () => {
    try {
      const response = await findFirstAvailable();
      alert(response);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-center dark:text-white">Welcome to Plane Management</h2>
      <Menu setActiveSection={setActiveSection} />
      {activeSection === 'seating' && <SeatMap />}
      {activeSection === 'buy' && <BuySeatForm />}
      {activeSection === 'cancel' && <CancelSeatForm />}
      {activeSection === 'find' && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4 dark:text-white">Find First Available Seat</h2>
          <button
            onClick={handleFindFirst}
            className="bg-secondary text-white p-2 rounded hover:bg-accent transition"
          >
            Find First Available Seat
          </button>
        </div>
      )}
      {activeSection === 'tickets' && <TicketList />}
      {activeSection === 'search' && <SearchTicketForm />}
    </div>
  );
}

export default Home;
