import React, { FormEvent, SyntheticEvent, useState } from "react";

export type PostForm = {
  title: string;
  message: string;
};

type Props = {
  submit: (data: PostForm) => void;
};

function PostFieldCard(props: Props) {
  const [formData, setFormData] = useState<PostForm>({
    title: "",
    message: "",
  });

  const handleField = (e: SyntheticEvent<HTMLInputElement>) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.submit(formData);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <form className="w-full flex flex-col gap-2" onSubmit={handleSubmit}>
        <label>Title :</label>
        <input
          className="w-full bg-gray-200 h-10 rounded-full focus:outline-none hover:bg-gray-300 px-4"
          type="text"
          name="title"
          onChange={handleField}
          value={formData.title}
          required
        />
        <label>Message :</label>
        <input
          className="w-full bg-gray-200 h-10 rounded-full focus:outline-none hover:bg-gray-300 px-4"
          type="text"
          name="message"
          onChange={handleField}
          value={formData.message}
          required
        />
        <div className="flex justify-end">
          <button
            className="bg-main rounded-md h-10 w-24 text-white mt-3"
            type="submit"
          >
            Post It
          </button>
        </div>
      </form>
    </div>
  );
}

export default PostFieldCard;
