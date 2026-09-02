import AdminLayout from "../components/AdminLayout";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAdminOrders, updateOrder } from "../services/adminOrders";

function Orders() {
  const queryClient = useQueryClient();

  const { data: orders = [], isLoading, isError } = useQuery({
    queryKey: ["adminOrders"],
    queryFn: getAdminOrders,
  });

  console.log("Orders", orders);

  const handleStatusChange = async (order, status) => {
    try {
      await updateOrder(order.id, status);

      await queryClient.invalidateQueries({
        queryKey: ["adminOrders"],
      });
    } catch (error) {
      console.log("Status update failed:", error);
    console.log("Response:", error?.response?.data);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700 border-green-200";

      case "Shipped":
        return "bg-blue-100 text-blue-700 border-blue-200";

      case "Cancelled":
        return "bg-red-100 text-red-700 border-red-200";

      case "Pending":
      default:
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center min-h-[400px]">
          <p className="text-gray-500 text-lg">
            Loading orders...
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
            Failed to load orders.
          </p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Orders
        </h1>

        <p className="text-gray-500 mt-1">
          Manage and track customer orders
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">

        {/* Table Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              All Orders
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              {orders.length}{" "}
              {orders.length === 1 ? "order" : "orders"} found
            </p>
          </div>

          <div className="bg-gray-100 px-4 py-2 rounded-lg">
            <span className="text-sm text-gray-500">
              Total Orders
            </span>

            <p className="text-lg font-bold text-gray-800">
              {orders.length}
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">

            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">

                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Customer
                </th>

                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Items
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Total
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Payment
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Date
                </th>

                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>

              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">

              {orders.length > 0 ? (
                orders.map((order) => (

                  <tr
                    key={order.id}
                    className="hover:bg-gray-50 transition duration-200"
                  >

                    {/* Order ID */}
                    <td className="px-6 py-5">
                      <span className="font-medium text-gray-800">
                        #{order.id?.slice(0, 8)}
                      </span>
                    </td>

                    {/* User */}
                    <td className="px-6 py-5">
                      <div>
                        <p className="font-semibold text-gray-800">
                          {order.userName}
                        </p>
                      </div>
                    </td>

                    {/* Items */}
                    <td className="px-6 py-5 text-center">
                      <span className="inline-flex items-center justify-center min-w-8 h-8 px-2 rounded-full bg-gray-100 text-gray-700 font-medium text-sm">
                        {order.itemCount}
                      </span>
                    </td>

                    {/* Total */}
                    <td className="px-6 py-5 text-right">
                      <span className="font-bold text-gray-800">
                        ₹
                        {Number(order.total || 0).toLocaleString(
                          "en-IN"
                        )}
                      </span>
                    </td>

                    {/* Payment */}
                    <td className="px-6 py-5">
                      <span className="inline-flex px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm font-medium">
                        {order.paymentMethod}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-5">
                      <div className="text-sm">
                        <p className="text-gray-700 font-medium">
                          {new Date(
                            order.orderDate
                          ).toLocaleDateString("en-IN", {
                            timeZone: "Asia/Kolkata",
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })}
                        </p>

                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(
                            order.orderDate
                          ).toLocaleTimeString("en-IN", {
                            timeZone: "Asia/Kolkata",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                            hour12: true,
                          })}
                        </p>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-5">
                      <div className="flex justify-center">
                        <select
                          value={order.status || "Pending"}
                          onChange={(e) =>
                            handleStatusChange(
                              order,
                              e.target.value
                            )
                          }
                          className={`px-3 py-2 rounded-lg border text-sm font-medium outline-none cursor-pointer transition ${getStatusStyle(
                            order.status
                          )}`}
                        >
                          <option value="Pending">
                            Pending
                          </option>

                          <option value="Shipped">
                            Shipped
                          </option>

                          <option value="Delivered">
                            Delivered
                          </option>

                          <option value="Cancelled">
                            Cancelled
                          </option>
                        </select>
                      </div>
                    </td>

                  </tr>

                ))
              ) : (

                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-12 text-center"
                  >
                    <p className="text-gray-500 font-medium">
                      No orders found
                    </p>

                    <p className="text-sm text-gray-400 mt-1">
                      Customer orders will appear here.
                    </p>
                  </td>
                </tr>

              )}

            </tbody>

          </table>
        </div>

      </div>
    </AdminLayout>
  );
}

export default Orders;