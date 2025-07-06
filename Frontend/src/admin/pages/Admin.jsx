import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const userGrowthData = [
  { month: "Jan", users: 400 },
  { month: "Feb", users: 700 },
  { month: "Mar", users: 1200 },
  { month: "Apr", users: 1500 },
  { month: "May", users: 1800 },
  { month: "Jun", users: 2000 },
];

const salesData = [
  { name: "Product A", value: 400 },
  { name: "Product B", value: 300 },
  { name: "Product C", value: 300 },
  { name: "Product D", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const AdminDashboard = () => {
  return (
    <section className="p-6 min-h-screen bg-transparent text-white">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* User Growth Line Chart */}
        <div className="flex-1 rounded-lg shadow p-6 bg-transparent max-w-full">
          <h2 className="text-xl font-semibold mb-4">User Growth (Monthly)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={userGrowthData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis dataKey="month" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip />
              <Legend wrapperStyle={{ color: "white" }} />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Sales Distribution Pie Chart */}
        <div className="flex-1 rounded-lg shadow p-6 bg-transparent max-w-full">
          <h2 className="text-xl font-semibold mb-4">Sales Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={salesData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {salesData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
