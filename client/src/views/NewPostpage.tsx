import { useEffect, useState } from "react";
import { useParams } from "react-router";
import CommentCard from "../components/CommentCard";
import CommentSection from "../components/CommentSection";
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

const NewPostpage: React.FunctionComponent = ({}) => {
  const { id } = useParams<RouteParams>();

  const { resource: post, isLoading, error } = useOneApiResource<IPost>(
    "posts",
    id
  );

  return (
    <Layout>
      <section id="post-page">
        <form action="">aaaaaaaaa</form>
      </section>
    </Layout>
  );
};

export default NewPostpage;
