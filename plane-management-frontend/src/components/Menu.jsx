import { motion } from 'framer-motion';

function Menu({ setActiveSection }) {
  const options = [
    { id: 1, label: 'Buy a Seat', section: 'buy' },
    { id: 2, label: 'Cancel a Seat', section: 'cancel' },
    { id: 3, label: 'Find First Available Seat', section: 'find' },
    { id: 4, label: 'Show Seating Plan', section: 'seating' },
    { id: 5, label: 'Print Tickets Info', section: 'tickets' },
    { id: 6, label: 'Search Ticket', section: 'search' },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-3">
      {options.map(option => (
        <motion.button
          key={option.id}
          onClick={() => setActiveSection(option.section)}
          whileHover={{ scale: 1.05, boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}
          whileTap={{ scale: 0.95 }}
          className="p-4 text-white transition-all duration-300 rounded-lg shadow-md bg-secondary hover:bg-accent dark:hover:bg-accent"
        >
          {option.label}
        </motion.button>
      ))}
    </div>
  );
}

export default Menu;