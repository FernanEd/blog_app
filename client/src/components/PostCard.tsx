import { Link } from "react-router-dom";
import { IPost } from "../utils/interfaces";

interface Props {}

const PostCard: React.FunctionComponent<IPost & { _id: string }> = ({
  _id,
  author,
  isPublished,
  title,
  timestamp,
  keywords,
}) => {
  return (
    <article className="bg-dark-100 shadow-md rounded-sm p-4">
      <header className="flex justify-between">
        <Link to={`/posts/${_id}`}>
          <h2>{title}</h2>
        </Link>
        <p>Posted on: {new Date(timestamp).toLocaleDateString("en-US")}</p>
      </header>
      <p>By: {author.username}</p>
    </article>
  );
};

export default PostCard;
