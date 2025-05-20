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
    <div className="max-w-4xl p-6 mx-auto bg-white shadow-2xl dark:bg-gray-800 rounded-2xl">
      <h2 className="mb-6 text-2xl font-bold text-center lg:text-3xl dark:text-white">
        Plane Seating Plan
      </h2>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <div className="flex items-center">
          <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-[10px] sm:text-xs mr-2 shadow-md">
            O
          </span>
          <span className="text-sm font-medium dark:text-white">Available</span>
        </div>
        <div className="flex items-center">
          <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-red-500 flex items-center justify-center text-white text-[10px] sm:text-xs mr-2 shadow-md">
            X
          </span>
          <span className="text-sm font-medium dark:text-white">Booked</span>
        </div>
      </div>

      {/* Seat Grid */}
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          {/* Seat Numbers Header */}
          <div className="flex mb-2">
            <div className="flex-shrink-0 w-8 sm:w-10"></div>
            {Array(14)
              .fill()
              .map((_, index) => (
                <div
                  key={index}
                  className="w-5 h-5 sm:w-8 sm:h-8 flex items-center justify-center text-[10px] sm:text-sm font-semibold dark:text-white"
                >
                  {index + 1}
                </div>
              ))}
          </div>

          {/* Seat Rows */}
          {seats.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={`flex items-center mb-1 ${rowIndex === 1 || rowIndex === 2 ? 'pl-2 sm:pl-4' : ''}`}
            >
              {/* Row Label */}
              <div className="flex items-center justify-end w-8 h-5 pr-2 text-sm font-bold sm:w-10 sm:h-8 sm:text-base dark:text-white">
                {rows[rowIndex]}
              </div>

              {/* Seats */}
              {row.map((seat, seatIndex) => (
                <div
                  key={seatIndex}
                  className={`w-5 h-5 sm:w-8 sm:h-8 m-0.5 rounded-full flex items-center justify-center
                    ${seat === 0 ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'} 
                    text-white text-[10px] sm:text-xs font-medium cursor-pointer transition duration-200 ease-in-out transform hover:scale-105 shadow-md`}
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
