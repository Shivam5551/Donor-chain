import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, XAxis, YAxis, LineChart, Line } from "recharts";

// Dummy data for different time ranges
const lineDataSets: { [key: string]: { day?: string; week?: string; month?: string; donations: number }[] } = {
  "Last 7 days": [
    { day: "Mon", donations: 5000 },
    { day: "Tue", donations: 7000 },
    { day: "Wed", donations: 6000 },
    { day: "Thu", donations: 8000 },
    { day: "Fri", donations: 7500 },
    { day: "Sat", donations: 9000 },
    { day: "Sun", donations: 8500 },
  ],
  "Last 1 month": [
    { week: "Week 1", donations: 12000 },
    { week: "Week 2", donations: 15000 },
    { week: "Week 3", donations: 17000 },
    { week: "Week 4", donations: 19000 },
  ],
  "Last 1 year": [
    { month: "Jan", donations: 8000 },
    { month: "Feb", donations: 15000 },
    { month: "Mar", donations: 20000 },
    { month: "Apr", donations: 18000 },
    { month: "May", donations: 20000 },
    { month: "Jun", donations: 21000 },
    { month: "Jul", donations: 22000 },
    { month: "Aug", donations: 25000 },
    { month: "Sep", donations: 24000 },
    { month: "Oct", donations: 23000 },
    { month: "Nov", donations: 26000 },
    { month: "Dec", donations: 27000 },
  ],
};

// PieChart data
const pieData = [
  { name: "Education", value: 30 },
  { name: "Healthcare", value: 25 },
  { name: "Environment", value: 20 },
  { name: "Disaster Relief", value: 15 },
  { name: "Food Security", value: 10 },
];

const colors = ["#4CAF50", "#2196F3", "#FFC107", "#9C27B0", "#E91E63"];

export function DashboardCharts() {
  const [selectedRange, setSelectedRange] = useState<"Last 7 days" | "Last 1 month" | "Last 1 year">("Last 7 days");

  return (
    <div className="grid rounded-2xl grid-cols-1 gap-8 p-2 sm:p-8 bg-gray-50">
      {/* First Row: LineChart and PieChart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LineChart - Donation Trends Over Time */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-center text-xl font-semibold mb-4 text-gray-800">
            Monthly Donation Trends
          </h2>
          <div className="flex justify-center mb-4">
            <select
              className="px-4 py-2 border border-gray-300 rounded-md"
              value={selectedRange}
              onChange={(e) => setSelectedRange(e.target.value as "Last 7 days" | "Last 1 month" | "Last 1 year")}
            >
              <option>Last 7 days</option>
              <option>Last 1 month</option>
              <option>Last 1 year</option>
            </select>
          </div>
          <LineChart width={300} height={300} data={lineDataSets[selectedRange]} className="mx-auto">
            <XAxis dataKey={selectedRange === "Last 7 days" ? "day" : selectedRange === "Last 1 month" ? "week" : "month"} tick={{ fill: "#555" }} />
            <YAxis tick={{ fill: "#555" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                color: "#333",
                border: "1px solid #ddd",
                borderRadius: "6px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Line
              type="monotone"
              dataKey="donations"
              stroke="#4CAF50"
              strokeWidth={2}
              dot={{ fill: "#4CAF50", r: 5 }}
              activeDot={{ r: 8 }}
            />
            <Legend verticalAlign="top" wrapperStyle={{ color: "#555" }} />
          </LineChart>
        </div>

        {/* PieChart - Donation Allocation */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-center text-xl font-semibold mb-4 text-gray-800">
            Donation Allocation
          </h2>
          <div className="sm:flex hidden justify-center">
            <PieChart width={400} height={300}>
              <Pie data={pieData} dataKey="value" cx="50%" cy="50%" outerRadius={100} label>
                {pieData.map((entry, index) => (
                  <Cell key={entry.name} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  color: "#333",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Legend verticalAlign="middle" align="right" layout="vertical" wrapperStyle={{ color: "#555" }} />
            </PieChart>
          </div>
        </div>
      </div>
    </div>
  );
}
