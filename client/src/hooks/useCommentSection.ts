import { useEffect, useState } from "react";
import { SERVER_URL } from "../utils/constants";
import { IComment } from "../utils/interfaces";

const useCommentSection = (postID: string) => {
  const [comments, setComments] = useState<Array<IComment & { _id: string }>>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const getResource = async () => {
      try {
        const res = await fetch(`${SERVER_URL}/api/comments/post/${postID}`);
        const data = await res.json();
        setComments(data);
      } catch (err) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    getResource();
  }, []);

  const addComment = async (newComment: IComment) => {
    console.log(newComment, JSON.stringify(newComment));
    try {
      let res = await fetch(`${SERVER_URL}/api/comments`, {
        method: "POST",
        body: JSON.stringify(newComment),
        headers: {
          // Authorization: webToken,
          "Content-Type": "application/json",
        },
      });
      let data = await res.json();
      if (data._id) {
        setComments((prevComments) => [...prevComments, data]);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteComment = async (resourceID: string) => {
    try {
      let res = await fetch(`${SERVER_URL}/api/comments/${resourceID}`, {
        method: "DELETE",
        headers: {
          // Authorization: webToken,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      let data = await res.json();
      if (data._id) {
        setComments((prevComments) =>
          prevComments.filter((newComment) => newComment._id !== resourceID)
        );
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const updateComment = async (resourceID: string, newComment: IComment) => {
    try {
      let res = await fetch(`${SERVER_URL}/api/comments/${resourceID}`, {
        method: "PUT",
        body: JSON.stringify(newComment),
        headers: {
          // Authorization: webToken,
          "Content-Type": "application/json",
        },
      });
      let data = await res.json();
      if (data._id) {
        setComments((prevComments) =>
          prevComments.map((oldComment: IComment & { _id: string }) =>
            oldComment._id === resourceID ? data : oldComment
          )
        );
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return {
    comments,
    isLoading,
    error,
    addComment,
    updateComment,
    deleteComment,
  };
};

export default useCommentSection;
