import React from "react";
import { Link } from "react-router-dom";

type Props = {
  image: string;
  title?: string;
  category: string;
};

const PostDetailHeader = ({ image, title, category }: Props) => {
  return (
    <div className="my-10">
      {/* Image container taking 100% width and 300px height */}
      <div className="w-full h-[300px] rounded-[20px] overflow-hidden">
        <img className="w-full h-full object-cover" src={image} alt="Post " />
      </div>

      {/* Heading section with spacing and larger text */}
      <div className="mt-10 mb-10">
        <h1 className="text-3xl font-bold">{title}</h1>
        <Link
          to={`/category/${category}`}
          className="mt-4 inline-block px-2 py-1 rounded-[10px] text-gray-500 text-sm font-semibold bg-purple-100"
        >
          {category}
        </Link>
      </div>
    </div>
  );
};

export default PostDetailHeader;
