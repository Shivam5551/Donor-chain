import React from "react";

interface Charity {
  id: number;
  name: string;
  goal: string;
  imageUrl: string;
}

const charities: Charity[] = [
  {
    id: 1,
    name: "Education for All",
    goal: "₹1,50,000",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfHbtTmlVMJiGi1dfDAUc0OZ6dIFcVllEHgQ&s",
  },
  {
    id: 2,
    name: "Food Security Initiative",
    goal: "₹2,00,000",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2r0T5MTvVEtL1KQ54bgXEsqZOc7xaTSQ_jA&s",
  },
  {
    id: 3,
    name: "Disaster Relief Fund",
    goal: "₹3,00,000",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxdcdlkaAisSwNcLpHcb1RhRWlqACFQpEtSw&s",
  },
];

export const PopularCharity: React.FC = () => {
  return (
    <div className="p-2 lg:p-6 bg-white max-w-xs sm:max-w-md text-black">
      <h2 className="text-2xl font-semibold text-center mb-6">Popular Charities</h2>
      <div className="grid grid-cols-1 gap-6">
        {charities.map((charity) => (
          <div
            key={charity.id}
            className="bg-gray-800 text-white rounded-2xl shadow-lg overflow-hidden"
          >
            <img
              src={charity.imageUrl}
              alt={charity.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h3 className="text-lg font-bold">{charity.name}</h3>
              <p className="text-gray-400 text-sm mt-1">
                Monthly Goal: <span className="text-green-400">{charity.goal}</span>
              </p>
              <div className="mt-4 grid  lg:flex gap-3">
                <button className="lg:w-1/2 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg text-sm font-semibold shadow-md transition duration-300">
                  Pledge Monthly
                </button>
                <button className="lg:w-1/2 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg text-sm font-semibold shadow-md transition duration-300">
                  Donate Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};