import { useState, useEffect } from "react";
import { Appbar } from "../components/Appbar";
import { Footer } from "../components/Footer";
import { PopularCharity } from "../components/PopularCharityCard";
import { useWallet } from "../hooks/use-wallet";
import { getContractBalance } from "../utils/web3";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useNavigate } from "react-router-dom";
import { OrgProfile } from "../components/OrgProfile";

export const OrgDashboard = () => {
  const [contractBalance, setContractBalance] = useState<number>(0);
  const { walletAddress, handleConnect } = useWallet();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const balance = await getContractBalance();
        setContractBalance(parseFloat(balance) || 5.2); // Default dummy balance
      } catch (error) {
        console.error("Error fetching contract balance:", error);
        setContractBalance(5.2); // Fallback dummy balance
      }
    };
    fetchBalance();
  }, []);

  const handleWithdraw = () => navigate("/withdraw");
  const handleRaiseFunds = () => navigate("/raise-funds");

  // Dummy Data for Pie Charts
  const balanceData = [
    { name: "Available Funds", value: contractBalance, color: "#4CAF50" },
    { name: "Donated Funds", value: contractBalance * 0.6, color: "#FFC107" }
  ];

  const fundDistributionData = [
    { name: "Admin Costs", value: 2.5, color: "#FF5733" },
    { name: "Donor Contributions", value: 3.0, color: "#33FF57" },
    { name: "Grants", value: 2.0, color: "#3380FF" },
    { name: "Miscellaneous", value: 1.5, color: "#FFC300" }
  ];

  // Dummy Data for Charity Listings
  const charityList = [
    { name: "Save the Earth", amount: "3.1 ETH" },
    { name: "Education for All", amount: "2.5 ETH" },
    { name: "Medical Aid", amount: "1.8 ETH" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      <Appbar />

      <main className="flex-1 bg-white pt-20 pb-10 mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
          {/* Left Section */}
          <div className="md:col-span-2">
            <div className="mt-6 flex justify-start pl-2">
              {!walletAddress ? (
                <button
                  onClick={handleConnect}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Connect Wallet
                </button>
              ) : (
                <OrgProfile />
              )}
            </div>

            {/* Organization Fund Overview */}
            <div className="bg-white rounded-xl p-6 text-center shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Organization Fund Overview</h3>

              <div className="flex justify-center gap-12">
                {/* Pie Chart 1: Contract Balance */}
                {/* <div className="text-center">
                  <h4 className="font-semibold mb-2">Fund Status</h4>
                  <PieChart width={250} height={250}>
                    <Pie
                      data={balanceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {balanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                  <p className="mt-2 text-lg font-bold">Available balance: {contractBalance} ETH</p>
                </div> */}

                {/* Pie Chart 2: Fund Distribution */}
                <div className="text-center">
                  <h4 className="font-semibold mb-2">Fund Distribution</h4>
                  <PieChart width={350} height={250}>
                    <Pie
                      data={fundDistributionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {fundDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-center gap-4 mt-4">
                <button
                  onClick={handleWithdraw}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  Withdraw Funds
                </button>
                <button
                  onClick={handleRaiseFunds}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  Raise Funds
                </button>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="md:col-span-1">
            <div className="bg-white grid place-items-center lg:place-items-end shadow-lg rounded-xl p-2 lg:p-6 overflow-y-auto">
              {charityList.map((charity, index) => (
                <PopularCharity key={index} name={charity.name} amount={charity.amount} />
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
