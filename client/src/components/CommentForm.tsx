import { Link } from "react-router-dom";
import formatDate from "../utils/formatDate";
import { IComment } from "../utils/interfaces";

interface Props {}

const CommentForm: React.FunctionComponent<Props> = ({}) => {
  return (
    <form action="" className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label>Your name</label>
        <input
          type="text"
          name=""
          id=""
          className="w-full rounded-md shadow-md text-dark-300 bg-gray-100 p-1"
        />
      </div>
      <div>
        <textarea
          className="w-full rounded-md shadow-md text-dark-300 bg-gray-100 p-1"
          rows={4}
        ></textarea>
      </div>
      <button className="btn btn-primary">Make comment</button>
    </form>
  );
};

export default CommentForm;
