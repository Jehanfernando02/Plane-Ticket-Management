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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {options.map(option => (
          <button
            key={option.id}
            onClick={() => setActiveSection(option.section)}
            className="bg-secondary text-white p-4 rounded-lg hover:bg-accent transition"
          >
            {option.label}
          </button>
        ))}
      </div>
    );
  }
  
  export default Menu;