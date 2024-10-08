import React, { useEffect } from "react";
import IconPencil from "../../components/icon/IconPencil";
import IconTrash from "../../components/icon/IconTrash";
import IconEyeOpen from "../../components/icon/IconEyeOpen";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, getPostManage } from "../../redux/apiRequest";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

type Props = {};

const PostManage = (props: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(
    (state: any) => state.auth.login?.currentUser
  );
  const post = useSelector((state: any) => state.post.allPosts.posts);
  useEffect(() => {
    async function fetchData() {
      await getPostManage(
        currentUser.userInfo.id,
        currentUser.userInfo.role,
        dispatch
      );
    }
    fetchData();
  }, [dispatch]);

  const handleDeletePost = (postId: string) => {
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
        await deletePost(postId, dispatch, currentUser.accessToken, navigate);
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
              Post info
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
            <th scope="col" className="px-6 py-3">
              Author
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
          {post.length > 0 &&
            post.map((item: any, index: any) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  key={item.id}
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.id}
                </th>
                <td className="px-6 py-4 max-w-52 line-clamp-2">
                  {item.title}
                </td>
                <td className="px-6 py-4">{item.Category.name}</td>
                <td className="px-6 py-4">{item.User.fullName}</td>
                <td className="px-6 py-4">{item.status}</td>
                <td className="px-6 py-4 flex">
                  <IconEyeOpen
                    className="mr-3 cursor-pointer"
                    onClick={() => {
                      navigate(`/blog/${item.slug}`);
                    }}
                  ></IconEyeOpen>
                  <IconPencil
                    className="cursor-pointer"
                    onClick={() => {
                      navigate(`/manage/update-post/${item.slug}`);
                    }}
                  ></IconPencil>
                  <IconTrash
                    className="cursor-pointer"
                    onClick={() => handleDeletePost(item.id)}
                  ></IconTrash>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default PostManage;
