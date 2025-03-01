import { useWallet } from "../hooks/use-wallet";
import { Avatar } from "./Avatar";
import { SubHeading } from "./SubHeading";

export const UserProfile = () => {
  const { walletAddress } = useWallet();

  return (
    <div className="p-2 sm:p-6 block md:flex items-center gap-4 bg-white rounded-lg shadow-md">

      <div className="flex items-center justify-center">
      <Avatar />
      </div>

      {/* User Info */}
      <div className="text-lg font-semibold text-gray-800">
        <div className="mb-1 flex items-center"><SubHeading title="Name: "/><span className="font-normal text-gray-700">Dev Sharma</span></div>
        <div className="text-sm text-gray-600 overflow-hidden truncate max-w-[70dvw]">
          <span className="flex items-center"><SubHeading title="Wallet Address: "/>
          <span className="font-medium text-gray-900">
            {walletAddress ? walletAddress : "First connect the wallet"}
          </span></span>
          <span className="my-2 flex text-lg items-center justify-start"><SubHeading title="On Going Pledges: "/>No pledge taken</span>
        </div>
      </div>
    </div>
  );
};
