import AdminLayout from "../components/AdminLayout";

import {
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getUsers,
  updateUser,
} from "../services/adminUserService";

function Users() {

  const queryClient =
    useQueryClient();

  const {
    data: users = [],
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  // BLOCK / UNBLOCK
  const handleToggleStatus =
    async (user) => {

      try {

        const updatedUser = {
          ...user,

          isBlocked:
            !user.isBlocked,
        };

        await updateUser(
          user.id,
          updatedUser
        );

        queryClient.invalidateQueries({
          queryKey: ["users"],
        });

      } catch (error) {
        console.log(error);
      }
    };

  return (
    <AdminLayout>

      <h1 className="text-3xl font-bold mb-6">
        Users
      </h1>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-5 text-left">
                Name
              </th>

              <th className="p-5 text-left">
                Email
              </th>

              <th className="p-5 text-center">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {users.slice(1).map((user) => (

              <tr
                key={user.id}
                className="hover:bg-gray-50 transition shadow-sm"
              >

                <td className="p-5 font-medium">
                  {user.fullName}
                </td>

                <td className="p-5 text-gray-600">
                  {user.email}
                </td>

                <td className="p-5">

                  <div className="flex justify-center">

                    <button
                      onClick={() =>
                        handleToggleStatus(user)
                      }
                      className={`px-5 py-2 rounded-lg text-white font-medium shadow-md transition ${
                        user.isBlocked
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-green-500 hover:bg-green-600"
                      }`}
                    >

                      {user.isBlocked
                        ? "Blocked"
                        : "Active"}

                    </button>

                  </div>

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