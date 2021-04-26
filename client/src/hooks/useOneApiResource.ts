import { useEffect, useState } from "react";
import { SERVER_URL } from "../utils/constants";

const useOneApiResource = <T>(route: string, id: string) => {
  const [resource, setResource] = useState<T & { _id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const getResource = async () => {
      try {
        const res = await fetch(`${SERVER_URL}/api/${route}/${id}`);
        const data = await res.json();
        setResource(data);
      } catch (err) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    getResource();
  }, []);

  return { resource, isLoading, error };
};

export default useOneApiResource;
