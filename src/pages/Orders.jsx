
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  addReviewAPI,
  getUserReviewsAPI,
} from "../services/reviewService";
import toast from "react-hot-toast";

function Orders() {
  const orders = useSelector((state) => state?.orders.orders);

  const [ratings, setRatings] = useState({});
  const [reviewedProducts, setReviewedProducts] = useState({});

  const latestOrders = [...orders].reverse();

  // Get already reviewed products from backend
  useEffect(() => {
    const loadReviews = async () => {
      try {
        const reviews = await getUserReviewsAPI();
        console.log("USER REVIEWS:", reviews);

        const reviewed = {};
        const userRatings = {};

        reviews.forEach((review) => {
          console.log("REVIEW:", review);
          reviewed[review.productId] = true;
          userRatings[review.productId] = review.rating;
        });
        console.log("REVIEWED PRODUCTS:", reviewed);
        console.log("USER RATINGS:", userRatings);
        setReviewedProducts(reviewed);
        setRatings(userRatings);

      } catch (error) {
        console.error("Failed to load reviews:", error);
      }
    };

    loadReviews();
  }, []);

  // Select a star
  const handleRating = (productId, rating) => {
    setRatings((prev) => ({
      ...prev,
      [productId]: rating,
    }));
  };

  // Submit rating
  const handleSubmitRating = async (productId) => {
    const rating = ratings[productId];

    if (!rating) {
      toast("Please select a rating");
      return;
    }

    try {
      await addReviewAPI(productId, rating);

      // Mark product as reviewed
      setReviewedProducts((prev) => ({
        ...prev,
        [productId]: true,
      }));

      toast.success("Rating submitted successfully!");

    } catch (error) {
      console.error("Failed to submit rating:", error);

      toast(
        error?.response?.data?.message ||
        "Failed to submit rating"
      );
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 px-4 py-8 sm:px-6 lg:px-10">
        <div className="max-w-5xl mx-auto">

          <h1 className="text-3xl font-bold mb-8 text-gray-800">
            Your Orders 📦
          </h1>

          {latestOrders.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-10 text-center">
              <p className="text-red-500 text-2xl font-semibold">
                No orders yet
              </p>
            </div>
          ) : (
            <div className="space-y-6">

              {latestOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden"
                >

                  {/* Order Header */}
                  <div className="px-6 py-4 border-b bg-gray-50">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">

                      <div>
                        <p className="font-semibold text-gray-800">
                          Order ID:{" "}
                          <span className="font-normal text-gray-600">
                            {order.orderId}
                          </span>
                        </p>

                        <p className="text-sm text-gray-500 mt-1">
                          {new Date(
                            order.orderDate
                          ).toLocaleString()}
                        </p>
                      </div>

                      <span className="text-sm font-medium text-green-600 bg-green-100 px-3 py-1 rounded-full w-fit">
                        {order.status}
                      </span>

                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="px-6 py-5">

                    <div className="space-y-4">

                      {order.orderItems.map((item) => (

                        <div
                          key={item.productId}
                          className="grid grid-cols-[64px_1fr_auto] sm:grid-cols-[80px_1fr_100px] gap-4 items-center"
                        >

                          {/* Product Image */}
                          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                            <img
                              className="w-full h-full object-contain"
                              src={item.image}
                              alt={item.productName}
                            />
                          </div>

                          {/* Product Details */}
                          <div className="min-w-0">

                            <p className="font-medium text-gray-800 truncate">
                              {item.productName}
                            </p>

                            <p className="text-sm text-gray-500 mt-1">
                              ₹{item.price} × {item.quantity}
                            </p>

                            {/* Rating */}
                            {order.status === "Delivered" && (
                              <div className="mt-3">

                                {!reviewedProducts[item.productId] ? (
                                  <>
                                    <p className="text-sm text-gray-500 mb-1">
                                      Rate this product
                                    </p>

                                    <div className="flex items-center gap-1">

                                      {/* Stars */}
                                      {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                          key={star}
                                          type="button"
                                          onClick={() =>
                                            handleRating(
                                              item.productId,
                                              star
                                            )
                                          }
                                          className={`text-2xl transition ${star <=
                                              (ratings[item.productId] || 0)
                                              ? "text-yellow-400"
                                              : "text-gray-300"
                                            }`}
                                        >
                                          ★
                                        </button>
                                      ))}

                                      {/* Submit */}
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleSubmitRating(
                                            item.productId
                                          )
                                        }
                                        className="ml-3 bg-black text-white px-3 py-1 rounded-md text-sm hover:bg-gray-800"
                                      >
                                        Submit
                                      </button>

                                    </div>
                                  </>
                                ) : (
                                  <div className="flex items-center gap-2 mt-2">

                                    <span className="text-yellow-400 text-xl">
                                      {"★".repeat(
                                        ratings[item.productId] || 0
                                      )}
                                    </span>

                                    <span className="text-sm text-green-600">
                                      Rated
                                    </span>

                                  </div>
                                )}

                              </div>
                            )}

                          </div>

                          {/* Price */}
                          <div className="text-right font-semibold text-gray-800">
                            ₹{item.price * item.quantity}
                          </div>

                        </div>

                      ))}

                    </div>

                    {/* Total */}
                    <div className="border-t mt-6 pt-4 flex justify-between items-center">

                      <span className="text-gray-600 font-medium">
                        Total
                      </span>

                      <span className="text-xl font-bold text-gray-900">
                        ₹{order.total}
                      </span>

                    </div>

                    {/* Payment */}
                    <div className="mt-3 flex justify-between items-center text-sm">

                      <span className="text-gray-500">
                        Payment Method
                      </span>

                      <span className="font-medium text-gray-700">
                        {order.paymentMethod}
                      </span>

                    </div>

                  </div>
                </div>
              ))}

            </div>
          )}

        </div>
      </div>

      <Footer />
    </>
  );
}

export default Orders;

