import { useContext, useEffect, useMemo, useState } from "react";
import { currentUserContext } from "../App";
import { SERVER_URL } from "../utils/constants";
import makeObservable from "../utils/makeObservable";

const resourceStore = makeObservable(<Array<any & { _id: string }>>[]);

const useApiResource = <T>(route: string, makeQuery = true) => {
  const currentUser = useContext(currentUserContext);
  const [resources, setResources] = useState(resourceStore.get());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const getResource = async () => {
      try {
        const res = await fetch(`${SERVER_URL}/api/${route}`);
        const data = await res.json();
        setResources(data);
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

  useEffect(() => {
    return resourceStore.subscribe(setResources);
  }, []);

  const actions = useMemo(() => {
    return {
      addResource: async (newResource: T) => {
        try {
          let res = await fetch(`${SERVER_URL}/api/${route}`, {
            method: "POST",
            body: JSON.stringify(newResource),
            headers: {
              Authorization: currentUser.token,
              "Content-Type": "application/json",
            },
          });
          let data = await res.json();
          if (data._id) {
            resourceStore.set([...resources, data]);
          }
        } catch (err) {
          setError(err.message);
        }
      },
      updateResource: async (resourceID: string, newResource: T) => {
        try {
          let res = await fetch(`${SERVER_URL}/api/${route}/${resourceID}`, {
            method: "PUT",
            body: JSON.stringify(newResource),
            headers: {
              Authorization: currentUser.token,
              "Content-Type": "application/json",
            },
          });
          let data = await res.json();
          if (data._id) {
            resourceStore.set(
              resources.map((oldRes: T & { _id: string }) =>
                oldRes._id === resourceID ? data : oldRes
              )
            );
          }
        } catch (err) {
          setError(err.message);
        }
      },
      deleteResource: async (resourceID: string) => {
        try {
          let res = await fetch(`${SERVER_URL}/api/${route}/${resourceID}`, {
            method: "DELETE",
            headers: {
              Authorization: currentUser.token,
              "Content-Type": "application/x-www-form-urlencoded",
            },
          });
          let data = await res.json();
          if (data._id) {
            resourceStore.set(
              resources.filter((newResource) => newResource._id !== resourceID)
            );
          }
        } catch (err) {
          setError(err.message);
        }
      },
    };
  }, [resources]);

  return {
    resources,
    isLoading,
    error,
    actions,
  };
};

export default useApiResource;
