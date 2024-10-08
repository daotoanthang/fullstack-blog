import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ButtonWhite from "../../components/button/ButtonWhite";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../redux/authSlice";
import { getUserById } from "../../redux/apiRequest";
import axios from "axios";
import { baseUrl } from "../../utils/listContainer";

type Props = {};

const DashboardHeader = (props: Props) => {
  const [avatar, setAvatar] = useState();
  const currentUser = useSelector(
    (state: any) => state.auth.login?.currentUser
  );
  useEffect(() => {
    async function getCurrentUser(id: string) {
      const res = await axios.get(`${baseUrl}/get-user-id?id=${id}`);
      if (res.data.errCode === 0) {
        setAvatar(res.data?.user?.avatar);
      } else {
        setAvatar(currentUser?.userInfo.avatar);
      }
    }
    getCurrentUser(currentUser.userInfo.id);
  }, []);
  return (
    <header className="relative inset-x-0 top-0 z-50">
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1 cursor-pointer">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <Link
            to="/"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Home
          </Link>
          <Link
            to="/blog"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Blog
          </Link>
          <a
            rel="noreferrer"
            target="_blank"
            href="https://www.daotoanthang.dev/"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Porfolio
          </a>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <ButtonWhite to="/manage/add-post">Write new post</ButtonWhite>
          <Link
            to={`/manage/update-profile/${currentUser?.userInfo?.id}`}
            className="ml-3 relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600"
          >
            <span className="absolute w-12 h-12 text-gray-400 -left-1">
              {/* <img src={currentUser?.userInfo.avatar} alt="avatar-user" /> */}
              <img
                src={avatar || currentUser?.userInfo.avatar}
                alt="avatar-user"
              />
            </span>
          </Link>
        </div>
      </nav>
      <div className="lg:hidden" role="dialog" aria-modal="true">
        <div className="fixed inset-0 z-50"></div>
        <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Link
                  to="/"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Home
                </Link>
                <Link
                  to="/blog"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Blog
                </Link>
                <a
                  rel="noreferrer"
                  target="_blank"
                  href="https://www.daotoanthang.dev/"
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Porfolio
                </a>
              </div>
              <div className="py-6">
                <Link
                  to="/login"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
