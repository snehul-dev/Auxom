import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { getOrders } from "../services/orderService";
import { setOrders, resetOrders } from "../redux/slices/orderSlice";

export const useOrdersQuery = (userId) => {
  const dispatch = useDispatch();

  const query = useQuery({
    queryKey: ["orders", userId],
    queryFn: () => getOrders(userId),
    enabled: Boolean(userId),
    staleTime: 1000 * 60 * 5,
    retry: 1,
    onSuccess: (data) => {
      dispatch(setOrders(data));
    },
  });

  useEffect(() => {
    if (!userId) {
      dispatch(resetOrders());
    }
  }, [userId, dispatch]);

  return query;
};
