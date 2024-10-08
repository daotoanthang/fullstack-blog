import React from "react";
import { formatDate } from "../../utils/listContainer";
import { Link } from "react-router-dom";

type Props = {
  category?: string;
  datetime?: string;
};

const PostMeta = ({ category, datetime }: Props) => {
  return (
    <div className="flex items-center gap-x-4 text-xs">
      {datetime && (
        <time dateTime={datetime} className="text-gray-500">
          {formatDate(datetime)}
        </time>
      )}
      {category && (
        <Link
          to={`/category/${category}`}
          className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
        >
          {category}
        </Link>
      )}
    </div>
  );
};

export default PostMeta;
