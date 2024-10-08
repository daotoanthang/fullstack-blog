import React from "react";
import PostMeta from "./PostMeta";
import PostAuthor from "./PostAuthor";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

type Props = {
  title?: string;
  content: string;
  slug?: string;
  author?: { fullName: string; avatar: string; role: string };
  category?: string;
  datetime?: string;
  userId? : string;
};

const PostItem = ({
  title,
  content,
  slug,
  author,
  category,
  datetime,
  userId,
}: Props) => {
  return (
    <div className="flex max-w-xl flex-col items-start justify-between">
      <PostMeta category={category} datetime={datetime} />
      <div className="group relative">
        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
          <Link to={`/blog/${slug}`}>{title}</Link>
        </h3>
        <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
          {parse(content)}
        </p>
      </div>
      <PostAuthor userId={userId} author={author} />
    </div>
  );
};

export default PostItem;
