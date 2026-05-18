import AdminLayout from "../components/AdminLayout";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getAdminOrders } from "../services/adminOrders";

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

  const { data: orders = [] } = useQuery({
    queryKey: ["adminOrders"],
    queryFn: getAdminOrders,
  });

  const products = useSelector(
    (state) => state.products?.items || []
  );

  const users = useSelector(
    (state) => state.users?.items || []
  );


  const revenue = orders.reduce(
    (acc, order) => acc + order.total,
    0
  );


  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];



  const monthlySalesMap = {};

  orders.forEach((order) => {

    const date = new Date(order.date);

    const month = months[date.getMonth()];

    if (monthlySalesMap[month]) {

      monthlySalesMap[month] += Number(order.total);

    } else {

      monthlySalesMap[month] = Number(order.total);
    }

  });


  const salesData = months.map((month) => ({
    month,
    sales: monthlySalesMap[month] || 0,
  }));



  // PIE CHART DATA

  const pieData = [
    {
      name: "Products",
      value: products.length,
    },
    {
      name: "Orders",
      value: orders.length,
    },
    {
      name: "Users",
      value: users.length,
    },
  ];



  const PIE_COLORS = [
    "#06B6D4",
    "#8B5CF6",
    "#10B981",
  ];



  return (

    <AdminLayout>

      <h1 className="text-3xl font-bold mb-8">
        Dashboard
      </h1>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-white p-6 rounded-2xl shadow">

          <h2 className="text-gray-500">
            Total Products
          </h2>

          <p className="text-3xl font-bold mt-2">
            {products.length}
          </p>

        </div>



        <div className="bg-white p-6 rounded-2xl shadow">

          <h2 className="text-gray-500">
            Total Orders
          </h2>

          <p className="text-3xl font-bold mt-2">
            {orders.length}
          </p>

        </div>



        <div className="bg-white p-6 rounded-2xl shadow">

          <h2 className="text-gray-500">
            Total Users
          </h2>

          <p className="text-3xl font-bold mt-2">
            {users.length}
          </p>

        </div>



        <div className="bg-white p-6 rounded-2xl shadow">

          <h2 className="text-gray-500">
            Revenue
          </h2>

          <p className="text-3xl font-bold mt-2">
            ₹{revenue}
          </p>

        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

        <div className="bg-white p-6 rounded-2xl shadow">

          <h2 className="text-xl font-semibold mb-4">
            Monthly Sales Report
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <LineChart data={salesData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="sales"
                stroke="#3B82F6"
                strokeWidth={3}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

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

    </AdminLayout>

  );
}

export default Dashboard;