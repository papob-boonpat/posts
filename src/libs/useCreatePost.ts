import axios from "axios";
import { useState } from "react";
import { PostForm } from "../components/PostFieldCard";
import { Status } from "../types/Status";

export const useCreatePost = (submited: () => void) => {
  const [status, setStatus] = useState<Status>(Status.NONE);

  const submitPost = (data: PostForm) => {
    const body = { ...data, userId: 2 };
    setStatus(Status.LOADING);
    axios
      .post<Post>("https://jsonplaceholder.typicode.com/posts", body)
      .then(() => {
        setStatus(Status.SUCCESS);
        submited();
      })
      .catch(() => {
        setStatus(Status.ERROR);
        submited();
      });
  };

  return { submitPost, status };
};
