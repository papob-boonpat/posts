import React, { useEffect, useState } from "react";
import PostFieldCard from "../components/PostFieldCard";
import PostCard from "../components/PostCard";
import axios from "axios";

function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    axios
      .get<Post[]>("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        setPosts(res.data);
      });
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <PostFieldCard />
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

export default Home;
