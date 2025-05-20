import { useState } from 'react';
import { motion } from 'framer-motion';
import Menu from '../components/Menu.jsx';
import SeatMap from '../components/SeatMap.jsx';
import BuySeatForm from '../components/BuySeatForm.jsx';
import CancelSeatForm from '../components/CancelSeatForm.jsx';
import TicketList from '../components/TicketList.jsx';
import SearchTicketForm from '../components/SearchTicketForm.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import { findFirstAvailable } from '../utils/api';

function Home() {
  const [activeSection, setActiveSection] = useState('seating');
  const [loading, setLoading] = useState(false);

  const handleFindFirst = async () => {
    try {
      setLoading(true);
      const response = await findFirstAvailable();
      alert(response);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <LoadingSpinner />}
      <div className="min-h-screen p-6 bg-gradient-to-b from-blue-100 to-gray-100 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto">
          {/* Introductory Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="p-8 mb-10 bg-white border border-transparent shadow-2xl dark:bg-gray-800 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-700/10 dark:to-purple-700/10"
          >
            <div className="flex items-center justify-center mb-4">
              <svg className="w-10 h-10 mr-3 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h2 className="text-3xl font-bold text-center dark:text-white">
                Plane Management System
              </h2>
            </div>
            <p className="mb-6 text-lg text-center text-gray-600 dark:text-gray-300">
              Seamlessly manage seat reservations for a private plane with 4 rows (A-D) and up to 14 seats per row.<br />
              Book, cancel, or explore seats with ease.
            </p>
            <h3 className="mb-4 text-xl font-semibold text-center dark:text-white">Get Started:</h3>
            <ul className="max-w-2xl mx-auto space-y-3 text-gray-600 list-disc list-inside dark:text-gray-300">
              <li><strong>Book a Seat</strong>: Choose a row and seat, then enter passenger details to reserve your spot.</li>
              <li><strong>Cancel a Seat</strong>: Free up a booked seat by specifying its row and number.</li>
              <li><strong>Find First Available</strong>: Instantly locate the next available seat, starting from row A.</li>
              <li><strong>View Seating Plan</strong>: See real-time seat availability (O for free, X for booked).</li>
              <li><strong>Check Tickets</strong>: Review all sold tickets and total sales.</li>
              <li><strong>Search Tickets</strong>: Find details of a specific seat’s booking.</li>
            </ul>
          </motion.div>

          {/* Menu */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-10"
          >
            <Menu setActiveSection={setActiveSection} />
          </motion.div>

          {/* Active Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {activeSection === 'seating' && (
              <>
                <SeatMap />
                {/* Pricing Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="p-4 mt-6 bg-white rounded-lg shadow-lg dark:bg-gray-800"
                >
                  <h3 className="mb-4 text-lg font-semibold text-center dark:text-white">Seat Pricing</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="p-4 text-center rounded-md bg-gradient-to-br from-green-100 to-green-200 dark:from-green-700 dark:to-green-800"
                    >
                      <svg className="w-6 h-6 mx-auto mb-1 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 16v-4m16-12v4m0 12v4M8 12h8m-4-8v16" />
                      </svg>
                      <p className="text-sm font-medium dark:text-white">Seats 1-5</p>
                      <p className="text-lg font-bold text-green-600 dark:text-green-400">£200</p>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="p-4 text-center rounded-md bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-700 dark:to-blue-800"
                    >
                      <svg className="w-6 h-6 mx-auto mb-1 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                      <p className="text-sm font-medium dark:text-white">Seats 6-9</p>
                      <p className="text-lg font-bold text-blue-600 dark:text-blue-400">£150</p>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="p-4 text-center rounded-md bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-700 dark:to-purple-800"
                    >
                      <svg className="w-6 h-6 mx-auto mb-1 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      <p className="text-sm font-medium dark:text-white">Seats 10+</p>
                      <p className="text-lg font-bold text-purple-600 dark:text-purple-400">£180</p>
                    </motion.div>
                  </div>
                  <p className="mt-4 text-xs text-center text-gray-600 dark:text-gray-400">
                    Pricing applies to all rows (A, B, C, D). Rows A and D have 14 seats, while B and C have 12 seats.
                  </p>
                </motion.div>
              </>
            )}
            {activeSection === 'buy' && <BuySeatForm />}
            {activeSection === 'cancel' && <CancelSeatForm />}
            {activeSection === 'find' && (
              <div className="p-8 bg-white shadow-2xl dark:bg-gray-800 rounded-xl">
                <h2 className="mb-4 text-xl font-bold text-center dark:text-white">Find First Available Seat</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleFindFirst}
                  className="block w-full max-w-xs p-3 mx-auto text-white transition rounded-lg bg-secondary hover:bg-accent disabled:bg-gray-400"
                  disabled={loading}
                >
                  Find First Available Seat
                </motion.button>
              </div>
            )}
            {activeSection === 'tickets' && <TicketList />}
            {activeSection === 'search' && <SearchTicketForm />}
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default Home;