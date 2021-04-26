import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useCommentSection from "../hooks/useCommentSection";
import { SERVER_URL } from "../utils/constants";
import formatDate from "../utils/formatDate";
import { IComment } from "../utils/interfaces";
import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm";

interface Props {
  postID: string;
}

const CommentSection: React.FunctionComponent<Props> = ({ postID }) => {
  const { comments, isLoading, error, addComment } = useCommentSection(postID);

  return (
    <footer>
      <h3 className="text-2xl">Comments ({comments.length})</h3>

      <div className="p-4 border border-dark-100 my-4 rounded-sm">
        <p className="text-lg">Write a comment.</p>
        <CommentForm />
      </div>

      <section id="comments-wrapper" className="flex flex-col gap-4">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          comments.map((comment) => <CommentCard {...comment} />)
        )}
      </section>
    </footer>
  );
};

export default CommentSection;
