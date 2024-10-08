import React from "react";
import { Link } from "react-router-dom";

type Props = {
  author?: { fullName: string; avatar: string; role: string };
  userId?: string;
};

const PostAuthor = ({ author, userId }: Props) => {
  return (
    <div className="relative mt-8 flex items-center gap-x-4">
      {author ? (
        <>
          <img
            src={author?.avatar}
            alt={author?.fullName}
            className="h-10 w-10 rounded-full bg-gray-50"
          />
          <div className="text-sm leading-6">
            <p className="font-semibold text-gray-900">
              <Link
                to={{
                  pathname: `/author/${author?.fullName
                    .toLowerCase()
                    .split(" ")
                    .join("-")}`,
                }}
                state={{ userId: userId, fullName: author?.fullName }}
              >
                <span className="absolute inset-0"></span>
                {author.fullName}
              </Link>
            </p>
            <p className="text-gray-600">
              {Number(author.role) === 1 ? "ADMIN" : "User"}
            </p>
          </div>
        </>
      ) : (
        <p>No author available</p>
      )}
    </div>
  );
};

export default PostAuthor;
