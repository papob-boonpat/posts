import React from "react";
import { Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";
type Props = {
  post: Post;
};
function PostCard(props: Props) {
  const navigate = useNavigate();
  return (
    <div
      className="bg-white p-6 rounded-2xl shadow-md"
      onClick={() => {
        navigate(`/post/${props.post.id}`);
      }}
    >
      <h2 className="text-2xl font-bold">{props.post.title}</h2>
      <p className="mt-3">{props.post.body}</p>
    </div>
  );
}

export const PostCardLoading = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <Skeleton variant="rounded" height={36} />
      <Skeleton variant="rounded" className="mt-3" height={60} />
    </div>
  );
};

export default PostCard;
