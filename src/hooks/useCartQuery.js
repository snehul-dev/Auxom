import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { getCart } from "../services/cartService";
import { setCart, resetCart } from "../redux/slices/cartSlice";

export const useCartQuery = (userId) => {
  const dispatch = useDispatch();

  const query = useQuery({
    queryKey: ["cart", userId],
    queryFn: () => getCart(userId),
    enabled: Boolean(userId),
    staleTime: 1000 * 60 * 5,
    retry: 1,
    onSuccess: (data) => {
      dispatch(setCart(data));
    },
  });

  useEffect(() => {
    if (!userId) {
      dispatch(resetCart());
    }
  }, [userId, dispatch]);

  return query;
};
