import { useWallet } from "../hooks/use-wallet";
import { Avatar } from "./Avatar";
import { SubHeading } from "./SubHeading";
import { useState, useEffect } from "react";
import { getContractBalance } from "../utils/web3";

export const OrgProfile = () => {
  const { walletAddress } = useWallet();
  const [contractBalance, setContractBalance] = useState<string | null>(null);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const balance = await getContractBalance();
        setContractBalance(balance);
      } catch (error) {
        console.error("Error fetching contract balance:", error);
        setContractBalance("Unavailable");
      }
    };

    fetchBalance();
  }, []);

  return (
    <div className="p-2 sm:p-6 block md:flex items-center gap-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-center">
        <Avatar />
      </div>

      {/* Organization Info */}
      <div className="text-lg font-semibold text-gray-800">
        <div className="mb-1 flex items-center">
          <SubHeading title="Organization: " />
          <span className="font-normal text-gray-700">Charity Org</span>
        </div>

        <div className="text-sm text-gray-600 overflow-hidden truncate max-w-[70dvw]">
          <span className="flex items-center">
            <SubHeading title="Wallet Address: " />
            <span className="font-medium text-gray-900">
              {walletAddress ? walletAddress : "First connect the wallet"}
            </span>
          </span>
          
          <span className="my-2 flex text-lg items-center justify-start">
            <SubHeading title="Available Balance: " />
            {contractBalance ? `${contractBalance} ETH` : "Loading..."}
          </span>
        </div>
      </div>
    </div>
  );
};
