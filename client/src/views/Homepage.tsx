import { useEffect } from "react";
import Layout from "../components/Layout";
import useApiResource from "../hooks/useApiResource";
import { IPost } from "../utils/interfaces";

interface Props {}

const Homepage: React.FunctionComponent = ({}) => {
  const { resource: posts, isLoading, error } = useApiResource<IPost>("posts");

  useEffect(() => {}, []);

  return (
    <Layout>
      lol
      <section id="posts-wrapper">
        {posts.map((post) => (
          <li>{post.content}</li>
        ))}
      </section>
    </Layout>
  );
};

export default Homepage;
