import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Redirect, useHistory, useLocation } from "react-router";
import { currentUserContext } from "../App";
import Layout from "../components/Layout";
import useApiResource from "../hooks/useApiResource";
import usePosts from "../hooks/usePosts";
import { IPost } from "../utils/interfaces";

interface Props {}

const AddPostpage: React.FunctionComponent<Props> = ({}) => {
  const userID = useContext(currentUserContext);
  const { register, handleSubmit, errors } = useForm();
  const { addPost } = usePosts(false);
  const history = useHistory();

  const createPost = (post: IPost) => {
    addPost({ ...post, author: userID });
    history.push("/admin/");
  };

  return (
    <Layout>
      <div className="p-4 border border-dark-100 my-4 rounded-sm">
        <form
          action=""
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(createPost)}
        >
          <h2 className="text-2xl">Write a new blog post</h2>
          <p>
            NOTE: The blog must be in MD format. Please refer to this{" "}
            <a
              href="https://www.markdownguide.org/basic-syntax/"
              target="_blank"
              rel="noopener noreferrer"
            >
              guide
            </a>
            .
          </p>
          <div className="flex flex-col gap-2">
            <label>Post title</label>
            <input
              type="text"
              className="w-full rounded-md shadow-md text-dark-300 bg-gray-200 p-1"
              name="title"
              ref={register({ required: true })}
            />
            {errors.title && (
              <p className="text-danger">Please give your post a title</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <textarea
              rows={20}
              className="w-full rounded-md shadow-md text-dark-300 bg-gray-200 p-1 overflow-y-auto"
              name="content"
              ref={register({ required: true })}
            ></textarea>
            {errors.content && (
              <p className="text-danger">Please fill in some content</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <input type="checkbox" name="isPublished" ref={register()} />
              <label>Published by default?</label>
            </div>
          </div>
          <button className="btn btn-primary">Submit</button>
        </form>
      </div>
    </Layout>
  );
};

export default AddPostpage;
