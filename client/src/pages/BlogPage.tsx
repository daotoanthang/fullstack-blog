import React, { useEffect } from "react";
import Layout from "../components/layout/Layout";
import Heading from "../components/layout/Heading";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "../redux/apiRequest";
import { AppDispatch } from "../redux/store";
import PostItem from "../module/post/PostItem";

type Props = {};

const BlogPage = (props: Props) => {
  const dispatch = useDispatch();
  const post = useSelector((state: any) => state.post.allPosts.posts);
  useEffect(() => {
    const fetchAllPost = async (slug: string, dispatch: AppDispatch) => {
      await getPost(slug, dispatch);
    };
    fetchAllPost("All", dispatch);
  }, [dispatch]);
  return (
    <Layout>
      <div className="px-8 mt-24 mx-auto grid max-w-2xl  gap-x-8 gap-y-16 border-t border-gray-200  lg:mx-0 lg:max-w-none ">
        <Heading className="py-4">All Post</Heading>
        <div className="grid grid-cols-3 gap-12">
          {post && Array.isArray(post) && post.length > 0 ? (
            post.map((item: any, index: any) => (
              <PostItem
                key={index}
                slug={item?.slug}
                title={item?.title}
                content={item?.content}
                author={item?.User}
                category={item?.Category?.name}
                datetime={item?.createdAt}
                userId={item?.userId}
              />
            ))
          ) : (
            <p>No posts available</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default BlogPage;
