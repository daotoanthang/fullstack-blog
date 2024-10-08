import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router";
import Layout from "../components/layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { getPostAuthor } from "../redux/apiRequest";
import PostItem from "../module/post/PostItem";
import Heading from "../components/layout/Heading";

type Props = {};

const AuthorPage = (props: Props) => {
  const { slug } = useParams();
  let { state } = useLocation();
  const post = useSelector((state: any) => state.post.allPosts.posts);
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      if (!slug) return;
      await getPostAuthor(state.userId, dispatch);
    }
    fetchData();
  }, [slug]);
  return (
    <Layout>
      <div className="px-8 mt-24 mx-auto grid max-w-2xl  gap-x-8 gap-y-16 border-t border-gray-200  lg:mx-0 lg:max-w-none ">
        <Heading className="py-4">{state.fullName} Post</Heading>
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

export default AuthorPage;
