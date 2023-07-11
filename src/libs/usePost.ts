import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Status } from "../types/Status";

export const usePost = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [status, setStatus] = useState<Status>(Status.NONE);

  const getData = useCallback(() => {
    setStatus(Status.LOADING);
    axios
      .get<Post[]>("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        setPosts(res.data);
        setStatus(Status.SUCCESS);
      })
      .catch(() => {
        setStatus(Status.ERROR);
      });
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  return { posts, reload: getData, status };
};
