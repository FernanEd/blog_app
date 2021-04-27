import ReactMarkdown from "react-markdown";
import formatDate from "../utils/formatDate";
import { IPost } from "../utils/interfaces";
import "./PostArticle.css";

interface Props {}

const PostArticle: React.FunctionComponent<IPost & { _id: string }> = ({
  _id,
  author,
  isPublished,
  content,
  title,
  timestamp,
}) => {
  return (
    <article id="post" className="bg-dark-100 shadow-md rounded-sm p-4">
      <header className="flex justify-between">
        <p>
          Author:{" "}
          {typeof author !== "string"
            ? "username" in author
              ? author.username
              : null
            : null}
        </p>
        <p>Posted on: {formatDate(timestamp)}</p>
      </header>
      <hr className="my-4 border border-white" />
      <main className="my-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        <section className="post-md">
          <ReactMarkdown>{content}</ReactMarkdown>
        </section>
      </main>
    </article>
  );
};

export default PostArticle;
