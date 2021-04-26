import { useEffect, useState } from "react";
import { useParams } from "react-router";
import CommentCard from "../components/CommentCard";
import Layout from "../components/Layout";
import PostArticle from "../components/PostArticle";
import useOneApiResource from "../hooks/useOneApiResource";
import { SERVER_URL } from "../utils/constants";
import formatDate from "../utils/formatDate";
import { IComment, IPost } from "../utils/interfaces";

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

  const [comments, setComments] = useState<Array<IComment & { _id: string }>>(
    []
  );
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [commentsFailed, setCommentsFailed] = useState<Error>();

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`${SERVER_URL}/api/comments/post/${id}`);
        const data = await res.json();
        setComments(data);
      } catch (err) {
        setCommentsFailed(err);
      } finally {
        setCommentsLoading(false);
      }
    };
    getComments();
  }, [isLoading]);

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
          <section id="comments-wrapper" className="flex flex-col gap-4">
            {commentsLoading ? (
              <p>Loading...</p>
            ) : (
              comments.map((comment) => <CommentCard {...comment} />)
            )}
          </section>
        </footer>
      </section>
    </Layout>
  );
};

export default Postpage;
