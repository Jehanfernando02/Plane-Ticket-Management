import { useEffect, useState } from 'react';
import { getSeats } from '../utils/api';

function SeatMap() {
  const [seats, setSeats] = useState([]);
  const rows = ['A', 'B', 'C', 'D'];

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const data = await getSeats();
        setSeats(data);
      } catch (error) {
        console.error('Error fetching seats:', error);
      }
    };
    fetchSeats();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">Seating Plan</h2>
      <div className="flex justify-center space-x-6 mb-6">
        <div className="flex items-center">
          <span className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-sm mr-2">O</span>
          <span className="text-sm font-medium dark:text-white">Available</span>
        </div>
        <div className="flex items-center">
          <span className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white text-sm mr-2">X</span>
          <span className="text-sm font-medium dark:text-white">Booked</span>
        </div>
      </div>
      <div className="flex justify-center">
        <div>
          <div className="flex">
            <div className="w-10 flex-shrink-0"></div>
            {Array(14)
              .fill()
              .map((_, index) => (
                <div
                  key={index}
                  className="w-9 h-9 flex items-center justify-center text-sm font-semibold dark:text-white"
                >
                  {index + 1}
                </div>
              ))}
          </div>
          {seats.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={`flex items-center ${rowIndex === 1 || rowIndex === 2 ? 'pl-4' : ''}`}
            >
              <div className="w-10 h-9 flex items-center justify-end pr-2 text-lg font-bold dark:text-white">
                {rows[rowIndex]}
              </div>
              {row.map((seat, seatIndex) => (
                <div
                  key={seatIndex}
                  className={`w-9 h-9 m-0.5 rounded-full flex items-center justify-center
                    ${seat === 0 ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'} 
                    text-white text-xs font-medium cursor-pointer transition shadow-sm`}
                  title={`Row ${rows[rowIndex]}, Seat ${seatIndex + 1}: ${seat === 0 ? 'Available' : 'Booked'}`}
                >
                  {seat === 0 ? 'O' : 'X'}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SeatMap;
