"use client";
import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";
import { usePathname } from "next/navigation";

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [prompts, setPrompts] = useState([]);
  const [cachedPrompts, setCachedPrompts] = useState([]);
  const [tag, setTag] = useState(null);
  const returnTo = usePathname();

  const updatePromptList = (deletedPromptId) => {
    const filteredPrompts = prompts.filter(
      (item) => item._id !== deletedPromptId
    );
    setPrompts(filteredPrompts);
  };

  async function fetchData() {
    const response = await fetch("/api/prompt");
    const data = await response.json();
    setPrompts(data);
    setCachedPrompts(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearchChange = () => {};

  const handleTagClick = async (tag) => {
    const promptsByTag = prompts.filter((prompt) => prompt.tag === tag);
    setPrompts(promptsByTag);
    setTag(tag);
  };

  return (
    <section className="feed">
      <form className="w-full flex-center relative">
        <input
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          className="search_input peer"
          required
        />
      </form>
      {tag && (
        <h2 className="mt-10 text-lg">
          Showing prompts related to #{tag}.{" "}
          <span
            className="blue_gradient underline cursor-pointer"
            onClick={() => {
              setTag(null);
              setPrompts(cachedPrompts);
            }}
          >
            View all
          </span>
        </h2>
      )}
      <div className="mt-8 prompt_layout">
        {prompts.map((prompt) => (
          <PromptCard
            key={prompt._id}
            prompt={prompt}
            handleTagClick={handleTagClick}
            updatePromptList={updatePromptList}
            returnTo={returnTo}
          ></PromptCard>
        ))}
      </div>
    </section>
  );
};

export default Feed;
