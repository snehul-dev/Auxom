import AdminLayout from "../components/AdminLayout";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

import {
  addProduct as addProductRedux,
  updateProduct as updateProductRedux,
  deleteProduct as deleteProductRedux,
} from "../../redux/slices/productSlice";

import {
  addProduct,
  updateProduct,
  deleteProduct,
} from "../services/adminProductServices";

function Products() {
  const dispatch = useDispatch();

  const products = useSelector(
    (state) => state.products?.items?.items || []
  );

  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const productsPerPage = 5;

  const emptyForm = {
    name: "",
    price: "",
    category: "",
    color: "",
    stockQuantity: "",
    description: "",
    image: null,
  };

  const [formData, setFormData] = useState(emptyForm);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const productData = new FormData();

      productData.append("Name", formData.name);
      productData.append("Price", formData.price);
      productData.append("Category", formData.category);
      productData.append("Color", formData.color);
      productData.append("StockQuantity", formData.stockQuantity);
      productData.append("Description", formData.description);

      // Only append image when a new image is selected
      if (formData.image instanceof File) {
        productData.append("Image", formData.image);
      }

      if (editingProduct) {
        const updatedProduct = await updateProduct(
          editingProduct.id,
          productData
        );

        dispatch(updateProductRedux(updatedProduct));
      } else {
        const newProduct = await addProduct(productData);

        dispatch(addProductRedux(newProduct));
      }

      setShowModal(false);
      setEditingProduct(null);
      setFormData(emptyForm);
    } catch (error) {
      console.error("Product operation failed:", error);
      console.error("Response:", error?.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);

    setFormData({
      name: product.name ?? "",
      price: product.price ?? "",
      category: product.category ?? "",
      color: product.color ?? "",
      stockQuantity: product.stockQuantity ?? 0,
      description: Array.isArray(product.description)
        ? product.description.join(", ")
        : product.description ?? "",
      image: product.image ?? null,
    });

    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      dispatch(deleteProductRedux(id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setFormData(emptyForm);
    setShowModal(true);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      product.category
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const reversedProducts = [...filteredProducts].reverse();

  const indexOfLastProduct =
    currentPage * productsPerPage;

  const indexOfFirstProduct =
    indexOfLastProduct - productsPerPage;

  const currentProducts = reversedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(
    filteredProducts.length / productsPerPage
  );

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Products
        </h1>

        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-gray-300 px-4 py-2 rounded-lg w-64 outline-none focus:ring-2 focus:ring-gray-300"
          />

          <button
            type="button"
            onClick={handleAddProduct}
            className="bg-black text-white px-5 py-2 rounded-lg"
          >
            Add Product
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Image</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Stock</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <tr
                  key={product.id}
                  className="shadow-sm hover:bg-gray-50 transition"
                >
                  <td className="p-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  </td>

                  <td className="p-4">
                    {product.name}
                  </td>

                  <td className="p-4">
                    ₹{product.price}
                  </td>

                  <td className="p-4">
                    {product.category}
                  </td>

                  <td className="p-4">
                    {product.stockQuantity > 0 ? (
                      <span className="text-green-600 font-medium">
                        {product.stockQuantity}
                      </span>
                    ) : (
                      <span className="text-red-500 font-medium">
                        Out of Stock
                      </span>
                    )}
                  </td>

                  <td className="p-4">
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => handleEdit(product)}
                        className="bg-blue-500 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(product.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center p-6 text-gray-500"
                >
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex justify-center items-center gap-4 p-4">
          <button
            type="button"
            onClick={() =>
              setCurrentPage((prev) =>
                prev > 1 ? prev - 1 : prev
              )
            }
            className="bg-black text-white px-4 py-2 rounded"
          >
            Prev
          </button>

          <span className="font-semibold">
            Page{" "}
            {currentProducts.length > 0
              ? currentPage
              : 0}{" "}
            of {totalPages}
          </span>

          <button
            type="button"
            onClick={() =>
              setCurrentPage((prev) =>
                prev < totalPages
                  ? prev + 1
                  : prev
              )
            }
            className="bg-black text-white px-4 py-2 rounded"
          >
            Next
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-start overflow-y-auto z-50 py-10">
          <div className="bg-white p-6 rounded-2xl w-full max-w-md my-auto">
            <h2 className="text-2xl font-bold mb-4">
              {editingProduct
                ? "Edit Product"
                : "Add Product"}
            </h2>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4"
            >
              <input
                type="text"
                name="name"
                placeholder="Product Name"
                value={formData.name}
                onChange={handleChange}
                className="border p-3 rounded-lg"
                required
              />

              <input
                type="number"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
                className="border p-3 rounded-lg"
                min="0"
                required
              />

              <input
                type="text"
                name="category"
                placeholder="Category"
                value={formData.category}
                onChange={handleChange}
                className="border p-3 rounded-lg"
                required
              />

              <input
                type="text"
                name="color"
                placeholder="Color"
                value={formData.color}
                onChange={handleChange}
                className="border p-3 rounded-lg"
                required
              />

              <input
                type="number"
                name="stockQuantity"
                placeholder="Stock Quantity"
                value={formData.stockQuantity}
                onChange={handleChange}
                className="border p-3 rounded-lg"
                min="0"
                required
              />

              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className="border p-3 rounded-lg"
                rows={4}
                required
              />

              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;

                  setFormData((prev) => ({
                    ...prev,
                    image: file,
                  }));
                }}
                className="border p-3 rounded-lg"
                required={!editingProduct}
              />

              {formData.image && (
                <img
                  src={
                    typeof formData.image === "string"
                      ? formData.image
                      : URL.createObjectURL(formData.image)
                  }
                  alt="Product Preview"
                  className="w-20 h-20 object-cover rounded-lg"
                />
              )}

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-black text-white px-4 py-2 rounded-lg flex-1 disabled:opacity-60"
                >
                  {loading
                    ? editingProduct
                      ? "Updating..."
                      : "Adding..."
                    : editingProduct
                    ? "Update"
                    : "Add"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingProduct(null);
                    setFormData(emptyForm);
                  }}
                  className="bg-gray-300 px-4 py-2 rounded-lg flex-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

export default Products;