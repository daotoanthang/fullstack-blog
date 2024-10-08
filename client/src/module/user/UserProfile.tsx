import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  getUserById,
  handleUploadImage,
  updateUser,
} from "../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";

type Props = {};

const UserProfile = (props: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userUpdate = useSelector((state: any) => state.user?.oneUser?.userInfo);
  const currentUser = useSelector(
    (state: any) => state.auth.login?.currentUser
  );
  const { id } = useParams();

  // Use ref to clear file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  //// state input
  const [fullname, setFullname] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");

  // Handle image preview
  useEffect(() => {
    if (image) {
      const imagePreviewUrl = URL.createObjectURL(image);
      setImageUrl(imagePreviewUrl);

      // Clean up the object URL when component unmounts or image changes
      return () => {
        URL.revokeObjectURL(imagePreviewUrl);
      };
    } else {
      setImageUrl("");
    }
  }, [image]);

  useEffect(() => {
    async function getUserInfo() {
      if (!id) return;
      await getUserById(id, dispatch);
    }
    getUserInfo();
  }, [id, dispatch]);

  useEffect(() => {
    if (userUpdate) {
      setFullname(userUpdate.fullname);
      setEmail(userUpdate.email);
      setImageUrl(userUpdate.avatar);
    }
  }, [userUpdate]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    let pathImage = imageUrl;
    if (image) {
      pathImage = await handleUploadImage(image);
    }
    const userInfo = {
      userId: id,
      avatar: pathImage,
      fullname,
      email,
    };
    await updateUser(userInfo, dispatch, navigate);
    window.location.reload();
  };

  return (
    <form onSubmit={handleUpdateProfile}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Profile
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            This information will be displayed publicly so be careful what you
            share.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Fullname
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    value={fullname || ""}
                    onChange={(e) => setFullname(e.target.value)}
                    type="text"
                    name="fullname"
                    autoComplete="username"
                    className="block flex-1 border-0 bg-transparent px-3 py-1.5  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Photo
              </label>
              <div className="mt-2 ">
                <input
                  type="file"
                  id="image"
                  name="img"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={(e) =>
                    setImage(e.target.files ? e.target.files[0] : null)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />
                {imageUrl && (
                  <div className="relative mt-4 w-[96px] h-[96px] object-cover rounded-[50%]">
                    <img
                      src={imageUrl}
                      alt="Preview"
                      className="max-w-xs w-[100%] h-[100%] object-cover rounded-[50%] "
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Personal Information
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Use a permanent address where you can receive mail.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  value={email || ""}
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md px-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default UserProfile;
