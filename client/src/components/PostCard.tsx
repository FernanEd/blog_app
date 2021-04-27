import { Link } from "react-router-dom";
import formatDate from "../utils/formatDate";
import { IPost } from "../utils/interfaces";

interface Props {}

const PostCard: React.FunctionComponent<IPost & { _id: string }> = ({
  _id,
  author,
  isPublished,
  title,
  timestamp,
}) => {
  return (
    <article className="bg-dark-100 shadow-md rounded-sm p-4 border-l-2 border-link">
      <header className="flex justify-between">
        <Link to={`/posts/${_id}`}>
          <h2 className="text-2xl">{title}</h2>
        </Link>
        <p>Posted on: {formatDate(timestamp)}</p>
      </header>
      <p>
        By:{" "}
        {typeof author !== "string"
          ? "username" in author
            ? author.username
            : null
          : null}
      </p>
    </article>
  );
};

export default PostCard;
