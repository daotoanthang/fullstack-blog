import React, { useEffect } from "react";
import IconPencil from "../../components/icon/IconPencil";
import IconTrash from "../../components/icon/IconTrash";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUser } from "../../redux/apiRequest";
import { userRole, userStatus } from "../../utils/listContainer";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

type Props = {};

const UserManage = (props: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(
    (state: any) => state.auth?.login?.currentUser
  );
  const listUser = useSelector((state: any) => state.user.allUser.userInfo);
  useEffect(() => {
    async function getListUser() {
      await getUser(
        currentUser.userInfo?.role,
        currentUser.userInfo?.id,
        dispatch
      );
    }
    getListUser();
  }, [dispatch]);
  const handleDeleteUser = async (userId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteUser(userId, dispatch);
        window.location.reload();
      }
    });
  };

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Id
            </th>
            <th scope="col" className="px-6 py-3">
              Fullname
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Role
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {listUser.length > 0 &&
            listUser.map((user: any, index: any) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {user.id}
                </th>
                <td className="px-6 py-4">{user.fullname}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">
                  {user.role === userRole.ADMIN ? "ADMIN" : "USER"}
                </td>
                <td className="px-6 py-4">
                  {user.status === userStatus.ACTIVE ? "ACTIVE" : "BANNED"}
                </td>
                <td className="px-6 py-4 flex">
                  <IconPencil
                    className="cursor-pointer"
                    onClick={() =>
                      navigate(`/manage/update-profile/${user.id}`)
                    }
                  ></IconPencil>
                  <IconTrash
                    className="cursor-pointer"
                    onClick={() => handleDeleteUser(user?.id)}
                  ></IconTrash>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManage;
