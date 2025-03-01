import { useState, useEffect } from "react";
import { Appbar } from "../components/Appbar";
import { Footer } from "../components/Footer";
import { PopularCharity } from "../components/PopularCharityCard";
import { useWallet } from "../hooks/use-wallet";
import { getContractBalance } from "../utils/web3";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { useNavigate } from "react-router-dom";
import { OrgProfile } from "../components/OrgProfile";
import { Loading } from "../components/Loading";

export const OrgDashboard = () => {
  const [contractBalance, setContractBalance] = useState<number>(0);
  const { walletAddress, handleConnect } = useWallet();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/signin");
  }
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const balance = await getContractBalance();
        setContractBalance(parseFloat(balance));
      } catch (error) {
        console.error("Error fetching contract balance:", error);
      }
    };
    fetchBalance();
  }, []);

  const handleWithdraw = () => {
    navigate("/withdraw");
  };

  const data = [{ name: "Available Funds", value: contractBalance, color: "#4CAF50" }];

  if(!token) {
      return (<Loading/>)
    }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      <Appbar />

      <main className="flex-1 bg-white pt-20 pb-10 mx-auto px-4 sm:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
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
            <div className="bg-white rounded-xl p-6 text-center">
              <h3 className="text-xl font-semibold">Organization Fund Overview</h3>
              <PieChart width={250} height={250}>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
              <p className="mt-2 text-lg font-bold">Available balance: {contractBalance} ETH</p>
              <button
                onClick={handleWithdraw}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Withdraw Funds
              </button>
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="bg-white grid place-items-center lg:place-items-end shadow-lg rounded-xl p-2 lg:p-6 overflow-y-auto">
              <PopularCharity />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
