import { useParams } from "react-router";
import Layout from "../components/Layout";
import PostArticle from "../components/PostArticle";
import useOneApiResource from "../hooks/useOneApiResource";
import { IPost } from "../utils/interfaces";

interface Props {}

interface RouteParams {
  id: "string";
}

const Postpage: React.FunctionComponent = ({}) => {
  const { id } = useParams<RouteParams>();

  const { resource: post, isLoading, error } = useOneApiResource<IPost>(
    "posts",
    id
  );

  return (
    <Layout>
      <section id="post-page">
        <main>
          {isLoading ? (
            <p>Loading...</p>
          ) : post ? (
            <PostArticle {...post} />
          ) : (
            error
          )}
        </main>
        <footer>
          <h3 className="text-lg">Comments</h3>
        </footer>
      </section>
    </Layout>
  );
};

export default Postpage;
