import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { IComment } from "../utils/interfaces";

interface Props {
  submitComment: Function;
}

const CommentForm: React.FunctionComponent<Props> = ({ submitComment }) => {
  const { register, handleSubmit, errors } = useForm();

  return (
    <form
      action=""
      className="flex flex-col gap-4"
      onSubmit={handleSubmit((form) => submitComment(form))}
    >
      <div className="flex flex-col gap-2">
        <label>Your name</label>
        <input
          type="text"
          className="w-full rounded-md shadow-md text-dark-300 bg-gray-200 p-1"
          name="poster"
          ref={register({ required: true })}
        />
      </div>
      <div>
        <textarea
          rows={4}
          className="w-full rounded-md shadow-md text-dark-300 bg-gray-200 p-1"
          name="content"
          ref={register({ required: true })}
        ></textarea>
      </div>
      <button className="btn btn-primary">Make comment</button>
    </form>
  );
};

export default CommentForm;
