import { useEffect, useMemo, useState } from "react";
import { SERVER_URL } from "../utils/constants";
import { IPost } from "../utils/interfaces";
import makeObservable from "../utils/makeObservable";

const postStore = makeObservable({});

// This code is not 100% mine, its based on streletss post on https://stackoverflow.com/questions/53451584/is-it-possible-to-share-states-between-components-using-the-usestate-hook-in-r


const usePostStore = (makeQuery = true) => {
  const [posts, setPosts] = useState<Array<IPost & { _id: string }>>([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [postsError, setPostsError] = useState<Error>();


  useEffect(() => {
    const getResource = async () => {
      try {
        const res = await fetch(`${SERVER_URL}/api/posts`);
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        setPostsError(err);
      } finally {
        setPostsLoading(false);
      }
    };
    
    if (makeQuery) {
      getResource();
    }

    return postStore.subscribe(setPosts);
  }, []);

  const actions = useMemo(() => { }, [posts])

  }, [user])

  return {
    state: user,
    actions
  }
};
