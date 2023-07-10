import React, { useCallback, useEffect, useRef, useState } from "react";
import PostFieldCard from "../components/PostFieldCard";
import PostCard, { PostCardLoading } from "../components/PostCard";
import axios from "axios";

function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [state, setFetch] = useState<"loading" | "error" | "none">("none");
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

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className="flex flex-col gap-4">
      <PostFieldCard />
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
    </div>
  );
}

export default Home;
