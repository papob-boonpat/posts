import React from "react";
type Props = {
  post: Post;
};
function PostCard(props: Props) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl">{props.post.title}</h2>
      <p className="mt-3">{props.post.body}</p>
    </div>
  );
}

export default PostCard;
