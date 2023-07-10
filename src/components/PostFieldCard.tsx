import React from "react";

function PostFieldCard() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <form className="w-full flex flex-col gap-2" action="">
        <label>Title :</label>
        <input
          className="w-full bg-gray-200 h-10 rounded-full focus:outline-none hover:bg-gray-300 px-4"
          type="text"
        />
        <label>Message :</label>
        <input
          className="w-full bg-gray-200 h-10 rounded-full focus:outline-none hover:bg-gray-300 px-4"
          type="text"
        />
        <div className="flex justify-end">
          <button className="bg-main rounded-md h-10 w-24 text-white mt-3">
            Post It
          </button>
        </div>
      </form>
    </div>
  );
}

export default PostFieldCard;
