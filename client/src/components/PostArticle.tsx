import { IPost } from "../utils/interfaces";

interface Props {}

const PostArticle: React.FunctionComponent<IPost & { _id: string }> = ({
  _id,
  author,
  isPublished,
  title,
  timestamp,
  keywords,
}) => {
  return (
    <article id="post" className="bg-dark-100 shadow-md rounded-sm p-4">
      <header className="flex justify-between">
        <h2>{title}</h2>
        <p>Posted on: {new Date(timestamp).toLocaleDateString("en-US")}</p>
      </header>
      <p>By: {author.username}</p>
    </article>
  );
};

export default PostArticle;
