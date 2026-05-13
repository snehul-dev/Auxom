import AdminLayout from "../components/AdminLayout";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getAdminOrders } from "../services/adminOrders";

import {
  BarChart,
  Bar,
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

  const products = useSelector( (state) => state.products?.items || []);
  const users = useSelector((state) => state.users?.items || []);

  const revenue = orders.reduce((acc, order) => acc + order.total, 0);

  const categoryMap = {};

  products.forEach((product) => {
    const category = product.category;

    if (categoryMap[category]) {
      categoryMap[category] += 1;
    } else {
      categoryMap[category] = 1;
    }
  });

  const categoryData = Object.keys(categoryMap).map((key) => ({
      name: key,
      value: categoryMap[key],
    })
  );

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


  const BAR_COLORS = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
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

 {/* barchart */}
        <div className="bg-white p-6 rounded-2xl shadow">

          <h2 className="text-xl font-semibold mb-4">
            Products Category
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <BarChart data={categoryData}>

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="value"
                fill="#10B981"
                radius={[10, 10, 0, 0]}
              >
                {categoryData.map(
                  (entry, index) => (
                    <Cell
                      key={index}
                      fill={
                        BAR_COLORS[
                        index %
                        BAR_COLORS.length
                        ]
                      }
                    />
                  )
                )}
              </Bar>

            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* PIE CHART */}

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
                {pieData.map(
                  (entry, index) => (
                    <Cell
                      key={index}
                      fill={
                        PIE_COLORS[
                        index %
                        PIE_COLORS.length
                        ]
                      }
                    />
                  )
                )}
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