import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router";
import Layout from "../components/Layout";
import useApiResource from "../hooks/useApiResource";
import useOneApiResource from "../hooks/useOneApiResource";
import { IPost } from "../utils/interfaces";

interface Props {}

interface RouteParams {
  id: string;
}

const EditPostpage: React.FunctionComponent<Props> = ({}) => {
  const { id: postID } = useParams<RouteParams>();

  const { register, handleSubmit, errors } = useForm();
  const { updateResource } = useApiResource<IPost>("posts", false);
  const { resource: post, isLoading, error } = useOneApiResource<IPost>(
    "posts",
    postID
  );
  const history = useHistory();

  const updatePost = (post: IPost) => {
    updateResource(postID, { ...post });
    history.goBack();
  };

  return (
    <Layout>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="p-4 border border-dark-100 my-4 rounded-sm">
          <form
            action=""
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(updatePost)}
          >
            <h2 className="text-2xl">Edit a blog post</h2>
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
                defaultValue={post?.title}
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
                defaultValue={post?.content}
                ref={register({ required: true })}
              ></textarea>
              {errors.content && (
                <p className="text-danger">Please fill in some content</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  name="isPublished"
                  defaultChecked={post?.isPublished}
                  ref={register()}
                />
                <label>Published by default?</label>
              </div>
            </div>
            <button className="btn btn-primary">Submit</button>
          </form>
        </div>
      )}
    </Layout>
  );
};

export default EditPostpage;
