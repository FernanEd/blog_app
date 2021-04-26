import { useEffect } from "react";
import Layout from "../components/Layout";
import PostCard from "../components/PostCard";
import useApiResource from "../hooks/useApiResource";
import { IPost } from "../utils/interfaces";

interface Props {}

const Homepage: React.FunctionComponent = ({}) => {
  const { resource: posts, isLoading, error } = useApiResource<IPost>("posts");

  useEffect(() => {}, []);

  return (
    <Layout>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <section id="posts-wrapper" className="flex flex-col gap-4">
          <h1 className="text-3xl">Posts</h1>
          {posts
            .filter((post) => post.isPublished)
            .map((post) => (
              <PostCard key={post._id} {...post} />
            ))}
        </section>
      )}
    </Layout>
  );
};

export default Homepage;
