import AdminLayout from "../components/AdminLayout";
import { useSelector } from "react-redux";

function Products() {
  const products = useSelector(
    (state) => state.products.items
  );

  return (
    <AdminLayout>

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Products
        </h1>

        <button className="bg-black text-white px-5 py-2 rounded-lg">
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

            {products.map((product) => (
              <tr
                key={product.id}
                className="border-t"
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

                  <button className="bg-blue-500 text-white px-3 py-1 rounded">
                    Edit
                  </button>

                  <button className="bg-red-500 text-white px-3 py-1 rounded">
                    Delete
                  </button>

                </td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </AdminLayout>
  );
}

export default Products;