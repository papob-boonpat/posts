import React, { useRef } from "react";
import PostFieldCard, { FormRef } from "../components/PostFieldCard";
import PostCard, { PostCardLoading } from "../components/PostCard";
import { usePost } from "../libs/usePost";
import { useCreatePost } from "../libs/useCreatePost";
import Toast from "../components/Toast";
import { Status } from "../types/Status";

function Home() {
  const formRef = useRef<FormRef>(null);
  const { posts, reload, status } = usePost();
  const { submitPost, status: submitStatus } = useCreatePost(() => {
    formRef.current?.reset();
    reload();
  });

  return (
    <div className="flex flex-col gap-4">
      <PostFieldCard submit={submitPost} ref={formRef} />
      {status === Status.SUCCESS
        ? posts.map((post) => <PostCard key={post.id} post={post} />)
        : null}
      {status === Status.LOADING ? (
        <>
          <PostCardLoading />
          <PostCardLoading />
          <PostCardLoading />
        </>
      ) : null}
      {status === Status.ERROR ? (
        <div className="text-red-500">
          Failed to load please try agian.{" "}
          <span
            className="underline text-main cursor-pointer"
            onClick={() => {
              reload();
            }}
          >
            try again
          </span>
        </div>
      ) : null}
      <Toast status={submitStatus} />
    </div>
  );
}

export default Home;
