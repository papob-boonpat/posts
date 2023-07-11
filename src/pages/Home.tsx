import React, { useCallback, useEffect, useRef, useState } from "react";
import PostFieldCard, { FormRef, PostForm } from "../components/PostFieldCard";
import PostCard, { PostCardLoading } from "../components/PostCard";
import axios from "axios";
import { Alert, AlertColor, Snackbar } from "@mui/material";

function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [state, setFetch] = useState<"loading" | "error" | "none">("none");
  const [postStatus, setPostStatus] = useState<
    "loading" | "error" | "none" | "success"
  >("none");

  const formRef = useRef<FormRef>(null);

  const getData = useCallback(() => {
    setFetch("loading");
    axios
      .get<Post[]>("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        setPosts(res.data);
        setFetch("none");
      })
      .catch(() => {
        setFetch("error");
      });
  }, []);

  const getServerity = (status: typeof postStatus): AlertColor => {
    switch (status) {
      case "error":
        return "error";
      case "success":
        return "success";
      default:
        return "info";
    }
  };

  const getAlertMessage = (status: typeof postStatus): string => {
    switch (status) {
      case "error":
        return "Post Failed";
      case "success":
        return "Posted";
      case "loading":
        return "Posting";
      default:
        return "";
    }
  };

  useEffect(() => {
    getData();
  }, [getData]);

  const submitPost = (data: PostForm) => {
    const body = { ...data, userId: 2 };
    setPostStatus("loading");
    axios
      .post<Post>("https://jsonplaceholder.typicode.com/posts", body)
      .then(() => {
        setPostStatus("success");
        formRef.current?.reset();
      })
      .catch(() => {
        setPostStatus("error");
        formRef.current?.reset();
      });
  };

  return (
    <div className="flex flex-col gap-4">
      <PostFieldCard submit={submitPost} ref={formRef} />
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
      {state === "loading" ? (
        <>
          <PostCardLoading />
          <PostCardLoading />
          <PostCardLoading />
        </>
      ) : null}
      {state === "error" ? (
        <div className="text-red-500">
          Failed to load please try agian.{" "}
          <span
            className="underline text-main cursor-pointer"
            onClick={() => {
              getData();
            }}
          >
            try again
          </span>
        </div>
      ) : null}
      {postStatus !== "none" ? (
        <Snackbar
          open={true}
          autoHideDuration={3000}
          onClose={() => {
            setPostStatus("none");
          }}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert severity={getServerity(postStatus)}>
            {getAlertMessage(postStatus)}
          </Alert>
        </Snackbar>
      ) : null}
    </div>
  );
}

export default Home;
