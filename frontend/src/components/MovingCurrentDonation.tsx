import { useState } from "react";

const dummyDonations = [
  { id: 1, name: "Alice", amount: 50 },
  { id: 2, name: "Bob", amount: 75 },
  { id: 3, name: "Charlie", amount: 100 },
  { id: 4, name: "David", amount: 200 },
  { id: 5, name: "Eve", amount: 150 },
  { id: 6, name: "Frank", amount: 120 },
  { id: 7, name: "Grace", amount: 90 },
];

export const MovingCurrentDonation = () => {
  const [donations] = useState(dummyDonations);

  // Duplicate data for seamless scrolling
  const scrollingData = [...donations, ...donations];

  return (
    <div className="overflow-hidden  p-3 sm:p-4 shadow-md">
      <div className="flex whitespace-nowrap animate-scroll">
        {scrollingData.map((donation, index) => (
          <div
            key={index}
            className="px-4 sm:px-6 py-3 sm:py-4 mx-2 text-black text-xs sm:text-base font-semibold rounded-lg shadwo shadow-md"
          >
            <Tspan title={`${donation.name} just donated `} /><span className="text-red-500 text-lg">${donation.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Tspan component
const Tspan = ({ title }: { title: string }) => (
  <span className="text-xs sm:text-base">{title}</span>
);
