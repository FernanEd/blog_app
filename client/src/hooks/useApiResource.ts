import { useEffect, useState } from "react";
import { SERVER_URL } from "../utils/constants";

const useApiResource = <T>(route: string, makeQuery = true) => {
  const [resource, setResource] = useState<Array<T & { _id: string }>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const getResource = async () => {
      try {
        const res = await fetch(`${SERVER_URL}/api/${route}`);
        const data = await res.json();
        setResource(data);
      } catch (err) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (makeQuery) {
      getResource();
    }
  }, []);

  const addResource = async (newResource: T) => {
    try {
      let res = await fetch(`${SERVER_URL}/api/${route}`, {
        method: "POST",
        body: JSON.stringify(newResource),
        headers: {
          // Authorization: webToken,
          "Content-Type": "application/json",
        },
      });
      let data = await res.json();
      if (data._id) {
        setResource((prevResource) => [...prevResource, data]);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteResource = async (resourceID: string) => {
    try {
      let res = await fetch(`${SERVER_URL}/api/${route}/${resourceID}`, {
        method: "DELETE",
        headers: {
          // Authorization: webToken,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      let data = await res.json();
      if (data._id) {
        setResource((prevResource) =>
          prevResource.filter((newResource) => newResource._id !== resourceID)
        );
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const updateResource = async (resourceID: string, newResource: T) => {
    try {
      let res = await fetch(`${SERVER_URL}/api/${route}/${resourceID}`, {
        method: "PUT",
        body: JSON.stringify(newResource),
        headers: {
          // Authorization: webToken,
          "Content-Type": "application/json",
        },
      });
      let data = await res.json();
      if (data._id) {
        setResource((prevResource) =>
          prevResource.map((oldRes: T & { _id: string }) =>
            oldRes._id === resourceID ? data : oldRes
          )
        );
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return {
    resource,
    isLoading,
    error,
    addResource,
    updateResource,
    deleteResource,
  };
};

export default useApiResource;
