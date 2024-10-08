import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getPostRelated } from "../redux/apiRequest";
import { AppDispatch } from "../redux/store";
import PostItem from "../module/post/PostItem";
import Heading from "../components/layout/Heading";
import Layout from "../components/layout/Layout";

type Props = {};

const CategoryPage = (props: Props) => {
  const { slug } = useParams();
  const post = useSelector((state: any) => state.post.allPosts.posts);
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      if (!slug) return;
      await getPostRelated(slug, dispatch);
    }
    fetchData();
  }, [slug]);
  return (
    <Layout>
      <div className="px-8 mt-24 mx-auto grid max-w-2xl  gap-x-8 gap-y-16 border-t border-gray-200  lg:mx-0 lg:max-w-none ">
        <Heading className="py-4">{slug} List</Heading>
        <div className="grid grid-cols-3 gap-12">
          {post && Array.isArray(post) && post.length > 0 ? (
            post.map((item: any, index: any) => (
              <PostItem
                key={index}
                slug={item?.slug}
                title={item?.title}
                content={item?.content}
                author={item?.User}
                userId={item?.userId}
                category={item?.Category?.name}
                datetime={item?.createdAt}
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

export default CategoryPage;
