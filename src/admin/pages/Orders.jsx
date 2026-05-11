import AdminLayout from "../components/AdminLayout";
import { useSelector } from "react-redux";

function Orders() {

  const orders = useSelector(
    (state) => state.orders.orders
  );

  return (
    <AdminLayout>

      <h1 className="text-3xl font-bold mb-6">
        Orders
      </h1>

      <div className="bg-white rounded-2xl shadow overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>

              <th className="p-4 text-left">
                Order ID
              </th>

              <th className="p-4 text-left">
                Total
              </th>

              <th className="p-4 text-left">
                Payment
              </th>

              <th className="p-4 text-left">
                Date
              </th>

            </tr>
          </thead>

          <tbody>

            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-t"
              >
                <td className="p-4">
                  {order.id}
                </td>

                <td className="p-4">
                  ₹{order.total}
                </td>

                <td className="p-4">
                  {order.method}
                </td>

                <td className="p-4">
                  {order.date}
                </td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </AdminLayout>
  );
}

export default Orders;