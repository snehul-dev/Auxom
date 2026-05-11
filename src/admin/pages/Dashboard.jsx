import AdminLayout from "../components/AdminLayout";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import {getAdminOrders} from "../services/adminOrders"

function Dashboard() {
  const {data:orders=[]} = useQuery({
    queryKey:["adminOrders"],
    queryFn:getAdminOrders
  })
  const products = useSelector(
    (state) => state.products?.items ||[]
  );



  const users = useSelector(
    (state) => state.users?.items || []
  );
  console.log(orders)

  const revenue = orders.reduce(
    (acc, order) => acc + order.total,
    0
  );

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
    </AdminLayout>
  );
}

export default Dashboard;