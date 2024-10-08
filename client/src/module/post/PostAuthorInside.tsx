import React from "react";
import { Link } from "react-router-dom";

type Props = {
  name: string;
  avatar: string;
  role: number;
  date: any;
};

const PostAuthorInside = ({ name, avatar, role, date }: Props) => {
  return (
    <header className="mb-4 lg:mb-6 not-format">
      <address className="flex items-center mb-6 not-italic">
        <div className="inline-flex items-center mr-3 text-sm text-gray-900 ">
          <img
            className="mr-4 w-16 h-16 rounded-full"
            src={avatar}
            alt="Jese Leos"
          />
          <div>
            <Link
              to={`/author/${name}`}
              className="text-xl font-bold text-gray-900 "
            >
              {name}
            </Link>
            <p className="text-base text-gray-500 ">
              {role === 2 ? "USER" : "ADMIN"}
            </p>
            <p className="text-base text-gray-500 ">
              <time dateTime="2022-02-08" title="February 8th, 2022">
                {date}
              </time>
            </p>
          </div>
        </div>
      </address>
    </header>
  );
};

export default PostAuthorInside;
