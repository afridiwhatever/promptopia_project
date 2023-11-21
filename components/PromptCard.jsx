"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const PromptCard = ({ prompt, handleTagClick, updatePromptList, returnTo }) => {
  const [copied, setCopied] = useState("");
  const router = useRouter();

  const { data: session } = useSession();

  const handlePromptCopy = () => {
    setCopied(prompt.prompt);
    navigator.clipboard.writeText(prompt.prompt);
    setTimeout(() => {
      setCopied("");
    }, 2000);
  };

  const handleProfileClick = (promptCreatorId) => {
    if (session?.user.id === promptCreatorId) {
      router.push("profile");
      return;
    }
    router.push(`/profile/${promptCreatorId}?name=${prompt.creator.username}`);
  };

  const handlePromptEdit = (prompt) => {
    router.push(
      `/update-prompt?id=${prompt._id}&returnto=${returnTo.toString()}`
    );
  };

  const handlePromptDelete = async (prompt) => {
    const isConfirmed = confirm("Are you sure?");

    if (isConfirmed) {
      try {
        await fetch(`/api/prompt/${prompt._id.toString()}/edit`, {
          method: "DELETE",
        });
        updatePromptList(prompt._id);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex gap-3 justify-start items-center flex-1 cursor-pointer">
          <Image
            src={prompt.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          ></Image>

          <div
            className="flex flex-col"
            onClick={() => {
              handleProfileClick(prompt.creator._id);
            }}
          >
            <h3 className="font-satoshi font-semibold text-gray-900">
              {prompt.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {prompt.creator.email}
            </p>
          </div>
        </div>
        <div className="copy_btn" onClick={handlePromptCopy}>
          <Image
            alt="copy button"
            src={
              copied === prompt.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            width={12}
            height={12}
          ></Image>
        </div>
      </div>
      <p className="my-4 font-satoshi text-md text-gray-700">{prompt.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => {
          handleTagClick && handleTagClick(prompt.tag);
        }}
      >
        #{prompt.tag}
      </p>
      {session?.user.id === prompt.creator._id && (
        <div className="mt-5 flex-center gap-4">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={() => {
              handlePromptEdit(prompt);
            }}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={() => {
              handlePromptDelete(prompt);
            }}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
