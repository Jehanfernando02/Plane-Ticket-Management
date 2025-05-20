
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
      <h2 className="mb-6 text-3xl font-bold text-center dark:text-white">Welcome to Plane Management</h2>
      <Menu setActiveSection={setActiveSection} />
      {activeSection === 'seating' && <SeatMap />}
      {activeSection === 'buy' && <BuySeatForm />}
      {activeSection === 'cancel' && <CancelSeatForm />}
      {activeSection === 'find' && (
        <div className="p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
          <h2 className="mb-4 text-xl font-bold dark:text-white">Find First Available Seat</h2>
          <button
            onClick={handleFindFirst}
            className="p-2 text-white transition rounded bg-secondary hover:bg-accent"
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
