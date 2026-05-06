import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { getWishlist } from "../services/wishlistService";
import { setWishlist, resetWishlist } from "../redux/slices/whishlistSlice";

export const useWishlistQuery = (userId) => {
  const dispatch = useDispatch();

  const query = useQuery({
    queryKey: ["wishlist", userId],
    queryFn: () => getWishlist(userId),
    enabled: Boolean(userId),
    staleTime: 1000 * 60 * 5,
    retry: 1,
    onSuccess: (data) => {
      dispatch(setWishlist(data));
    },
  });

  useEffect(() => {
    if (!userId) {
      dispatch(resetWishlist());
    }
  }, [userId, dispatch]);

  return query;
};
