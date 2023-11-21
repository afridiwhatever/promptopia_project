"use client";
import { useState, useEffect } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

//see if userouter from next/router works the same way

const EditPrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  //try to pass and access ohter query strings
  const promptId = searchParams.get("id");
  const returnTo = searchParams.get("returnto");

  const [err, setErr] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}/edit`);

      try {
        const data = await response.json();
        setPost({
          prompt: data.prompt,
          tag: data.tag,
        });
      } catch (error) {
        setErr(error);
      }
    };

    if (promptId) getPromptDetails();
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/prompt/${promptId}/edit`, {
        method: "PATCH",
        body: JSON.stringify({
          newPrompt: post.prompt,
          newTag: post.tag,
        }),
      });
      setPost({
        prompt: "",
        tag: "",
      });
      if (response.ok) {
        router.push(returnTo || "/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return err ? (
    <h1 className="head_text">Prompt not found</h1>
  ) : (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      isSubmitting={isSubmitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default EditPrompt;
