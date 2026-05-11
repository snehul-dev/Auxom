import AdminLayout from "../components/AdminLayout";
import { useQuery } from "@tanstack/react-query";
import API from "../../services/api";

function Users() {

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await API.get("/users");
      return res.data;
    },
  });

  return (
    <AdminLayout>

      <h1 className="text-3xl font-bold mb-6">
        Users
      </h1>

      <div className="bg-white rounded-2xl shadow overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">
                Name
              </th>

              <th className="p-4 text-left">
                Email
              </th>

              <th className="p-4 text-left">
                Role
              </th>

              <th className="p-4 text-left">
                Status
              </th>
            </tr>
          </thead>

          <tbody>

            {users.map((user) => (
              <tr
                key={user.id}
                className="border-t"
              >
                <td className="p-4">
                  {user.fullName}
                </td>

                <td className="p-4">
                  {user.email}
                </td>

                <td className="p-4">
                  {user.role}
                </td>

                <td className="p-4">

                  <button className="bg-black text-white px-4 py-1 rounded">
                    Active
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

export default Users;