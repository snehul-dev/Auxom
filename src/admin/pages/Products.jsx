import AdminLayout from "../components/AdminLayout";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

import {
  addProduct as addProductRedux,
  updateProduct as updateProductRedux,
  deleteProduct as deleteProductRedux,
} from "../../redux/slices/productSlice";

import { addProduct, updateProduct, deleteProduct } from "../services/adminProductServices";

function Products() {

  const dispatch = useDispatch();

  const products = useSelector((state) => state.products?.items || []);

  const [showModal, setShowModal] = useState(false);

  const [editingProduct, setEditingProduct] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 5;

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    color: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const productData = {
        ...formData,
        rating: 4.5,
        InStock: true,
        description: formData.description
          .split(",")
          .map((item) => item.trim()),
      };

      if (editingProduct) {

        const updatedProduct = await updateProduct(editingProduct.id, productData);

        dispatch(updateProductRedux(updatedProduct)
        );

      } else {

        const newProduct = await addProduct(productData);

        dispatch(addProductRedux(newProduct));
      }

      setShowModal(false);

      setEditingProduct(null);

      setFormData({
        name: "",
        price: "",
        category: "",
        color: "",
        description: "",
        image: "",
      });

    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (product) => {

    setEditingProduct(product);

    setFormData({
      ...product,
      description:
        product.description?.join(", ") || "",
    });

    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      dispatch(deleteProductRedux(id));

    } catch (error) {
      console.log(error);
    }
  };


  const reversedProducts = [...products].reverse();

  const indexOfLastProduct = currentPage * productsPerPage;

  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts = reversedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(
    products.length / productsPerPage
  );

  return (
    <AdminLayout>

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Products
        </h1>

        <button
          onClick={() => {

            setShowModal(true);

            setEditingProduct(null);

            setFormData({
              name: "",
              price: "",
              category: "",
              color: "",
              description: "",
              image: "",
            });

          }}
          className="bg-black text-white px-5 py-2 rounded-lg"
        >
          Add Product
        </button>

      </div>

      <div className="bg-white rounded-2xl shadow overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4 text-left">
                Image
              </th>

              <th className="p-4 text-left">
                Name
              </th>

              <th className="p-4 text-left">
                Price
              </th>

              <th className="p-4 text-left">
                Category
              </th>

              <th className="p-4 text-left">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {currentProducts.map((product) => (

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

                <td className="p-4 flex gap-3">

                  <button
                    onClick={() => handleEdit(product)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(product.id)
                    }
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

        <div className="flex justify-center items-center gap-4 p-4">

          <button
            onClick={() =>
              setCurrentPage((prev) =>
                prev > 1
                  ? prev - 1
                  : prev
              )
            }
            className="bg-black text-white px-4 py-2 rounded"
          >
            Prev
          </button>

          <span className="font-semibold">

            Page {currentPage} of {totalPages}

          </span>

          <button
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

              {editingProduct ? "Edit Product" : "Add Product"}

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

              <textarea
                name="description"
                placeholder="Description (comma separated)"
                value={formData.description}
                onChange={handleChange}
                className="border p-3 rounded-lg"
                rows={4}
                required
              />

              <input
                type="text"
                name="image"
                placeholder="/images/plant1.jpg"
                value={formData.image}
                onChange={handleChange}
                className="border p-3 rounded-lg"
                required
              />

              {formData.image && (

                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-16 h-16 object-cover rounded-lg"
                />

              )}

              <div className="flex gap-4">

                <button
                  type="submit"
                  className="bg-black text-white px-4 py-2 rounded-lg flex-1"
                >
                  {editingProduct
                    ? "Update"
                    : "Add"}
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setShowModal(false)
                  }
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