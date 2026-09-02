import AdminLayout from "../components/AdminLayout";
import { useQuery } from "@tanstack/react-query";
import { getAdminDashboard } from "../services/adminDashboard";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

function Dashboard() {
  const { data: dashboard, isLoading, isError } = useQuery({
    queryKey: ["adminDashboard"],
    queryFn: getAdminDashboard,
  });

  console.log("Admin data", dashboard);

  const pieData = [
    {
      name: "Products",
      value: dashboard?.totalProducts || 0,
    },
    {
      name: "Orders",
      value: dashboard?.totalOrders || 0,
    },
    {
      name: "Users",
      value: dashboard?.totalUsers || 0,
    },
  ];

  const PIE_COLORS = [
    "#06B6D4",
    "#8B5CF6",
    "#10B981",
  ];

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center min-h-[400px]">
          <p className="text-gray-500 text-lg">
            Loading dashboard...
          </p>
        </div>
      </AdminLayout>
    );
  }

  if (isError) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center min-h-[400px]">
          <p className="text-red-500 text-lg">
            Failed to load dashboard.
          </p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-8">
        Dashboard
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-gray-500">
            Total Products
          </h2>

          <p className="text-3xl font-bold mt-2">
            {dashboard?.totalProducts || 0}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-gray-500">
            Total Orders
          </h2>

          <p className="text-3xl font-bold mt-2">
            {dashboard?.totalOrders || 0}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-gray-500">
            Total Users
          </h2>

          <p className="text-3xl font-bold mt-2">
            {dashboard?.totalUsers || 0}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-gray-500">
            Revenue
          </h2>

          <p className="text-3xl font-bold mt-2">
            ₹{dashboard?.totalRevenue || 0}
          </p>
        </div>

      </div>

      {/* Graph + Pie Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

        {/* Monthly Sales Graph */}
        <div className="bg-white p-6 rounded-2xl shadow">

          <h2 className="text-xl font-semibold mb-4">
            Monthly Sales Report
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <LineChart
              data={dashboard?.monthlySales || []}
            >
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip
                formatter={(value) => [
                  `₹${value}`,
                  "Sales",
                ]}
              />

              <Line
                type="monotone"
                dataKey="sales"
                stroke="#3B82F6"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>

        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-2xl shadow">

          <h2 className="text-xl font-semibold mb-4">
            System Overview
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <PieChart>

              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={
                      PIE_COLORS[
                        index % PIE_COLORS.length
                      ]
                    }
                  />
                ))}
              </Pie>

              <Tooltip />

              <Legend />

            </PieChart>
          </ResponsiveContainer>

        </div>

      </div>

  
 {/* Monthly Sales Table */}
<div className="bg-white rounded-2xl shadow-lg mt-8 overflow-hidden border border-gray-100">

  <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
    <div>
      <h2 className="text-xl font-bold text-gray-800">
        Monthly Sales
      </h2>
      <p className="text-sm text-gray-500 mt-1">
        Sales performance by month
      </p>
    </div>

    <div className="bg-gray-100 px-4 py-2 rounded-lg">
      <span className="text-sm text-gray-500">
        Total Sales
      </span>
      <p className="font-bold text-gray-800">
        ₹
        {dashboard?.monthlySales
          ?.reduce(
            (total, item) =>
              total + Number(item.sales || 0),
            0
          )
          .toLocaleString("en-IN")}
      </p>
    </div>
  </div>

  <div className="overflow-x-auto">
    <table className="w-full">

      <thead>
        <tr className="bg-gray-50 border-b border-gray-200">

          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
            #
          </th>

          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Month
          </th>

          <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Month Number
          </th>

          <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Sales
          </th>

        </tr>
      </thead>

      <tbody className="divide-y divide-gray-100">

        {dashboard?.monthlySales?.length > 0 ? (

          dashboard.monthlySales.map((item, index) => (

            <tr
              key={item.monthNumber}
              className="group hover:bg-gray-50 transition duration-200"
            >

              <td className="px-6 py-4">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-sm font-semibold text-gray-600 group-hover:bg-black group-hover:text-white transition">
                  {index + 1}
                </span>
              </td>

              <td className="px-6 py-4">
                <div className="flex items-center gap-3">

                  <div>
                    <p className="font-semibold text-gray-800">
                      {item.month}
                    </p>

                    <p className="text-xs text-gray-400">
                      Monthly Sales
                    </p>
                  </div>

                </div>
              </td>

              <td className="px-6 py-4 text-center">
                <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-gray-100 text-sm font-medium text-gray-600">
                  {item.monthNumber}
                </span>
              </td>

              <td className="px-6 py-4 text-right">

                <span className="text-lg font-bold text-gray-800">
                  ₹{Number(item.sales || 0).toLocaleString("en-IN")}
                </span>

              </td>

            </tr>

          ))

        ) : (

          <tr>
            <td
              colSpan="4"
              className="px-6 py-12 text-center"
            >
              <div className="flex flex-col items-center">

                <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                  <span className="text-2xl">
                    📊
                  </span>
                </div>

                <p className="font-semibold text-gray-700">
                  No sales data
                </p>

                <p className="text-sm text-gray-400 mt-1">
                  Monthly sales will appear here.
                </p>

              </div>
            </td>
          </tr>

        )}

      </tbody>

      {dashboard?.monthlySales?.length > 0 && (

        <tfoot>

          <tr className="bg-gray-50 border-t border-gray-200">

            <td
              colSpan="3"
              className="px-6 py-5 text-right"
            >
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                Total Sales
              </span>
            </td>

            <td className="px-6 py-5 text-right">
              <span className="text-xl font-bold text-gray-900">
                ₹
                {dashboard.monthlySales
                  .reduce(
                    (total, item) =>
                      total + Number(item.sales || 0),
                    0
                  )
                  .toLocaleString("en-IN")}
              </span>
            </td>

          </tr>

        </tfoot>

      )}

    </table>
  </div>

</div>
    </AdminLayout>
  );
}

export default Dashboard;