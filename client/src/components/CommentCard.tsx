import { Link } from "react-router-dom";
import formatDate from "../utils/formatDate";
import { IComment } from "../utils/interfaces";

interface Props {}

const CommentCard: React.FunctionComponent<IComment & { _id: string }> = ({
  _id,
  content,
  poster,
  timestamp,
}) => {
  return (
    <article className="bg-dark-100 shadow-md rounded-sm p-4">
      <header className="flex justify-between">
        <h3>{poster}</h3>
        <p>Posted on: {formatDate(timestamp)}</p>
      </header>
      <p>{content}</p>
    </article>
  );
};

export default CommentCard;
