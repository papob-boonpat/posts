import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PostDetail() {
  const params = useParams() as { id: string };
  const [post, setPost] = useState<Post>();
  const [user, setUser] = useState<PostUser>();
  const [comments, setComments] = useState<PostComment[]>();
  const [state, setFetch] = useState<"loading" | "error" | "none">("none");
  const getData = useCallback(async () => {
    setFetch("loading");
    try {
      const postData = await axios.get<Post>(
        `https://jsonplaceholder.typicode.com/posts/${params.id}`
      );
      const userData = await axios.get<PostUser>(
        `https://jsonplaceholder.typicode.com/users/${postData.data.userId}`
      );
      setPost(postData.data);
      setUser(userData.data);
      setFetch("none");
    } catch {
      setFetch("error");
    }
  }, [params.id]);

  const getComments = useCallback(() => {
    axios
      .get<PostComment[]>(
        `https://jsonplaceholder.typicode.com/comments?postId=${params.id}`
      )
      .then((res) => {
        setComments(res.data);
      });
  }, [params.id]);

  useEffect(() => {
    getData();
    getComments();
  }, [getData, getComments]);

  return (
    <>
      {post ? (
        <div className="bg-white p-6 rounded-2xl shadow-md ">
          <h2 className="text-2xl font-bold">{post.title}</h2>
          <p className="mt-3">{post.body}</p>
          <div className="flex justify-end mt-4 text-gray-400">
            <span>written by: {user?.username}</span>
          </div>
          <div className="h-[1px] bg-slate-300 my-3"></div>
          <h2 className="text-lg">Comments</h2>
          {comments?.length
            ? comments.map((comment) => (
                <div key={comment.id} className="py-3 px-2">
                  <h2 className="font-bold">{comment.email}</h2>
                  <p>{comment.body}</p>
                </div>
              ))
            : "no comment"}
        </div>
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
    </>
  );
}

export default PostDetail;
