import AdminLayout from "../components/AdminLayout";
import { useQuery,useQueryClient,} from "@tanstack/react-query";
import {getAdminOrders,updateOrder,} from "../services/adminOrders";

function Orders() {

  const queryClient = useQueryClient();

  const { data: orders = [] } = useQuery({
      queryKey: ["adminOrders"],
      queryFn: getAdminOrders,
    });

  const handleStatusChange =async (order, status) => {

    
      try {

        const updatedOrder = {
          ...order,
          status,
        };

        await updateOrder( order.id, updatedOrder);

        queryClient.invalidateQueries(["adminOrders"] );

      } catch (error) {

        console.log(error);
      }
    };

  return (
    <AdminLayout>

      <h1 className="text-3xl font-bold mb-6">
        Orders
      </h1>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4 text-left">
                Order ID
              </th>

              <th className="p-4 text-left">
                User Name
              </th>

              <th className="p-4 text-left">
                Items
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

              <th className="p-4 text-left">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {orders.map((order, index) => (
              

              <tr
                key={order.id}
                className={`hover:bg-gray-50 transition ${
                  index !== orders.length - 1
                    ? "shadow-sm"
                    : ""
                }`}
              >

                <td className="p-4">
                  {order.id}
                </td>

                <td className="p-4">
                  {order.address.name}
                </td>

                <td className="p-4">
                  {order.items.length}
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

                <td className="p-4">

                  <select
                    value={ order.status || "Pending" }
                    onChange={(e) =>
                      handleStatusChange( order,e.target.value )
                    }
                    className="border px-3 py-1 rounded"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled"> Cancelled</option>
                  </select>

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