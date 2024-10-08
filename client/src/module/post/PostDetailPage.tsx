import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import PostRelated from "./PostRelated";
import { useParams } from "react-router";
import NotFoundPage from "../../pages/NotFoundPage";
import { getPost } from "../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import PostAuthorInside from "./PostAuthorInside";
import { formatDate } from "../../utils/listContainer";
import parse from "html-react-parser";
import PostDetailHeader from "./PostDetailHeader";

type Props = {};

const PostDetailPage = (props: Props) => {
  const post = useSelector((state: any) => state.post?.onePost.post);
  const dispatch = useDispatch();
  const { slug } = useParams();

  useEffect(() => {
    async function fetchData() {
      if (!slug) return;
      await getPost(slug, dispatch);
    }
    fetchData();
  }, [slug]);
  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [slug]);
  if (!slug) return <NotFoundPage></NotFoundPage>;
  if (!post) return <NotFoundPage></NotFoundPage>;

  return (
    <Layout>
      <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white antialiased">
        <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
          <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue ">
            <PostAuthorInside
              name={post?.User.fullName}
              avatar={post?.User.avatar}
              role={post?.User.role}
              date={formatDate(post?.createdAt)}
            />
            <PostDetailHeader
              category={post?.Category.name}
              title={post?.title}
              image={post?.image}
            ></PostDetailHeader>
            <div className="entry-content whitespace-pre-line">
              {parse(post?.content)}
            </div>
          </article>
        </div>
      </main>

      <aside
        aria-label="Related articles"
        className="py-8 lg:py-24 bg-gray-50 "
      >
        <div className="px-4 mx-auto max-w-screen-xl">
          <PostRelated category={post?.Category.name}></PostRelated>
        </div>
      </aside>
    </Layout>
  );
};

export default PostDetailPage;
