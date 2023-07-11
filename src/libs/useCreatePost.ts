import axios from "axios";
import { useState } from "react";
import { PostForm } from "../components/PostFieldCard";
import { Status } from "../types/Status";

export const useCreatePost = (reset: () => void) => {
  const [status, setStatus] = useState<Status>(Status.NONE);

  const submitPost = (data: PostForm) => {
    const body = { ...data, userId: 2 };
    setStatus(Status.LOADING);
    axios
      .post<Post>("https://jsonplaceholder.typicode.com/posts", body)
      .then(() => {
        setStatus(Status.SUCCESS);
        reset();
      })
      .catch(() => {
        setStatus(Status.ERROR);
        reset();
      });
  };

  return { submitPost, status };
};
