import React, { useEffect } from "react";
import Heading from "../../components/layout/Heading";
import Container from "../../components/layout/Container";
import PostItem from "../post/PostItem";
import { getPostLimit } from "../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
type Props = {};

const HomeNews = (props: Props) => {
  const post = useSelector((state: any) => state.post.allPosts.posts);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchPost = async (limits: string, dispatch: AppDispatch) => {
      await getPostLimit(limits, dispatch);
    };
    fetchPost("3", dispatch);
  }, [dispatch]);
  return (
    <div className="container py-8">
      <Heading>New Post</Heading>
      <Container>
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
      </Container>
    </div>
  );
};

export default HomeNews;
