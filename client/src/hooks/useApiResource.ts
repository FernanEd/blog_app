import { useEffect, useState } from "react";
import { SERVER_URL } from "../utils/constants";

const useApiResource = <T>(route: string) => {
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
    getResource();
  }, []);

  return { resource, isLoading, error };
};

export default useApiResource;
