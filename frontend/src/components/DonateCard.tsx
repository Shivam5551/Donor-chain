import React from "react";
import { useNavigate } from "react-router-dom";

interface DonationCardProps {
  title: string;
  mission: string;
  imageUrl: string;
  raisedAmount: string;
  leftAmount: string;
  donationsCount: number;
  progress: number;
  receiverAddress: string;
  taxBenefits?: boolean;
}

export const DonationCard: React.FC<DonationCardProps> = ({
  title,
  mission,
  imageUrl,
  raisedAmount,
  leftAmount,
  donationsCount,
  progress,
  receiverAddress,
  taxBenefits = false,
}) => {
  const navigate = useNavigate();

  const handleDonateClick = () => {
    navigate(`/donate?receiver=${receiverAddress}`);
  };

  return (
    <div className="max-w-xs sm:max-w-md min-w-xs sm:min-w-md m-2 bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="relative">
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
        {taxBenefits && (
          <span className="absolute top-2 left-2 bg-yellow-200 text-yellow-800 px-3 py-1 text-sm font-semibold rounded-md">
            Tax Benefits Available
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="text-gray-500 text-sm">{mission}</p>
        <h2 className="text-lg font-bold text-gray-900">{title}</h2>
        <div className="mt-3 flex items-center gap-2">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-yellow-500 h-2.5 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="text-sm font-semibold text-gray-700">{progress}%</span>
        </div>
        <div className="mt-2 flex justify-between items-center text-gray-700 font-medium">
          <span className="text-red-600">₹{raisedAmount} raised</span>
          <span>₹{leftAmount} left</span>
        </div>
        <div className="mt-2 text-gray-600 text-sm flex items-center gap-2">
          <span className="text-lg">👥</span>
          {donationsCount} Donations
        </div>
        <button
          onClick={handleDonateClick}
          className="mt-4 w-full hover:cursor-pointer bg-orange-500 text-white px-4 py-2 rounded-2xl text-lg font-bold shadow-md transition duration-300 hover:bg-orange-600"
        >
          Donate Now
        </button>
      </div>
    </div>
  );
};
