import { useState } from "react";
import { Appbar } from "../components/Appbar";
import { Footer } from "../components/Footer";
import { PopularCharity } from "../components/PopularCharityCard";
import SearchBar from "../components/SearchBar";
import { UserProfile } from "../components/UserProfile";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { Achievements } from "../components/Achievements.tsx";
import { useNavigate } from "react-router-dom";
import { Loading } from "../components/Loading.tsx";

export const UserDashboard = () => {
  const [goal, setGoal] = useState<number>(100); // Default goal: 100 ETH
  const [donated] = useState<number>(25); // Example donated amount
  const remaining = goal - donated > 0 ? goal - donated : 0;
  const navigate = useNavigate();
  
  const data = [
    { name: "Donated", value: donated, color: "#4CAF50" },
    { name: "Remaining", value: remaining, color: "#F44336" },
  ];

  const handleSetGoal = () => {
    const newGoal = prompt("Enter your monthly donation goal (ETH):", goal.toString());
    if (newGoal !== null) {
      const parsedGoal = parseFloat(newGoal);
      if (!isNaN(parsedGoal) && parsedGoal > 0) {
        setGoal(parsedGoal);
      } else {
        alert("Please enter a valid number greater than 0.");
      }
    }
  };

  const handleRaiseFund = () => {
    navigate('/upload/docs')
  };


  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      <Appbar />

      <main className="flex-1 pt-20 pb-10 mx-auto px-4 sm:px-8">
        {/* Search Bar */}
        <div className="mt-6 flex justify-center">
          <SearchBar />
        </div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
          {/* User Profile Section */}
          <div className="md:col-span-2">
            <div className="bg-white shadow-lg rounded-xl p-6">
              <UserProfile />
              <div className="mt-6 text-center">
                <button
                  onClick={handleSetGoal}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Set Goal
                </button>
                <button
                  onClick={handleRaiseFund}
                  className="ml-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  Raise Funds
                </button>
                <div className="mt-6 text-center">
                  <h3 className="text-lg font-semibold mb-2">Monthly Donation Progress</h3>
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
                  <p className="mt-2 text-sm text-gray-600">{donated} ETH donated / {goal} ETH goal</p>
                </div>
                <Achievements />
              </div>
            </div>
          </div>

          {/* Charity & Donation Progress */}
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
