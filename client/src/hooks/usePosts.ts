import { IPost } from "../utils/interfaces";
import useApiResource from "./useApiResource";

const usePosts = (query = true) => {
  const {
    resource: posts,
    isLoading: postsLoading,
    error: postsError,
    addResource: addPost,
    updateResource: updatePost,
    deleteResource: deletePost,
  } = useApiResource<IPost>("posts", query);

  if (query) {
    return {
      posts,
      postsLoading,
      postsError,
      addPost,
      updatePost,
      deletePost,
    };
  } else {
    return {
      addPost,
      updatePost,
      deletePost,
    };
  }
};

export default usePosts;
