import React from "react";
import PostFieldCard from "../components/PostFieldCard";
import PostCard from "../components/PostCard";

function Home() {
  return (
    <div className="flex flex-col gap-4">
      <PostFieldCard />
      <PostCard />
    </div>
  );
}

export default Home;
