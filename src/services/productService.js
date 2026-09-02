import API from "./api";

export const getProducts = async (
  pageNumber = 1,
  pageSize = 9,
  filters = {}
) => {
  const res = await API.get("/Product", {
    params: {
      pageNumber,
      pageSize,
      search: filters.search || undefined,
      category: filters.category || undefined,
      color: filters.color || undefined,
      minPrice: filters.minPrice ?? undefined,
      maxPrice: filters.maxPrice ?? undefined,
      minRating: filters.minRating ?? undefined,
      inStock: filters.inStock ?? undefined,
      sortBy: filters.sortBy || undefined,
    },
  });

  return res.data;
};

export const getSingleProduct = async (id) => {
  const res = await API.get(`/Product/${id}`);

  return res.data;
};