import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Orders() {
  const orders = useSelector((state) => state?.orders.orders);
  const latestOrders = [...orders].reverse()

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold mb-6">
          Your Orders 📦
        </h1>

        {latestOrders.length === 0 ? (
          <p className="text-red-500 text-center text-2xl">No orders yet</p>
        ) : (
          <div className="space-y-6">
            {latestOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white p-6 rounded-xl shadow"
              >
                <div className="flex justify-between mb-3">
                  <p className="font-semibold">
                    Order ID: {order.id}
                  </p>
                  <p className="text-sm text-gray-500">
                    {order.date}
                  </p>
                </div>

                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div
                      key={item.productId}
                      className="flex justify-between text-sm"
                    >
                      <span>
                        {item.name} × {item.qty}
                      </span>
                      <span>
                        ₹{item.price * item.qty}
                      </span>
                      <img className="w-40" src={item.image} alt="" />
                    </div>
                  ))}
                </div>

                <div className="border-t mt-4 pt-3 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₹{order.total}</span>
                </div>

                <p className="text-sm text-gray-500 mt-2">
                  Payment: {order.method}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer/>
    </>
  );
}

export default Orders;