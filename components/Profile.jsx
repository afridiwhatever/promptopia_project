import React from "react";
import PromptCard from "./PromptCard";

const Profile = ({ name, desc, prompts, updatePromptList, returnTo }) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient"> {name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>

      <div className="mt-16 prompt_layout">
        {prompts.map((prompt) => (
          <PromptCard
            key={prompt._id}
            prompt={prompt}
            updatePromptList={updatePromptList}
            returnTo={returnTo}
          ></PromptCard>
        ))}
      </div>
    </section>
  );
};

export default Profile;
