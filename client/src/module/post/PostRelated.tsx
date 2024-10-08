import React, { useEffect } from "react";
import Container from "../../components/layout/Container";
import Heading from "../../components/layout/Heading";
import { useDispatch, useSelector } from "react-redux";
import { getPostRelated } from "../../redux/apiRequest";
import { AppDispatch } from "../../redux/store";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
type Props = {
  category: string;
};

const PostRelated = ({ category }: Props) => {
  const post = useSelector((state: any) => state.post.allPosts.posts);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchPost = async (category: string, dispatch: AppDispatch) => {
      await getPostRelated(category, dispatch);
    };
    fetchPost(category, dispatch);
  }, [dispatch]);
  return (
    <>
      <Heading>Related Posts</Heading>
      <Container>
        {post.length > 0 &&
          post.map((item: any, index: any) => (
            <article key={index} className="max-w-xs">
              <Link to={`/blog/${item?.slug}`}>
                <img
                  src={item?.image}
                  className="mb-5 rounded-lg w-80 h-72 object-cover"
                  alt="image-thumbnail"
                />
              </Link>
              <h2 className="mb-2 text-xl font-bold leading-tight text-gray-900 ">
                <Link to={`/blog/${item?.slug}`}>{item?.title}</Link>
              </h2>
              <p className="mb-4 text-gray-500  line-clamp-2">
                {item?.content ? parse(item?.content) : "No content available"}
              </p>
            </article>
          ))}
      </Container>
    </>
  );
};

export default PostRelated;
